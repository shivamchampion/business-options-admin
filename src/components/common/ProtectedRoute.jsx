import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, requiredRole, requiredPermission }) => {
  const { currentUser, loading, userRole, hasPermission } = useAuth();
  const location = useLocation();

  // Show loading spinner while auth state is being determined
  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access if required
  if (requiredRole && userRole !== requiredRole && userRole !== 'super_admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-blue">
        <div className="bg-white p-8 rounded-lg shadow-card max-w-md w-full text-center">
          <h2 className="text-h3 font-semibold text-dark-gray mb-4">Access Denied</h2>
          <p className="text-gray mb-6">
            You don't have the required role to access this page. Please contact an administrator if you believe this is an error.
          </p>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-medium-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Check permission-based access if required
  if (
    requiredPermission &&
    !hasPermission(requiredPermission.section, requiredPermission.action) &&
    userRole !== 'super_admin' &&
    userRole !== 'admin'
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-blue">
        <div className="bg-white p-8 rounded-lg shadow-card max-w-md w-full text-center">
          <h2 className="text-h3 font-semibold text-dark-gray mb-4">Access Denied</h2>
          <p className="text-gray mb-6">
            You don't have the required permissions to access this page. Please contact an administrator if you believe this is an error.
          </p>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-medium-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Render the protected content
  return children;
};

export default ProtectedRoute;