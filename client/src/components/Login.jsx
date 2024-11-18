import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  // Hardcoded users
  const users = {
    admin: {
      email: 'karanm6505@gmail.com',
      password: 'abcdef',
      role: 'admin'
    },
    regular: {
      email: 'user@example.com',
      password: 'abcdef',
      role: 'user'
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      
      // Check for admin
      if (email === users.admin.email && password === users.admin.password) {
        // Set user in auth context with all necessary data
        login({
          email,
          role: 'admin',
          isAuthenticated: true
        });
        console.log('Admin logged in, redirecting...');
        navigate('/admin/dashboard');
        return;
      }
      
      // Check for regular user
      if (email === users.regular.email && password === users.regular.password) {
        // Set user in auth context with all necessary data
        login({
          email,
          role: 'user',
          isAuthenticated: true
        });
        console.log('User logged in, redirecting...');
        navigate('/dashboard');
        return;
      }

      setError('Invalid email or password');
      
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d1117] p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#161b22] rounded-lg border border-[#30363d]">
        <h2 className="text-3xl font-bold text-center text-[#c9d1d9]">Log In</h2>
        
        {error && (
          <div className="bg-red-900/50 text-red-500 p-4 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[#c9d1d9]">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 bg-[#0d1117] rounded-lg border border-[#30363d] focus:outline-none focus:border-[#388bfd] text-[#c9d1d9]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[#c9d1d9]">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full p-3 bg-[#0d1117] rounded-lg border border-[#30363d] focus:outline-none focus:border-[#388bfd] text-[#c9d1d9]"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3 px-4 bg-[#238636] hover:bg-[#2ea043] rounded-lg text-[#c9d1d9] font-medium transition-colors"
          >
            Log In
          </button>
        </form>

        <div className="text-center text-[#8b949e]">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#388bfd] hover:text-[#58a6ff]">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;