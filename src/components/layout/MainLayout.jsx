import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../common/LoadingSpinner';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      if (mobile) {
        setSidebarOpen(false);
      } else if (!document.documentElement.classList.contains('sidebar-toggled')) {
        setSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // When sidebar is explicitly toggled, add a class to the html element
    const handleSidebarToggle = () => {
      document.documentElement.classList.add('sidebar-toggled');
    };

    document.addEventListener('sidebar-toggled', handleSidebarToggle);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('sidebar-toggled', handleSidebarToggle);
    };
  }, []);

  // Close sidebar when location changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location, isMobile]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-light-blue">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div 
        className="flex flex-col flex-1 transition-all duration-300"
        style={{ 
          marginLeft: isMobile ? "0" : (sidebarOpen ? "250px" : "64px"),
          width: isMobile ? "100%" : `calc(100% - ${sidebarOpen ? "250px" : "64px"})`
        }}
      >
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-dark-gray bg-opacity-50"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default MainLayout;