import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../common/LoadingSpinner';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      
      // Automatically adjust sidebar for desktop/mobile
      if (width >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Close sidebar when location changes on mobile
  useEffect(() => {
    if (screenWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location, screenWidth]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  const isMobile = screenWidth < 1024;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />

      {/* Main Content Area */}
      <div 
        className={`
          flex flex-col flex-1 overflow-hidden 
          transition-all duration-300 ease-in-out
          ${!isMobile && sidebarOpen ? 'ml-64' : 'ml-0'}
        `}
      >
        {/* Header */}
        <Header 
          toggleSidebar={toggleSidebar} 
          sidebarOpen={sidebarOpen} 
          isMobile={isMobile}
        />

        {/* Page Content */}
        <main 
          className="
            flex-1 overflow-y-auto p-4 md:p-6 
            w-full 
            max-w-full
            mx-auto
          "
        >
          <div className="w-full max-w-screen-2xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default MainLayout;