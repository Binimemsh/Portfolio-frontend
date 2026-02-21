import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, LogIn, LogOut, Shield, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AdminLogin from './AdminLogin';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking');
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const API_URL = 'https://my-portfolio-backend-fll4.onrender.com/api';

  // Check backend connection
  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        const response = await fetch(`${API_URL}/projects`);
        if (response.ok) {
          setBackendStatus('connected');
        } else {
          setBackendStatus('disconnected');
        }
      } catch (error) {
        setBackendStatus('disconnected');
      }
    };

    checkBackendConnection();
    // Check every 30 seconds
    const interval = setInterval(checkBackendConnection, 30000);
    return () => clearInterval(interval);
  }, []);

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
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-white">
                Biniam.dev
              </Link>
              
              {/* Backend Status Indicator */}
              <div className="ml-4 flex items-center">
                <div className={`w-2 h-2 rounded-full ${
                  backendStatus === 'connected' ? 'bg-green-500' : 
                  backendStatus === 'checking' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
                }`} />
                <span className="ml-2 text-xs text-gray-400 hidden sm:inline">
                  {backendStatus === 'connected' ? 'Backend Live' : 
                   backendStatus === 'checking' ? 'Connecting...' : 'Backend Offline'}
                </span>
              </div>
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
              
              {/* Admin Section */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  {/* Messages Link - Only visible when authenticated */}
                  <Link
                    to="/admin/messages"
                    className={`flex items-center ${
                      location.pathname === '/admin/messages'
                        ? 'text-blue-400'
                        : 'text-gray-300 hover:text-white'
                    } transition-colors duration-200`}
                  >
                    <Mail size={18} className="mr-1" />
                    <span>Messages</span>
                  </Link>
                  
                  {/* User info */}
                  <span className="text-sm text-gray-400 flex items-center">
                    <Shield size={16} className="mr-1 text-green-400" />
                    {user?.name || 'Admin'}
                  </span>
                  
                  {/* Logout button */}
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
                className="text-gray-300 hover:text-white p-2"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-dark-200 border-t border-gray-800">
            <div className="px-4 py-3 space-y-2">
              {/* Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-2 px-3 rounded-lg ${
                    location.pathname === link.path
                      ? 'text-blue-400 bg-dark-300'
                      : 'text-gray-300 hover:text-white hover:bg-dark-300'
                  } transition-colors duration-200`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Admin Section */}
              <div className="border-t border-gray-800 pt-3 mt-3">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    {/* User info */}
                    <div className="flex items-center px-3 py-2 text-sm text-gray-400">
                      <Shield size={16} className="mr-2 text-green-400" />
                      Logged in as {user?.name || 'Admin'}
                    </div>
                    
                    {/* Messages link */}
                    <Link
                      to="/admin/messages"
                      className={`flex items-center px-3 py-2 rounded-lg ${
                        location.pathname === '/admin/messages'
                          ? 'text-blue-400 bg-dark-300'
                          : 'text-gray-300 hover:text-white hover:bg-dark-300'
                      } transition-colors duration-200`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Mail size={18} className="mr-2" />
                      View Messages
                    </Link>
                    
                    {/* Logout button */}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="flex items-center w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-dark-300 rounded-lg transition-colors duration-200"
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
                    className="flex items-center w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-dark-300 rounded-lg transition-colors duration-200"
                  >
                    <LogIn size={18} className="mr-2" />
                    Admin Login
                  </button>
                )}
              </div>

              {/* Backend Status (Mobile) */}
              <div className="border-t border-gray-800 pt-3 mt-3">
                <div className="flex items-center px-3 py-2">
                  <div className={`w-2 h-2 rounded-full ${
                    backendStatus === 'connected' ? 'bg-green-500' : 
                    backendStatus === 'checking' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
                  }`} />
                  <span className="ml-2 text-xs text-gray-400">
                    {backendStatus === 'connected' ? 'Backend Connected' : 
                     backendStatus === 'checking' ? 'Connecting to backend...' : 'Backend Offline'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      <AdminLogin 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
};

export default Navbar;