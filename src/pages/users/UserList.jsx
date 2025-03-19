import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Filter, Search, RefreshCcw } from 'lucide-react';

import PageHeader from '../../components/layout/PageHeader';
import UserListTable from '../../components/users/UserListTable';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ConfirmationDialog from '../../components/common/ConfirmationDialog';
import EmptyState from '../../components/common/EmptyState';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [userToChangeStatus, setUserToChangeStatus] = useState(null);

  // Placeholder for data fetching
  useEffect(() => {
    // Simulate API call
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // const response = await getUsers({ sortField, sortDirection });
        // setUsers(response.users);
        
        // Simulate delay and empty data for now
        setTimeout(() => {
          setUsers([]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [sortField, sortDirection]);

  // Handle sort
  const handleSort = (field, direction) => {
    setSortField(field);
    setSortDirection(direction);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  // Handle user deletion
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    
    try {
      // In a real app, this would be an API call
      // await deleteUser(userToDelete.id);
      
      // Update local state
      setUsers(users.filter(user => user.id !== userToDelete.id));
      setShowDeleteDialog(false);
      setUserToDelete(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Handle status change
  const handleStatusClick = (user) => {
    setUserToChangeStatus(user);
    setShowStatusDialog(true);
  };

  const confirmStatusChange = async () => {
    if (!userToChangeStatus) return;
    
    try {
      const newStatus = userToChangeStatus.status === 'active' ? 'inactive' : 'active';
      
      // In a real app, this would be an API call
      // await updateUserStatus(userToChangeStatus.id, newStatus);
      
      // Update local state
      setUsers(
        users.map(user => 
          user.id === userToChangeStatus.id 
            ? { ...user, status: newStatus } 
            : user
        )
      );
      setShowStatusDialog(false);
      setUserToChangeStatus(null);
    } catch (error) {
      console.error('Error changing user status:', error);
    }
  };

  return (
    <div>
      <PageHeader
        title="User Management"
        description="View and manage all users of the Business Options Platform."
        breadcrumbs={[{ label: 'User Management' }]}
        actions={[
          {
            label: 'Add User',
            onClick: () => {/* Navigate to add user */},
            variant: 'primary',
            icon: <UserPlus size={16} />
          }
        ]}
      />

      {/* Filters and search */}
      <div className="bg-white p-4 rounded-lg shadow-card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <form onSubmit={handleSearch} className="flex">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                  placeholder="Search users by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="ml-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-medium-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
              >
                Search
              </button>
            </form>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
            >
              <Filter size={16} className="mr-2" />
              Filters
            </button>
            <button
              onClick={() => {
                setSortField('createdAt');
                setSortDirection('desc');
                setSearchQuery('');
                // Refetch users
              }}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
              title="Reset filters"
            >
              <RefreshCcw size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* User list table */}
      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="large" text="Loading users..." />
        </div>
      ) : (
        <UserListTable
          users={users}
          loading={loading}
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
          onDelete={handleDeleteClick}
          onChangeStatus={handleStatusClick}
        />
      )}

      {/* Delete confirmation dialog */}
      <ConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={confirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete ${userToDelete?.displayName || userToDelete?.email || 'this user'}? This action cannot be undone.`}
        confirmText="Delete User"
        cancelText="Cancel"
        variant="error"
        destructive={true}
      />

      {/* Status change confirmation dialog */}
      <ConfirmationDialog
        isOpen={showStatusDialog}
        onClose={() => setShowStatusDialog(false)}
        onConfirm={confirmStatusChange}
        title={userToChangeStatus?.status === 'active' ? 'Deactivate User' : 'Activate User'}
        message={
          userToChangeStatus?.status === 'active'
            ? `Are you sure you want to deactivate ${userToChangeStatus?.displayName || userToChangeStatus?.email || 'this user'}? They will no longer be able to access the platform.`
            : `Are you sure you want to activate ${userToChangeStatus?.displayName || userToChangeStatus?.email || 'this user'}? They will regain access to the platform.`
        }
        confirmText={userToChangeStatus?.status === 'active' ? 'Deactivate' : 'Activate'}
        cancelText="Cancel"
        variant={userToChangeStatus?.status === 'active' ? 'warning' : 'info'}
      />
    </div>
  );
};

export default UserList;