import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from './ui/button';
import { Edit2, Mail, User } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    avatar: user?.photoURL || '',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-white/5">
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="ghost"
              className="text-white/70 hover:text-white"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            {/* Avatar Section */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="relative">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-white/10"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center border-2 border-white/10">
                    <User className="w-12 h-12 text-white/30" />
                  </div>
                )}
                {isEditing && (
                  <Button
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20"
                    size="sm"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">
                  {profile.name || 'Anonymous User'}
                </h3>
                <p className="text-white/50 flex items-center mt-1">
                  <Mail className="w-4 h-4 mr-2" />
                  {profile.email}
                </p>
              </div>
            </div>

            {/* Profile Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white
                    opacity-50 cursor-not-allowed"
                />
                <p className="mt-1 text-sm text-white/40">
                  Email cannot be changed
                </p>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="ghost"
                    className="text-white/70 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 