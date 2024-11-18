import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  signup: async (userData) => {
    try {
      console.log('Signup request with role:', userData.role);
      const response = await api.post('/signup', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', response.data.user.role);
      }
      return response.data;
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      throw error.response?.data || { message: 'An error occurred during signup' };
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      console.log('Login response:', response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', response.data.user.role);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Invalid credentials' };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    return (await api.get('/me')).data;
  },
};

export default api;
