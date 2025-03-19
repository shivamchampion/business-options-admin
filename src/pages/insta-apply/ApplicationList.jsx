import React, { useState, useEffect } from 'react';
import { Filter, Search, RefreshCcw, Users, UserCheck } from 'lucide-react';

import PageHeader from '../../components/layout/PageHeader';
import ApplicationListTable from '../../components/insta-apply/ApplicationListTable';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ConfirmationDialog from '../../components/common/ConfirmationDialog';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [applicationToAssign, setApplicationToAssign] = useState(null);
  const [showConvertDialog, setShowConvertDialog] = useState(false);
  const [applicationToConvert, setApplicationToConvert] = useState(null);

  // Placeholder for data fetching
  useEffect(() => {
    // Simulate API call
    const fetchApplications = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // const response = await getApplications({ 
        //   sortField, 
        //   sortDirection,
        //   status: statusFilter || undefined 
        // });
        // setApplications(response.applications);
        
        // Simulate delay and empty data for now
        setTimeout(() => {
          setApplications([]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setApplications([]);
        setLoading(false);
      }
    };

    fetchApplications();
  }, [sortField, sortDirection, statusFilter]);

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

  // Handle application deletion
  const handleDeleteClick = (application) => {
    setApplicationToDelete(application);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!applicationToDelete) return;
    
    try {
      // In a real app, this would be an API call
      // await deleteApplication(applicationToDelete.id);
      
      // Update local state
      setApplications(applications.filter(app => app.id !== applicationToDelete.id));
      setShowDeleteDialog(false);
      setApplicationToDelete(null);
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  // Handle application assignment
  const handleAssignClick = (application) => {
    setApplicationToAssign(application);
    setShowAssignDialog(true);
  };

  const confirmAssign = async () => {
    if (!applicationToAssign) return;
    
    try {
      // In a real app, this would be an API call to assign to current user
      // const currentUser = { id: 'current-user-id', name: 'Current User' };
      // await assignApplication(applicationToAssign.id, currentUser.id, currentUser.name);
      
      // Update local state
      setApplications(
        applications.map(app => 
          app.id === applicationToAssign.id 
            ? { 
                ...app, 
                assignedTo: 'current-user-id',
                assignedToName: 'Current User'
              } 
            : app
        )
      );
      setShowAssignDialog(false);
      setApplicationToAssign(null);
    } catch (error) {
      console.error('Error assigning application:', error);
    }
  };

  // Handle convert to lead
  const handleConvertClick = (application) => {
    setApplicationToConvert(application);
    setShowConvertDialog(true);
  };

  const confirmConvert = async () => {
    if (!applicationToConvert) return;
    
    try {
      // In a real app, this would be an API call
      // await convertToLead(applicationToConvert.id, {
      //   assignedTo: 'current-user-id',
      //   createdBy: 'current-user-id'
      // });
      
      // Update local state
      setApplications(
        applications.map(app => 
          app.id === applicationToConvert.id 
            ? { ...app, status: 'converted', isConverted: true } 
            : app
        )
      );
      setShowConvertDialog(false);
      setApplicationToConvert(null);
    } catch (error) {
      console.error('Error converting application:', error);
    }
  };

  return (
    <div>
      <PageHeader
        title="Insta Apply Applications"
        description="Manage quick applications submitted by potential customers."
        breadcrumbs={[{ label: 'Applications' }]}
        stats={[
          {
            label: 'New Applications',
            value: '0',
            icon: <Users size={18} />,
            change: { type: 'neutral', value: '+0%' }
          },
          {
            label: 'Assigned to You',
            value: '0',
            icon: <UserCheck size={18} />,
            change: { type: 'neutral', value: '+0%' }
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
                  placeholder="Search by name or email..."
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
            <select
              className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
            </select>
            <button
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
            >
              <Filter size={16} className="mr-2" />
              More Filters
            </button>
            <button
              onClick={() => {
                setSortField('createdAt');
                setSortDirection('desc');
                setSearchQuery('');
                setStatusFilter('');
                // Refetch applications
              }}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
              title="Reset filters"
            >
              <RefreshCcw size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Application list table */}
      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="large" text="Loading applications..." />
        </div>
      ) : (
        <ApplicationListTable
          applications={applications}
          loading={loading}
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
          onDelete={handleDeleteClick}
          onAssign={handleAssignClick}
          onConvert={handleConvertClick}
        />
      )}

      {/* Delete confirmation dialog */}
      <ConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={confirmDelete}
        title="Delete Application"
        message={`Are you sure you want to delete the application from ${applicationToDelete?.applicantName || 'this applicant'}? This action cannot be undone.`}
        confirmText="Delete Application"
        cancelText="Cancel"
        variant="error"
        destructive={true}
      />

      {/* Assign confirmation dialog */}
      <ConfirmationDialog
        isOpen={showAssignDialog}
        onClose={() => setShowAssignDialog(false)}
        onConfirm={confirmAssign}
        title="Assign Application"
        message={`Are you sure you want to assign the application from ${applicationToAssign?.applicantName || 'this applicant'} to yourself?`}
        confirmText="Assign to Me"
        cancelText="Cancel"
        variant="info"
      />

      {/* Convert confirmation dialog */}
      <ConfirmationDialog
        isOpen={showConvertDialog}
        onClose={() => setShowConvertDialog(false)}
        onConfirm={confirmConvert}
        title="Convert to Lead"
        message={`Are you sure you want to convert the application from ${applicationToConvert?.applicantName || 'this applicant'} to a lead?`}
        confirmText="Convert to Lead"
        cancelText="Cancel"
        variant="info"
      />
    </div>
  );
};

export default ApplicationList;