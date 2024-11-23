import ProfileMenu from './ProfileMenu';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-10 bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo/Brand */}
          <div className="flex items-center">
            {/* ... existing logo/brand code ... */}
          </div>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {/* ... existing navigation links ... */}
          </div>

          {/* Right side - Profile Menu */}
          <div className="flex items-center">
            <ProfileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 