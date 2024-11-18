import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/api';

const AuthContext = createContext(null);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider component
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userType: null,
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    
    if (token) {
      setAuthState(prev => ({
        ...prev,
        isAuthenticated: true,
        userType: userRole,
        loading: true
      }));
      
      auth.getCurrentUser()
        .then(user => {
          setAuthState(prev => ({
            ...prev,
            user: { 
              ...user, 
              role: user.role || userRole
            },
            loading: false
          }));
        })
        .catch(() => {
          logout();
        });
    } else {
      setAuthState(prev => ({
        ...prev,
        loading: false
      }));
    }
  }, []);

  const login = async (credentials) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      const data = await auth.login(credentials);
      
      console.log('Login response data:', data);
      console.log('User role from login:', data.user.role);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.user.role);
      
      setAuthState({
        isAuthenticated: true,
        userType: data.user.role,
        user: data.user,
        loading: false,
        error: null
      });

      console.log('Auth state after login:', {
        userType: data.user.role,
        userRole: data.user.role
      });

      if (data.user.role === 'admin') {
        console.log('Navigating to admin dashboard');
        navigate('/admin/dashboard');
      } else {
        console.log('Navigating to user dashboard');
        navigate('/dashboard');
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      console.log('Signup data in context:', userData); // Debug log
      
      const response = await auth.signup({
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        role: userData.role
      });

      // Store role in localStorage immediately
      localStorage.setItem('userRole', userData.role);
      
      // Update auth state with the new user data
      setAuthState(prev => ({
        ...prev,
        loading: false,
        user: { ...response.user, role: userData.role }
      }));

      // Navigate based on role
      if (userData.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
      
      return response;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setAuthState({
      isAuthenticated: false,
      userType: null,
      user: null,
      loading: false,
      error: null
    });
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        userType: authState.userType,
        user: authState.user,
        loading: authState.loading,
        error: authState.error,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };