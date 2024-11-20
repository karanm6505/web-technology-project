import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const unitId = req.params.unitId;
    const fileType = req.params.fileType; // 'pdfs' or 'codes'
    const uploadDir = `uploads/unit${unitId}/${fileType}`;
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const fileType = req.params.fileType;
  
  if (fileType === 'pdfs' && file.mimetype === 'application/pdf') {
    cb(null, true);
  } else if (fileType === 'codes') {
    const validExtensions = ['.js', '.jsx', '.py', '.java', '.cpp', '.c', '.cs'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (validExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  } else {
    cb(new Error('Invalid file type'));
  }
};

export const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const fileUrl = `${baseUrl}/uploads/unit${req.params.unitId}/${req.params.fileType}/${req.file.filename}`;

    res.status(200).json({
      success: true,
      file: {
        name: req.file.originalname,
        url: fileUrl,
        type: req.file.mimetype
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 