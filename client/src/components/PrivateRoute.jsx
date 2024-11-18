import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect admins to admin dashboard
  if (user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;