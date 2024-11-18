import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, UserPlus, Trash2, Shield, User, X } from 'lucide-react';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, updateDoc, doc, deleteDoc, setDoc } from 'firebase/firestore';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#161b22] rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-end">
          <button onClick={onClose} className="p-1 hover:text-red-400">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

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
  const [addingUser, setAddingUser] = useState(false);
  const [addError, setAddError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
      setError('');
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await deleteDoc(doc(db, 'users', userId));
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user');
    }
  };

  const handleRoleChange = async (userId) => {
    const user = users.find(u => u.id === userId);
    const newRole = user.role === 'user' ? 'admin' : 'user';

    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { role: newRole });
      
      setUsers(users.map(user => {
        if (user.id === userId) {
          return { ...user, role: newRole };
        }
        return user;
      }));
    } catch (err) {
      console.error('Error updating user role:', err);
      setError('Failed to update user role');
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setAddingUser(true);
    setAddError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: newUser.email,
        role: newUser.role,
        createdAt: new Date()
      });

      await fetchUsers();
      
      setIsModalOpen(false);
      setNewUser({
        email: '',
        password: '',
        role: 'user'
      });
    } catch (err) {
      console.error('Error adding user:', err);
      setAddError(err.message);
    } finally {
      setAddingUser(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="text-blue-500 hover:text-blue-400"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold">Manage Users</h1>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8b949e]" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-[#161b22] border border-[#30363d] rounded-lg 
                       text-[#c9d1d9] placeholder-[#8b949e] w-96
                       focus:outline-none focus:ring-2 focus:ring-[#388bfd]"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Add User
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-[#8b949e]">Loading users...</p>
          </div>
        ) : (
          <div className="bg-[#161b22] rounded-lg border border-[#30363d] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#30363d]">
                  <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Created At</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-[#30363d] last:border-b-0">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {user.role === 'admin' ? 
                          <Shield className="h-5 w-5 mr-2 text-blue-400" /> :
                          <User className="h-5 w-5 mr-2 text-gray-400" />
                        }
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${user.role === 'admin' ? 'bg-blue-500/10 text-blue-400' : 'bg-gray-500/10 text-gray-400'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#8b949e]">
                      {new Date(user.createdAt?.toDate()).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleRoleChange(user.id)}
                          className="p-2 hover:text-blue-400 transition-colors"
                          title={`Change to ${user.role === 'user' ? 'admin' : 'user'}`}
                        >
                          {user.role === 'user' ? 
                            <Shield className="h-5 w-5" /> :
                            <User className="h-5 w-5" />
                          }
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 hover:text-red-400 transition-colors"
                          title="Delete user"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleAddUser} className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            
            {addError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded">
                {addError}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                required
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded
                         text-[#c9d1d9] placeholder-[#8b949e]
                         focus:outline-none focus:ring-2 focus:ring-[#388bfd]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                required
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded
                         text-[#c9d1d9] placeholder-[#8b949e]
                         focus:outline-none focus:ring-2 focus:ring-[#388bfd]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Role</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded
                         text-[#c9d1d9]
                         focus:outline-none focus:ring-2 focus:ring-[#388bfd]"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-[#30363d] rounded-lg hover:bg-[#30363d] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={addingUser}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {addingUser ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding...
                  </>
                ) : (
                  'Add User'
                )}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default ManageUsers;