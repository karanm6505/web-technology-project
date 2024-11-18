import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  console.log('Protected Route - User:', user); // Debug log
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  
  // If user is an admin, redirect to admin dashboard
  if (user.role === 'admin') {
    console.log('Admin detected, redirecting to admin dashboard'); // Debug log
    return <Navigate to="/admin/dashboard" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
