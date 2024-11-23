require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
JWT_SECRET = process.env.JWT_SECRET;
const app = express();

const path = require('path');

const { fileURLToPath } = require('url');

//  const __filename = fileURLToPath(import.meta.url);
//  const __dirname = path.dirname(__filename);
//Hi
// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password, phone, role } = req.body;
    console.log('Received signup data:', { email, phone, role }); // Debug log

    // Create user in database with role
    const user = await User.create({
      email,
      password,
      phone,
      role: role || 'user' // Default to 'user' if role not specified
    });

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log('Found user:', { email: user?.email, role: user?.role }); // Debug log
    
    if (!user || !await user.comparePassword(password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Sending login response with role:', user.role); // Debug log
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        role: user.role 
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

app.get('/api/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      id: user._id,
      email: user.email,
      phone: user.phone,
      role: user.role
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      message: 'Error fetching user profile',
      error: error.message
    });
  }
});

// User Management Endpoints (Admin Only)
app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    console.log('Token user ID:', req.user.userId);
    
    const requestingUser = await User.findById(req.user.userId);
    console.log('Requesting user:', requestingUser);
    
    if (!requestingUser || requestingUser.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const users = await User.find({}, '-password');
    console.log('Found users:', users);
    
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Update user role
app.patch('/api/users/:id', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    const adminUser = await User.findById(req.user.userId);
    if (adminUser.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user
app.delete('/api/users/:id', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    const adminUser = await User.findById(req.user.userId);
    if (adminUser.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add this after your existing endpoints
app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    const requestingUser = await User.findById(req.user.userId);
    if (!requestingUser || requestingUser.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const users = await User.find({}, '-password');
    console.log('Fetched users:', users); // Debug log
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Add this temporary endpoint to create an admin user
app.post('/api/create-admin', async (req, res) => {
  try {
    const adminUser = new User({
      email: 'admin@example.com',
      password: 'admin123',
      phone: '1234567890',
      role: 'admin'
    });
    
    await adminUser.save();
    console.log('Admin user created:', adminUser);
    res.json({ message: 'Admin user created successfully' });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ message: 'Error creating admin user' });
  }
});

// Set up a single static route that serves the entire uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Optional: Log to verify the path
console.log('Upload path:', path.join(__dirname, 'uploads'));

const fsSync = require('fs');

// Add this before your routes
app.get('/uploads/unit:unitId/:type', async (req, res) => {
  try {
    const { unitId, type } = req.params;
    const dirPath = path.join(__dirname, 'uploads', `unit${unitId}`, type);
    
    console.log('Attempting to read directory:', dirPath);
    
    // Check if directory exists first
    try {
      const stats = fsSync.statSync(dirPath);
      if (!stats.isDirectory()) {
        console.log('Path exists but is not a directory');
        return res.json([]);
      }
    } catch (error) {
      console.log('Directory does not exist:', dirPath);
      return res.json([]);
    }
    
    // Read directory contents
    const files = fsSync.readdirSync(dirPath);
    console.log('Files found:', files);
    
    // Map files to include full URLs
    const fileObjects = files.map(file => ({
      name: file,
      url: file
    }));
    
    res.json(fileObjects);
  } catch (error) {
    console.error('Error reading directory:', error);
    res.status(500).json({ error: 'Failed to read directory' });
  }
});

// Add this route before your other routes
app.get('/api/units/:unitId/resources', async (req, res) => {
  try {
    const { unitId } = req.params;
    const baseUrl = '/uploads';
    const unitPath = path.join(__dirname, 'uploads', `unit${unitId}`);
    
    console.log('Request for unit:', unitId);
    console.log('Unit path:', unitPath);

    let pdfs = [], codes = [];
    const pdfsPath = path.join(unitPath, 'pdfs');
    const codesPath = path.join(unitPath, 'codes');

    console.log('Checking paths:', {
      pdfsPath,
      codesPath,
      pdfsExists: fsSync.existsSync(pdfsPath),
      codesExists: fsSync.existsSync(codesPath)
    });

    if (fsSync.existsSync(pdfsPath)) {
      const pdfFiles = fsSync.readdirSync(pdfsPath);
      console.log('PDF files found:', pdfFiles);
      pdfs = pdfFiles.map(file => ({
        type: 'file',
        name: file,
        content: `/uploads/unit${unitId}/pdfs/${file}`
      }));
    }

    if (fsSync.existsSync(codesPath)) {
      const codeFiles = fsSync.readdirSync(codesPath);
      console.log('Code files found:', codeFiles);
      codes = codeFiles.map(file => ({
        type: 'file',
        name: file,
        content: `/uploads/unit${unitId}/codes/${file}`
      }));
    }

    const response = {
      success: true,
      resources: { pdfs, codes }
    };
    
    console.log('Sending response:', response);
    res.json(response);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Add this debug endpoint
app.get('/api/debug/files', async (req, res) => {
  try {
    const uploadsPath = path.join(__dirname, 'uploads');
    const listDir = async (dir) => {
      const items = fsSync.readdirSync(dir, { withFileTypes: true });
      const files = await Promise.all(items.map(async item => {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
          const children = await listDir(fullPath);
          return {
            name: item.name,
            type: 'directory',
            children
          };
        }
        return {
          name: item.name,
          type: 'file'
        };
      }));
      return files;
    };
    
    const structure = await listDir(uploadsPath);
    res.json({ success: true, structure });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const multer = require('multer');



// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const { unitId, type } = req.body;
    const dir = path.join(__dirname, 'uploads', `unit${unitId}`, type);
    
    try {
      await fsSync.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    } catch (error) {
      cb(error);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// File upload endpoint
app.post('/api/upload', upload.array('files'), async (req, res) => {
  try {
    const { unitId, type } = req.body;
    const files = req.files;
    
    const uploadedFiles = files.map(file => ({
      name: file.originalname,
      content: `/uploads/unit${unitId}/${type}/${file.originalname}`
    }));

    res.json({
      success: true,
      files: uploadedFiles
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Use routes

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Registered routes:');
  app._router.stack.forEach(r => {
    if (r.route && r.route.path) {
      console.log(r.route.path);
    }
  });
});

// Add this debug endpoint to check directory contents
app.get('/api/debug/directory/:unitId', async (req, res) => {
  try {
    const { unitId } = req.params;
    const unitPath = path.join(__dirname, 'uploads', `unit${unitId}`);
    
    const listDirectoryContents = async (dirPath) => {
      const contents = fsSync.readdirSync(dirPath, { withFileTypes: true });
      const result = {};
      
      for (const item of contents) {
        if (item.isDirectory()) {
          result[item.name] = await listDirectoryContents(path.join(dirPath, item.name));
        } else {
          result[item.name] = 'file';
        }
      }
      
      return result;
    };

    const contents = await listDirectoryContents(unitPath);
    res.json({ success: true, contents });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Modified resources endpoint with detailed logging
app.get('/api/units/:unitId/resources', async (req, res) => {
  try {
    const { unitId } = req.params;
    const baseUrl = '/uploads';
    const unitPath = path.join(__dirname, 'uploads', `unit${unitId}`);
    
    console.log('Accessing unit path:', unitPath);

    // Check if directories exist
    const pdfsPath = path.join(unitPath, 'pdfs');
    const codesPath = path.join(unitPath, 'codes');
    
    console.log('Checking paths:', {
      pdfsPath,
      codesPath,
      pdfsExists: fsSync.existsSync(pdfsPath),
      codesExists: fsSync.existsSync(codesPath)
    });

    let pdfs = [], codes = [];

    if (fsSync.existsSync(pdfsPath)) {
      const pdfFiles = fsSync.readdirSync(pdfsPath);
      console.log('PDF files found:', pdfFiles);
      pdfs = pdfFiles.map(file => ({
        type: 'file',
        name: file,
        content: `/uploads/unit${unitId}/pdfs/${file}`
      }));
    }

    if (fsSync.existsSync(codesPath)) {
      const codesFiles = fsSync.readdirSync(codesPath);
      console.log('Code files found:', codesFiles);
      codes = codesFiles.map(file => ({
        type: 'file',
        name: file,
        content: `/uploads/unit${unitId}/codes/${file}`
      }));
    }

    console.log('Sending response:', { pdfs, codes });

    res.json({
      success: true,
      resources: {
        pdfs,
        codes
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Add this debug endpoint at the top of your routes
app.get('/api/debug/structure', async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, 'uploads');
    
    const readDirRecursive = async (dir) => {
      const dirents = fsSync.readdirSync(dir, { withFileTypes: true });
      const files = await Promise.all(dirents.map(async (dirent) => {
        const res = path.resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
          return {
            name: dirent.name,
            type: 'directory',
            children: await readDirRecursive(res)
          };
        } else {
          return {
            name: dirent.name,
            type: 'file'
          };
        }
      }));
      return files;
    };

    const structure = await readDirRecursive(uploadsDir);
    console.log('Directory structure:', JSON.stringify(structure, null, 2));
    res.json(structure);
  } catch (error) {
    console.error('Error reading directory:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update your resources endpoint with more logging
app.get('/api/units/:unitId/resources', async (req, res) => {
  try {
    const { unitId } = req.params;
    const baseUrl = '/uploads';
    const uploadsPath = path.join(__dirname, 'uploads');
    const unitPath = path.join(uploadsPath, `unit${unitId}`);
    
    console.log('Accessing unit path:', unitPath);

    // Check if directories exist
    const pdfsPath = path.join(unitPath, 'pdfs');
    const codesPath = path.join(unitPath, 'codes');
    
    console.log('Checking paths:', {
      pdfsPath,
      codesPath,
      pdfsExists: fsSync.existsSync(pdfsPath),
      codesExists: fsSync.existsSync(codesPath)
    });

    let pdfs = [], codes = [];

    if (fsSync.existsSync(pdfsPath)) {
      const pdfFiles = fsSync.readdirSync(pdfsPath);
      console.log('PDF files found:', pdfFiles);
      pdfs = pdfFiles.map(file => ({
        type: 'file',
        name: file,
        content: `/uploads/unit${unitId}/pdfs/${file}`
      }));
    }

    if (fsSync.existsSync(codesPath)) {
      const codesFiles = fsSync.readdirSync(codesPath);
      console.log('Code files found:', codesFiles);
      codes = codesFiles.map(file => ({
        type: 'file',
        name: file,
        content: `/uploads/unit${unitId}/codes/${file}`
      }));
    }

    console.log('Sending response:', { pdfs, codes });

    res.json({
      success: true,
      resources: {
        pdfs,
        codes
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.get('/api/units/:unitId/folder/:folderPath(*)', async (req, res) => {
  try {
    const { unitId, folderPath } = req.params;
    
    // Log the incoming request
    console.log('Folder request received:', {
      unitId,
      folderPath,
      params: req.params
    });
    
    // Construct the full path
    const fullPath = path.join(__dirname, 'uploads', `unit${unitId}`, 'codes', folderPath);
    console.log('Looking for folder at:', fullPath);

    // Debug: Check if directory exists and list contents
    if (fsSync.existsSync(fullPath)) {
      const contents = fsSync.readdirSync(fullPath);
      console.log('Directory exists! Contents:', contents);
    } else {
      console.log('Directory does not exist');
      // List parent directory contents to debug
      const parentPath = path.dirname(fullPath);
      if (fsSync.existsSync(parentPath)) {
        console.log('Parent directory contents:', fsSync.readdirSync(parentPath));
      }
    }

    // Verify path exists
    if (!fsSync.existsSync(fullPath)) {
      return res.status(404).json({ 
        success: false, 
        error: 'Folder not found',
        details: {
          requestedPath: folderPath,
          fullPath: fullPath,
          exists: fsSync.existsSync(fullPath)
        }
      });
    }

    // Read directory contents
    const items = fsSync.readdirSync(fullPath, { withFileTypes: true });
    
    const files = items.map(item => ({
      name: item.name,
      isDirectory: item.isDirectory(),
      content: `/uploads/unit${unitId}/codes/${folderPath}/${item.name}`,
      type: item.isDirectory() ? 'folder' : 'file'
    }));

    console.log('Sending files:', files);

    res.json({
      success: true,
      files: files
    });
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      stack: error.stack
    });
  }
});

// Add this line right after your route definition to verify it's registered
console.log('Folder route registered: /api/units/:unitId/folder/:folderPath(*)');

// Add this route to serve the actual files
app.get('/api/uploads/*', (req, res) => {
  try {
    const filePath = path.join(__dirname, req.params[0]);
    console.log('Serving file:', filePath);
    
    if (!fsSync.existsSync(filePath)) {
      console.log('File not found:', filePath);
      return res.status(404).send('File not found');
    }
    
    res.sendFile(filePath);
  } catch (error) {
    console.error('Error serving file:', error);
    res.status(500).send('Error serving file');
  }
});

// Add this route to serve individual files
app.get('/api/units/:unitId/file/*', (req, res) => {
  try {
    const { unitId } = req.params;
    const filePath = req.params[0]; // This will be everything after /file/
    
    console.log('File request:', {
      unitId,
      filePath
    });

    // Construct the full path to the file
    const fullPath = path.join(__dirname, 'uploads', `unit${unitId}`, 'codes', filePath);
    console.log('Full file path:', fullPath);

    // Check if file exists
    if (!fsSync.existsSync(fullPath)) {
      console.log('File not found:', fullPath);
      return res.status(404).json({
        success: false,
        error: 'File not found',
        path: fullPath
      });
    }

    // Read and send the file content
    const content = fsSync.readFileSync(fullPath, 'utf8');
    res.json({
      success: true,
      content: content
    });

  } catch (error) {
    console.error('Error serving file:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Add this route to handle files at the root level
app.get('/api/units/:unitId/file/:filename', (req, res) => {
  try {
    const { unitId, filename } = req.params;
    
    console.log('File request:', {
      unitId,
      filename
    });

    // Construct the full path to the file
    const fullPath = path.join(__dirname, 'uploads', `unit${unitId}`, 'codes', filename);
    console.log('Looking for file at:', fullPath);

    // Check if file exists
    if (!fsSync.existsSync(fullPath)) {
      console.log('File not found:', fullPath);
      return res.status(404).json({
        success: false,
        error: 'File not found',
        path: fullPath
      });
    }

    // Read and send the file content
    const content = fsSync.readFileSync(fullPath, 'utf8');
    res.json({
      success: true,
      content: content
    });

  } catch (error) {
    console.error('Error serving file:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Serve PDFs from folders
app.get('/api/units/:unitId/pdf-folder/*', async (req, res) => {
  try {
    const { unitId } = req.params;
    const folderPath = req.params[0];
    const fullPath = path.join(__dirname, 'uploads', `unit${unitId}`, 'pdfs', folderPath);
    
    if (!fsSync.existsSync(fullPath)) {
      return res.status(404).json({ 
        success: false, 
        error: 'Folder not found' 
      });
    }

    const items = fsSync.readdirSync(fullPath, { withFileTypes: true });
    const files = items.map(item => ({
      name: item.name,
      isDirectory: item.isDirectory(),
      content: `/uploads/unit${unitId}/pdfs/${folderPath}/${item.name}`,
      type: 'pdf'
    }));

    res.json({
      success: true,
      files: files.filter(f => f.name.toLowerCase().endsWith('.pdf') || f.isDirectory)
    });
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Helper function to clean filename
function cleanFilename(filename) {
  return decodeURIComponent(filename)
    .replace(/&amp;/g, '&')
    .replace(/%26/g, '&')
    .replace(/\+/g, ' ');
}

// PDF serving route
app.get('/api/units/:unitId/pdf/:filename', async (req, res) => {
  try {
    const { unitId, filename } = req.params;
    
    // Decode and clean the filename
    const decodedFilename = decodeURIComponent(filename)
      .replace(/&amp;/g, '&')
      .replace(/%26/g, '&')
      .replace(/\+/g, ' ');
    
    // Construct the full path
    const fullPath = path.join(
      __dirname, 
      'uploads',
      `unit${unitId}`,
      'pdfs',
      decodedFilename
    );
    
    // Debug logging
    console.log('PDF Request:', {
      originalFilename: filename,
      decodedFilename,
      fullPath,
      exists: fsSync.existsSync(fullPath)
    });

    // Check if file exists
    if (!fsSync.existsSync(fullPath)) {
      console.error('File not found:', fullPath);
      return res.status(404).json({
        error: 'PDF not found',
        details: { path: fullPath }
      });
    }

    // Get file stats
    const stats = fsSync.statSync(fullPath);
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', stats.size);
    res.setHeader('Content-Disposition', `inline; filename="${decodedFilename}"`);
    
    // Create read stream
    const fileStream = fsSync.createReadStream(fullPath);
    
    // Handle stream errors
    fileStream.on('error', (error) => {
      console.error('Stream error:', error);
      if (!res.headersSent) {
        res.status(500).json({
          error: 'Error streaming file',
          details: error.message
        });
      }
    });

    // Pipe the file to response
    fileStream.pipe(res);

  } catch (error) {
    console.error('Error serving PDF:', {
      error: error.message,
      stack: error.stack,
      params: req.params
    });
    
    if (!res.headersSent) {
      res.status(500).json({
        error: 'Failed to serve PDF',
        details: error.message
      });
    }
  }
});

// Add a test endpoint to check file availability
app.get('/api/check-pdf/:unitId/:filename', (req, res) => {
  try {
    const { unitId, filename } = req.params;
    const decodedFilename = cleanFilename(filename);
    const fullPath = path.resolve(__dirname, 'uploads', `unit${unitId}`, 'pdfs', decodedFilename);
    
    const fileCheck = {
      requestedFile: decodedFilename,
      fullPath,
      exists: fsSync.existsSync(fullPath),
      stats: fsSync.existsSync(fullPath) ? fsSync.statSync(fullPath) : null
    };
    
    res.json(fileCheck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// At the top of your server.js
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});