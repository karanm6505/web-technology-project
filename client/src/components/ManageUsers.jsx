import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  User,
  Shield,
  Search,
  Plus,
  Trash2,
  UserCog,
  ArrowLeft
} from 'lucide-react';

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    role: 'user'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      console.log('Using token:', token);
      
      const response = await axios.get('http://localhost:5001/api/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('API Response:', response.data);
      setUsers(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching users:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to load users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  console.log('Current users state:', users);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`/api/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user');
    }
  };

  const handleRoleChange = async (userId) => {
    const user = users.find(u => u._id === userId);
    const newRole = user.role === 'user' ? 'admin' : 'user';

    try {
      await axios.patch(`/api/users/${userId}`, { role: newRole });
      setUsers(users.map(user => {
        if (user._id === userId) {
          return { ...user, role: newRole };
        }
        return user;
      }));
    } catch (err) {
      console.error('Error updating user role:', err);
      setError('Failed to update user role');
    }
  };

  const filteredUsers = Array.isArray(users) 
    ? users.filter(user => 
        user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/admin/dashboard')}
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-medium">User Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <Input
              type="search"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-white/5 border-white/10"
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-[#8b949e]">Loading users...</p>
          </div>
        ) : (
          <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 font-medium">Email</th>
                  <th className="text-left p-4 font-medium">Role</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="border-b border-white/10 last:border-0">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {user.role === 'admin' ? 
                          <Shield className="h-4 w-4 text-blue-400" /> :
                          <User className="h-4 w-4 text-white/40" />
                        }
                        {user.email}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'admin' ? 'bg-blue-500/10 text-blue-400' : 'bg-white/10 text-white/60'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRoleChange(user._id)}
                          className="text-white/60 hover:text-white hover:bg-white/5"
                        >
                          <UserCog className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;