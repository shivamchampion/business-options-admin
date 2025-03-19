import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, HelpCircle, LogOut, Bell } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const menuRef = useRef(null);
  const notificationRef = useRef(null);
  
  // Mock notifications
  const notifications = [
    { id: 1, message: 'New listing submitted for review', time: '10 minutes ago', read: false },
    { id: 2, message: 'User John Doe updated their profile', time: '2 hours ago', read: false },
    { id: 3, message: 'Monthly analytics report is ready', time: '1 day ago', read: true },
    { id: 4, message: 'System maintenance scheduled for tonight', time: '2 days ago', read: true },
  ];
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Handle logout
  const handleLogout = () => {
    logout();
  };
  
  // Toggle user menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (notificationsOpen) setNotificationsOpen(false);
  };
  
  // Toggle notifications
  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (isOpen) setIsOpen(false);
  };
  
  return (
    <div className="relative flex items-center">
      {/* Notifications Bell */}
      <div className="relative mr-4">
        <button 
          className="relative p-1 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
          onClick={toggleNotifications}
        >
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        {/* Notifications Dropdown */}
        {notificationsOpen && (
          <div 
            ref={notificationRef}
            className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg py-2 z-10 border border-gray-200"
          >
            <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-medium">Notifications</h3>
              <span className="text-xs text-blue-600 cursor-pointer hover:text-blue-800">Mark all as read</span>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer ${notification.read ? '' : 'bg-blue-50'}`}
                  >
                    <div className="flex justify-between items-start">
                      <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                        {notification.message}
                      </p>
                      {!notification.read && (
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No notifications
                </div>
              )}
            </div>
            
            <div className="px-4 py-2 border-t border-gray-100">
              <Link to="/notifications" className="text-sm text-blue-600 hover:text-blue-800 block text-center">
                View all notifications
              </Link>
            </div>
          </div>
        )}
      </div>
      
      {/* User Profile Button */}
      <div className="relative">
        <button 
          className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
          onClick={toggleMenu}
        >
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
            {user && user.name ? (
              user.name.charAt(0).toUpperCase()
            ) : (
              <User className="h-5 w-5" />
            )}
          </div>
          <span className="text-sm font-medium text-gray-700 hidden md:block">
            {user && user.name ? user.name : 'User'}
          </span>
          <svg className="h-5 w-5 text-gray-400 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* User Menu Dropdown */}
        {isOpen && (
          <div 
            ref={menuRef}
            className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-1 z-10 border border-gray-200"
          >
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{user && user.name ? user.name : 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{user && user.email ? user.email : 'user@example.com'}</p>
            </div>
            
            <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
              <User className="h-4 w-4 mr-2" />
              Your Profile
            </Link>
            
            <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
            
            <Link to="/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help Center
            </Link>
            
            <div className="border-t border-gray-100 mt-1"></div>
            
            <button 
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
