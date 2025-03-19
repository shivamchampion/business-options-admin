import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, User } from 'lucide-react';
import { formatRelativeTime } from '../../utils/formatters';

const RecentUsers = ({ users = [], loading = false }) => {
  if (loading) {
    return (
      <div className="animate-pulse">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="ml-3 flex-1">
              <div className="h-4 bg-gray-200 rounded w-2/5 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/5"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="py-6 text-center">
        <User size={24} className="mx-auto text-gray-300 mb-2" />
        <p className="text-gray">No users registered yet</p>
      </div>
    );
  }

  return (
    <div>
      {users.map((user) => (
        <div key={user.id} className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
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
            
            {/* Role indicator dot */}
            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
              ${user.role === 'admin' || user.role === 'super_admin' 
                ? 'bg-warning' 
                : user.role === 'advisor' 
                  ? 'bg-success' 
                  : user.role === 'moderator'
                    ? 'bg-brand-blue'
                    : 'bg-gray'
              }`}
            />
          </div>
          
          <div className="ml-3 flex-1">
            <h4 className="text-sm font-medium text-dark-gray truncate">
              {user.displayName || 'Unnamed User'}
            </h4>
            <p className="text-xs text-gray truncate">{user.email}</p>
          </div>
          
          <div className="text-xs text-gray">
            {formatRelativeTime(user.createdAt)}
          </div>
          
          <Link 
            to={`/users/${user.id}`} 
            className="ml-3 text-gray hover:text-brand-blue"
            title="View user details"
          >
            <ExternalLink size={16} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecentUsers;