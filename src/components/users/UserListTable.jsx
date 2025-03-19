import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  UserPlus,
  ArrowUp,
  ArrowDown,
  User,
  Mail,
  Eye,
  Shield,
  CheckCircle,
  XCircle
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { formatDate, formatRelativeTime } from '../../utils/formatters';
import { USER_ROLES } from '../../utils/constants';

const UserListTable = ({
  users = [],
  loading = false,
  onSort = () => {},
  sortField = 'createdAt',
  sortDirection = 'desc',
  onDelete = () => {},
  onChangeStatus = () => {},
}) => {
  // Function to render user role with appropriate styling
  const renderUserRole = (role) => {
    switch (role) {
      case USER_ROLES.SUPER_ADMIN:
        return (
          <div className="flex items-center">
            <Shield size={14} className="text-error mr-1" />
            <span>Super Admin</span>
          </div>
        );
      case USER_ROLES.ADMIN:
        return (
          <div className="flex items-center">
            <Shield size={14} className="text-warning mr-1" />
            <span>Admin</span>
          </div>
        );
      case USER_ROLES.MODERATOR:
        return (
          <div className="flex items-center">
            <Shield size={14} className="text-brand-blue mr-1" />
            <span>Moderator</span>
          </div>
        );
      case USER_ROLES.ADVISOR:
        return (
          <div className="flex items-center">
            <UserPlus size={14} className="text-success mr-1" />
            <span>Advisor</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center">
            <User size={14} className="text-gray mr-1" />
            <span>User</span>
          </div>
        );
    }
  };

  // Handle sort click
  const handleSortClick = (field) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(field, direction);
  };

  // Render sort indicator
  const renderSortIndicator = (field) => {
    if (sortField !== field) {
      return null;
    }

    return sortDirection === 'asc' ? (
      <ArrowUp size={14} className="ml-1" />
    ) : (
      <ArrowDown size={14} className="ml-1" />
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="animate-pulse">
          {/* Table header */}
          <div className="px-4 py-3 bg-light-blue">
            <div className="grid grid-cols-6 gap-4">
              <div className="h-5 bg-gray-200 rounded col-span-1"></div>
              <div className="h-5 bg-gray-200 rounded col-span-1"></div>
              <div className="h-5 bg-gray-200 rounded col-span-1"></div>
              <div className="h-5 bg-gray-200 rounded col-span-1"></div>
              <div className="h-5 bg-gray-200 rounded col-span-1"></div>
              <div className="h-5 bg-gray-200 rounded col-span-1"></div>
            </div>
          </div>
          
          {/* Table rows */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="px-4 py-3 border-b border-gray-100 last:border-0">
              <div className="grid grid-cols-6 gap-4 items-center">
                <div className="flex items-center col-span-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-20 col-span-1"></div>
                <div className="h-4 bg-gray-200 rounded w-16 col-span-1"></div>
                <div className="h-4 bg-gray-200 rounded w-24 col-span-1"></div>
                <div className="h-8 bg-gray-200 rounded w-20 col-span-1"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // No users
  if (!users || users.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-card p-6 text-center">
        <User size={40} className="mx-auto text-gray-300 mb-3" />
        <h3 className="text-h4 font-medium text-dark-gray mb-2">No Users Found</h3>
        <p className="text-gray mb-4">There are no users matching your criteria.</p>
        <Link
          to="/users/create"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-medium-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
        >
          <UserPlus size={16} className="mr-2" />
          Add New User
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 data-table">
          <thead className="data-table-header">
            <tr>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                <button
                  className="flex items-center text-xs uppercase font-medium text-gray hover:text-dark-gray"
                  onClick={() => handleSortClick('displayName')}
                >
                  User
                  {renderSortIndicator('displayName')}
                </button>
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                <button
                  className="flex items-center text-xs uppercase font-medium text-gray hover:text-dark-gray"
                  onClick={() => handleSortClick('role')}
                >
                  Role
                  {renderSortIndicator('role')}
                </button>
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                <button
                  className="flex items-center text-xs uppercase font-medium text-gray hover:text-dark-gray"
                  onClick={() => handleSortClick('status')}
                >
                  Status
                  {renderSortIndicator('status')}
                </button>
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                <button
                  className="flex items-center text-xs uppercase font-medium text-gray hover:text-dark-gray"
                  onClick={() => handleSortClick('createdAt')}
                >
                  Registered
                  {renderSortIndicator('createdAt')}
                </button>
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                <button
                  className="flex items-center text-xs uppercase font-medium text-gray hover:text-dark-gray"
                  onClick={() => handleSortClick('lastLogin')}
                >
                  Last Login
                  {renderSortIndicator('lastLogin')}
                </button>
              </th>
              <th className="px-4 py-3 text-right whitespace-nowrap">
                <span className="text-xs uppercase font-medium text-gray">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="data-table-row">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 relative rounded-full bg-light-blue flex items-center justify-center text-brand-blue overflow-hidden">
                      {user.profileImage?.url ? (
                        <img 
                          src={user.profileImage.url} 
                          alt={user.displayName || user.email} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="font-semibold">
                          {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                        </span>
                      )}
                      
                      {/* Verification indicator */}
                      {user.emailVerified && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-success border-2 border-white" />
                      )}
                    </div>
                    
                    <div className="ml-3">
                      <div className="text-sm font-medium text-dark-gray">
                        {user.displayName || 'Unnamed User'}
                      </div>
                      <div className="flex items-center text-xs text-gray">
                        <Mail size={12} className="mr-1" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-dark-gray">
                    {renderUserRole(user.role)}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <StatusBadge 
                    status={user.status} 
                    type="user" 
                    size="small" 
                  />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray" title={formatDate(user.createdAt, 'dd MMM yyyy, HH:mm')}>
                    {formatDate(user.createdAt, 'dd MMM yyyy')}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray" title={formatDate(user.lastLogin, 'dd MMM yyyy, HH:mm')}>
                    {user.lastLogin ? formatRelativeTime(user.lastLogin) : 'Never'}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link
                      to={`/users/${user.id}`}
                      className="p-1 text-gray hover:text-brand-blue rounded-full hover:bg-light-blue transition-colors"
                      title="View User"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      to={`/users/${user.id}/edit`}
                      className="p-1 text-gray hover:text-warning rounded-full hover:bg-light-blue transition-colors"
                      title="Edit User"
                    >
                      <Edit size={18} />
                    </Link>
                    
                    {/* Status toggle button */}
                    <button
                      onClick={() => onChangeStatus(user)}
                      className={`p-1 rounded-full hover:bg-light-blue transition-colors ${
                        user.status === 'active' 
                          ? 'text-success hover:text-error' 
                          : 'text-error hover:text-success'
                      }`}
                      title={user.status === 'active' ? 'Deactivate User' : 'Activate User'}
                    >
                      {user.status === 'active' ? (
                        <XCircle size={18} />
                      ) : (
                        <CheckCircle size={18} />
                      )}
                    </button>
                    
                    {/* Delete button */}
                    <button
                      onClick={() => onDelete(user)}
                      className="p-1 text-gray hover:text-error rounded-full hover:bg-light-blue transition-colors"
                      title="Delete User"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListTable;