import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import {
  LogOut,
  Settings,
  User,
  ChevronDown,
} from 'lucide-react';

const ProfileMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      // Handle successful logout (redirect, etc.)
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10"
      >
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <User className="w-4 h-4 text-white/70" />
          </div>
        )}
        <span className="text-sm font-medium text-white/70">
          {user?.displayName || 'User'}
        </span>
        <ChevronDown className="w-4 h-4 text-white/50" />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-20"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 py-2 bg-[#1e1e1e] rounded-lg shadow-xl border border-white/10 z-30">
            <div className="px-4 py-2 border-b border-white/10">
              <p className="text-sm font-medium text-white">
                {user?.displayName || 'Anonymous User'}
              </p>
              <p className="text-xs text-white/50 truncate">
                {user?.email}
              </p>
            </div>
            
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileMenu; 