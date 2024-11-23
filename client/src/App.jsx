import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UnitDashboard from './components/UnitDashboard';
import UnitContent from './components/UnitContent';
import PdfViewer from './components/PdfViewer';
import CodeViewer from './components/CodeViewer';
import YoutubeViewer from './components/YoutubeViewer';
import AdminDashboard from './components/AdminDashboard';
import About from './components/About';
import ManageUnits from './components/ManageUnits';
import ManageUsers from './components/ManageUsers';
import ManageUnitContent from './components/ManageUnitContent';
import UnitResources from './components/UnitResources';
import Contact from './components/Contact';
import Home from './components/Home';
import FolderViewer from '@/components/FolderViewer';
import PDFFolder from '@/components/PDFFolder';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<About />} />
          <Route path="/home" element={<Home />} />
          
          {/* Protected User Routes */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <UnitDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/unit/:id" 
            element={
              <PrivateRoute>
                <UnitContent />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/pdf-viewer" 
            element={
              <PrivateRoute>
                <PdfViewer />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/code-viewer" 
            element={
              <PrivateRoute>
                <CodeViewer />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/youtube-viewer" 
            element={
              <PrivateRoute>
                <YoutubeViewer />
              </PrivateRoute>
            } 
          />
          <Route path="/unit/:unitId/resources" element={<UnitResources />} />

          {/* Protected Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
          <Route path="/admin/units" element={<ManageUnits />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/manage-units/:unitId" element={<ManageUnitContent />} />
          
          <Route path="/contact" element={<Contact />} />
          <Route path="/folder-viewer" element={<FolderViewer />} />
          <Route path="/pdf-folder" element={<PDFFolder />} />
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;