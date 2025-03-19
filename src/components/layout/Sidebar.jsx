import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Store,
  Zap,
  FileEdit,
  BarChart2,
  Settings,
  ChevronDown,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

// Navigation items with child routes
const navItems = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard size={20} />,
    children: []
  },
  {
    title: 'User Management',
    path: '/users',
    icon: <Users size={20} />,
    children: [
      { title: 'All Users', path: '/users' },
      { title: 'User Roles', path: '/roles' },
    ]
  },
  {
    title: 'Advisor Management',
    path: '/advisors',
    icon: <Briefcase size={20} />,
    children: [
      { title: 'All Advisors', path: '/advisors' },
      { title: 'Commission Structure', path: '/commission-structure' },
      { title: 'Leads', path: '/leads' },
      { title: 'Payments', path: '/payments' }
    ]
  },
  {
    title: 'Listings',
    path: '/listings',
    icon: <Store size={20} />,
    children: [
      { title: 'All Listings', path: '/listings' },
      { title: 'Featured Listings', path: '/listings/featured' },
      { title: 'Pending Approval', path: '/listings/pending' }
    ]
  },
  {
    title: 'Insta Apply',
    path: '/applications',
    icon: <Zap size={20} />,
    children: [
      { title: 'All Applications', path: '/applications' },
      { title: 'New Applications', path: '/applications/new' },
      { title: 'Processed Applications', path: '/applications/processed' }
    ]
  },
  {
    title: 'Website Content',
    path: '/content',
    icon: <FileEdit size={20} />,
    children: [
      { title: 'Pages', path: '/content/pages' },
      { title: 'Blog', path: '/content/blogs' },
      { title: 'FAQs', path: '/content/faqs' },
      { title: 'Testimonials', path: '/content/testimonials' },
      { title: 'Media Library', path: '/content/media' }
    ]
  },
  {
    title: 'Analytics',
    path: '/analytics',
    icon: <BarChart2 size={20} />,
    children: [
      { title: 'Overview', path: '/analytics' },
      { title: 'User Analytics', path: '/analytics/users' },
      { title: 'Listing Analytics', path: '/analytics/listings' },
      { title: 'Conversion Reports', path: '/analytics/conversions' },
      { title: 'Advisor Performance', path: '/analytics/advisors' }
    ]
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <Settings size={20} />,
    children: [
      { title: 'General Settings', path: '/settings' },
      { title: 'Email Templates', path: '/settings/email-templates' },
      { title: 'Payment Gateway', path: '/settings/payment-gateway' },
      { title: 'Subscription Plans', path: '/settings/subscription-plans' },
      { title: 'System Logs', path: '/settings/system-logs' }
    ]
  }
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { hasPermission, userRole } = useAuth();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState([]);

  // Add isAdmin function since it doesn't exist in the context
  const isAdmin = () => {
    return userRole === 'admin' || userRole === 'super_admin';
  };

  // Toggle submenu expansion
  const toggleExpand = (title) => {
    if (expandedItems.includes(title)) {
      setExpandedItems(expandedItems.filter(item => item !== title));
    } else {
      setExpandedItems([...expandedItems, title]);
    }
  };

  // Check if a route should be visible based on permissions
  const canSeeRoute = (path) => {
    // Routes and their required permissions
    const routePermissions = {
      '/users': { section: 'users', action: 'view' },
      '/roles': { section: 'users', action: 'view' },
      '/advisors': { section: 'advisors', action: 'view' },
      '/listings': { section: 'listings', action: 'view' },
      '/applications': { section: 'instapply', action: 'view' },
      '/content': { section: 'content', action: 'view' },
      '/analytics': { section: 'analytics', action: 'view' },
      '/settings': { section: 'settings', action: 'view' }
    };

    // Admin can see all routes
    if (isAdmin()) return true;

    // Check if route requires permissions
    const requiredPermission = routePermissions[path] || routePermissions[`/${path.split('/')[1]}`];
    
    if (!requiredPermission) return true; // No specific permission required
    
    return hasPermission(requiredPermission.section, requiredPermission.action);
  };

  // Determine if a nav item or its children are active
  const isActive = (item) => {
    if (location.pathname === item.path) return true;
    if (item.children && item.children.length > 0) {
      return item.children.some(child => location.pathname === child.path || location.pathname.startsWith(child.path));
    }
    return false;
  };

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-30 flex flex-col flex-shrink-0 bg-brand-blue text-white shadow-lg transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      {/* Logo Area with White Background */}
      <div className="h-16 bg-white flex items-center justify-center relative">
        {/* Centered Logo */}
        <img 
          src="/logo.svg" 
          alt="Business Options Logo" 
          className={`h-10 w-auto transition-all duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Collapse button (visible on desktop) */}
        <button 
          className="absolute top-1/2 -right-3 transform -translate-y-1/2 w-6 h-6 bg-white text-brand-blue rounded-full flex items-center justify-center border border-light-blue shadow-md cursor-pointer hidden md:flex"
          onClick={toggleSidebar}
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            // Skip items that user doesn't have permission to see
            if (!canSeeRoute(item.path)) return null;

            const isItemActive = isActive(item);
            const isExpanded = expandedItems.includes(item.title) || (isItemActive && item.children.length > 0);

            return (
              <li key={item.title}>
                {/* Parent item */}
                <div className={`flex items-center ${isItemActive ? 'bg-medium-blue bg-opacity-30' : 'hover:bg-medium-blue hover:bg-opacity-20'} rounded-md overflow-hidden`}>
                  {/* Main link or toggle button */}
                  {item.children.length > 0 ? (
                    <button
                      className="flex items-center w-full px-3 py-2 text-left"
                      onClick={() => toggleExpand(item.title)}
                    >
                      <span className="flex items-center">
                        <span className="mr-3">{item.icon}</span>
                        {isOpen && (
                          <span className="text-sm font-medium">{item.title}</span>
                        )}
                      </span>
                      {isOpen && item.children.length > 0 && (
                        <span className="ml-auto">
                          {isExpanded ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </span>
                      )}
                    </button>
                  ) : (
                    <NavLink
                      to={item.path}
                      className="flex items-center w-full px-3 py-2"
                    >
                      <span className="mr-3">{item.icon}</span>
                      {isOpen && (
                        <span className="text-sm font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  )}
                </div>

                {/* Child items */}
                {isOpen && isExpanded && item.children.length > 0 && (
                  <ul className="mt-1 ml-8 space-y-1">
                    {item.children.map((child) => {
                      // Skip child items that user doesn't have permission to see
                      if (!canSeeRoute(child.path)) return null;

                      const isChildActive = location.pathname === child.path;

                      return (
                        <li key={child.title}>
                          <NavLink
                            to={child.path}
                            className={`flex items-center px-3 py-1.5 text-xs font-medium rounded-md ${
                              isChildActive
                                ? 'bg-medium-blue bg-opacity-30'
                                : 'hover:bg-medium-blue hover:bg-opacity-20'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 mr-2 bg-white rounded-full"></span>
                            {child.title}
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;