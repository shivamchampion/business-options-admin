import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  User, 
  LogOut, 
  Settings, 
  HelpCircle,
  Moon,
  Sun,
  Menu as MenuIcon
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Header = ({ toggleSidebar, sidebarOpen }) => {
  // FIXED: Using logout instead of signOut to match what's provided by the context
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle user logout
  const handleLogout = async () => {
    try {
      await logout(); // FIXED: Using the correct function name
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally add error handling UI here
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Implement dark mode toggle functionality
  };

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm w-full">
      <div className="h-16 flex items-center justify-between px-4">
        {/* Left section: Mobile menu button */}
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button 
            onClick={toggleSidebar}
            className="p-2 mr-2 text-gray-700 rounded-md lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            aria-label="Toggle sidebar menu"
          >
            <MenuIcon size={24} />
          </button>
        </div>

        {/* Center section: Logo */}
        <div className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
          <img 
            src="/logo.png" 
            alt="Business Options Logo" 
            className="h-10 w-auto"
          />
        </div>

        {/* Right section: User profile and notifications */}
        <div className="flex items-center space-x-3">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-700 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Sun size={20} className="text-amber-500" />
            ) : (
              <Moon size={20} />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-700 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              aria-label="View notifications"
            >
              <Bell size={20} />
              {/* Notification badge */}
              <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
            </button>
            
            {/* Notification dropdown */}
            {showNotifications && (
              <div className="absolute right-0 w-80 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-2 px-4 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-dark-gray">Notifications</h3>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  <div className="py-4 px-4 text-sm text-gray-500 text-center">
                    No new notifications
                  </div>
                </div>
                <div className="py-2 px-4 border-t border-gray-100">
                  <button className="text-xs text-brand-blue hover:underline">
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center text-gray-700 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-blue"
              aria-label="Open user menu"
            >
              <div className="w-8 h-8 rounded-full bg-light-blue flex items-center justify-center text-brand-blue font-semibold overflow-hidden">
                {currentUser?.profileImage?.url ? (
                  <img
                    src={currentUser.profileImage.url}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={20} />
                )}
              </div>
            </button>
            
            {/* User dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-2 px-4 border-b border-gray-100">
                  <p className="text-sm font-semibold text-dark-gray">
                    {currentUser?.displayName || currentUser?.email}
                  </p>
                  <p className="text-xs text-gray-500">
                    {currentUser?.role?.charAt(0).toUpperCase() + currentUser?.role?.slice(1) || 'User'}
                  </p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate('/settings');
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-light-blue"
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      // Implement help/support functionality
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-light-blue"
                  >
                    <HelpCircle size={16} className="mr-2" />
                    Help / Support
                  </button>
                </div>
                <div className="py-1 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      handleLogout();
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-light-blue"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;