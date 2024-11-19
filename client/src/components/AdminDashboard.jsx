import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Settings,
  FileText,
  Bell,
  LogOut
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-medium">Admin Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-6 mb-8">
          <div 
            onClick={() => navigate('/admin/users')}
            className="bg-[#111111] p-6 rounded-lg cursor-pointer hover:bg-[#1A1A1A] transition-colors"
          >
            <div className="flex items-center gap-4">
              <Users className="h-6 w-6 text-gray-400" />
              <div>
                <h3 className="text-white font-medium">User Access</h3>
                <p className="text-gray-400 text-sm">Manage user permissions and roles</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Units */}
        <div className="bg-[#111111] rounded-lg p-6">
          <h3 className="text-white font-medium mb-4">Course Units</h3>
          <div className="space-y-2">
            {Array.from({length: 4}).map((_, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-4 hover:bg-[#1A1A1A] rounded-lg cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4">
                  <BookOpen className="h-5 w-5 text-gray-400" />
                  <div>
                    <h4 className="text-white">Unit {idx + 1}</h4>
                    <p className="text-gray-400 text-sm">14 topics</p>
                  </div>
                </div>
                <span 
                  onClick={() => navigate(`/admin/manage-units/${idx + 1}`)}
                  className="text-gray-400 hover:text-white"
                >
                  Edit
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;