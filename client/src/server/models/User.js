import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Add pre-save middleware for debugging
userSchema.pre('save', function(next) {
  console.log('Attempting to save user:', this);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;