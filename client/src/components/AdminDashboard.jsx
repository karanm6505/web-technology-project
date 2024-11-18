import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, BarChart3 } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="text-blue-500 hover:text-blue-400"
            >
              ← Back
            </button>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            onClick={() => navigate('/admin/users')}
            className="bg-[#161b22] p-6 rounded-lg border border-[#30363d] hover:border-[#388bfd] transition-colors text-left"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Users className="h-6 w-6 text-blue-400" />
              <h2 className="text-xl font-semibold">Manage Users</h2>
            </div>
            <p className="text-[#8b949e]">View and manage user accounts, roles, and permissions</p>
          </button>
          
          <button
            onClick={() => navigate('/admin/content')}
            className="bg-[#161b22] p-6 rounded-lg border border-[#30363d] hover:border-[#388bfd] transition-colors text-left"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="h-6 w-6 text-green-400" />
              <h2 className="text-xl font-semibold">Content Management</h2>
            </div>
            <p className="text-[#8b949e]">Manage educational content and resources</p>
          </button>
          
          <div className="bg-[#161b22] p-6 rounded-lg border border-[#30363d]">
            <div className="flex items-center space-x-3 mb-4">
              <BarChart3 className="h-6 w-6 text-purple-400" />
              <h2 className="text-xl font-semibold">Analytics</h2>
            </div>
            <p className="text-[#8b949e]">View user engagement and content statistics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;