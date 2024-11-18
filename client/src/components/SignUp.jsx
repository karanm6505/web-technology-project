import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    verifyPassword: ''
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.verifyPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      console.log('Signup data:', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      // For now, just log the successful signup
      console.log('User signed up successfully');
      
      // Clear form
      setFormData({
        username: '',
        email: '',
        password: '',
        verifyPassword: ''
      });
      
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-white">Sign Up</h2>
        
        {error && (
          <div className="bg-red-900/50 text-red-500 p-4 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-gray-300">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-300">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-300">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-gray-300">Verify Password</label>
            <input
              type="password"
              value={formData.verifyPassword}
              onChange={(e) => setFormData({...formData, verifyPassword: e.target.value})}
              className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition-colors"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-400">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;