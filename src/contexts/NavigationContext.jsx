import { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [pageTitle, setPageTitle] = useState('');
  const [previousPath, setPreviousPath] = useState(null);

  // Update current path when location changes
  useEffect(() => {
    setPreviousPath(currentPath);
    setCurrentPath(location.pathname);
  }, [location, currentPath]);

  // Generate breadcrumbs based on current path
  useEffect(() => {
    const generateBreadcrumbs = () => {
      const paths = currentPath.split('/').filter(Boolean);
      
      if (paths.length === 0) {
        setBreadcrumbs([]);
        setPageTitle('Dashboard');
        return;
      }

      const breadcrumbItems = [];
      let currentBreadcrumbPath = '';

      paths.forEach((path, index) => {
        // Skip IDs and params in breadcrumbs
        if (path.match(/^[0-9a-fA-F]{24}$/) || path.match(/^[0-9a-fA-F-]{36}$/)) {
          return;
        }

        currentBreadcrumbPath += `/${path}`;
        
        // Format path for display
        const formattedPath = path
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        // Add to breadcrumbs
        breadcrumbItems.push({
          label: formattedPath,
          path: currentBreadcrumbPath,
        });
        
        // Set page title from last breadcrumb
        if (index === paths.length - 1 || (index === paths.length - 2 && paths[paths.length - 1].match(/^[0-9a-fA-F]{24}$/))) {
          setPageTitle(formattedPath);
        }
      });

      setBreadcrumbs(breadcrumbItems);
    };

    generateBreadcrumbs();
  }, [currentPath]);

  // Function to manually set page title and breadcrumbs
  const setNavigation = (title, customBreadcrumbs) => {
    setPageTitle(title);
    if (customBreadcrumbs) {
      setBreadcrumbs(customBreadcrumbs);
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPath,
        previousPath,
        breadcrumbs,
        pageTitle,
        setNavigation,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationContext;