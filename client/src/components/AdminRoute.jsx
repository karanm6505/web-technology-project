import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  console.log('Admin Route - User:', user); // Debug log
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  
  // If user is not an admin, redirect to regular dashboard
  if (user.role !== 'admin') {
    console.log('Non-admin detected, redirecting to dashboard'); // Debug log
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

export default AdminRoute;