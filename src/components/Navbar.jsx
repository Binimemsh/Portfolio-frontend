import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, LogIn, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AdminLogin from './AdminLogin';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <>
      <nav className="bg-dark-200 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-white">
                Portfolio
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`${
                    location.pathname === link.path
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-white'
                  } transition-colors duration-200`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Admin Login/Logout Button */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-400">
                    <Shield size={16} className="inline mr-1 text-green-400" />
                    {user?.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-300 hover:text-white transition-colors"
                  >
                    <LogOut size={18} className="mr-1" />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center text-gray-300 hover:text-white transition-colors"
                >
                  <LogIn size={18} className="mr-1" />
                  Admin
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-dark-200 border-t border-gray-800">
            <div className="px-4 py-2 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-2 ${
                    location.pathname === link.path
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Admin Login/Logout */}
              <div className="border-t border-gray-800 pt-2 mt-2">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-400 py-2">
                      <Shield size={16} className="inline mr-1 text-green-400" />
                      Logged in as {user?.name}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center text-gray-300 hover:text-white py-2 w-full"
                    >
                      <LogOut size={18} className="mr-2" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setShowLoginModal(true);
                      setIsOpen(false);
                    }}
                    className="flex items-center text-gray-300 hover:text-white py-2 w-full"
                  >
                    <LogIn size={18} className="mr-2" />
                    Admin Login
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <AdminLogin 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
};

export default Navbar;