import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/User.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection with debug logs
mongoose.connect('mongodb://localhost:27017/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Add connection status check
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Debug logs
    console.log('Attempting to create user with data:', { username, email, password });
    console.log('MongoDB connection state:', mongoose.connection.readyState);

    // Create user document
    const newUser = new User({
      username,
      email,
      password
    });

    // Debug log
    console.log('User document created:', newUser);

    // Save with additional error handling
    const savedUser = await newUser.save();
    console.log('User saved successfully:', savedUser);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: savedUser
    });

  } catch (error) {
    console.error('Detailed signup error:', error);
    res.status(400).json({
      success: false,
      message: error.message,
      details: error.stack
    });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});