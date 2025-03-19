import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, requiredPermission = null }) => {
  const { currentUser, loading, hasPermission } = useAuth();
  const location = useLocation();

  // Show loading spinner while authentication state is being determined
  if (loading) {
    return <LoadingSpinner fullScreen={true} />;
  }

  // If user is not logged in, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If a specific permission is required, check if user has it
  if (requiredPermission) {
    const [section, action] = requiredPermission.split('.');
    
    if (!hasPermission(section, action)) {
      // Redirect to dashboard with unauthorized message
      return <Navigate to="/dashboard" state={{ 
        unauthorized: true,
        message: "You don't have permission to access this page" 
      }} replace />;
    }
  }

  // User is authenticated and authorized, render the children
  return children;
};

export default ProtectedRoute;