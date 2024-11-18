import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UnitDashboard from './components/UnitDashboard';
import UnitContent from './components/UnitContent';
import PdfViewer from './components/PdfViewer';
import CodeViewer from './components/CodeViewer';
import YoutubeViewer from './components/YoutubeViewer';
import { ContentProvider } from './context/ContentContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';
import AdminDashboard from './components/AdminDashboard';
import ManageUsers from './components/ManageUsers';
import ContentManagement from './components/ContentManagement';

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <UnitDashboard />
                </ProtectedRoute>
              } />
              <Route path="/unit/:id" element={
                <ProtectedRoute>
                  <UnitContent />
                </ProtectedRoute>
              } />
              <Route path="/pdf-viewer" element={<PdfViewer />} />
              <Route path="/code-viewer" element={<CodeViewer />} />
              <Route path="/youtube-viewer" element={<YoutubeViewer />} />

              <Route path="/admin/dashboard" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route path="/admin/users" element={
                <AdminRoute>
                  <ManageUsers />
                </AdminRoute>
              } />
              <Route path="/admin/content" element={
                <AdminRoute>
                  <ContentManagement />
                </AdminRoute>
              } />
              <Route path="*" element={<About />} />
            </Routes>
          </div>
        </Router>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;