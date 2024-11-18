import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UnitDashboard from './components/UnitDashboard';
import AdminDashboard from './components/AdminDashboard';
import About from './components/About';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<About />} />
          
          {/* Protected User Routes */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <UnitDashboard />
              </PrivateRoute>
            } 
          />

          {/* Protected Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;