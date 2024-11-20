require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
JWT_SECRET = process.env.JWT_SECRET;
const app = express();
import express from 'express';
import path from 'path';
import fileRoutes from './routes/fileRoutes.js';
// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
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

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use file routes
app.use('/api', fileRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});