require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
JWT_SECRET = "tH/S8zuXHvy00GAVZOdrfgxJ67Qja1h5KxzJQ98OgOE=";
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/webtech')
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
        role: user.role // Ensure role is included
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

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});