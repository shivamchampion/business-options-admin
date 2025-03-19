import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListPlus, Filter, Search, RefreshCcw } from 'lucide-react';

import PageHeader from '../../components/layout/PageHeader';
import ListingListTable from '../../components/listings/ListingListTable';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ConfirmationDialog from '../../components/common/ConfirmationDialog';

const ListingList = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [listingType, setListingType] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [listingToChangeStatus, setListingToChangeStatus] = useState(null);
  const [showFeaturedDialog, setShowFeaturedDialog] = useState(false);
  const [listingToToggleFeatured, setListingToToggleFeatured] = useState(null);

  // Placeholder for data fetching
  useEffect(() => {
    // Simulate API call
    const fetchListings = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // const response = await getListings({ 
        //   sortField, 
        //   sortDirection,
        //   type: listingType || undefined 
        // });
        // setListings(response.listings);
        
        // Simulate delay and empty data for now
        setTimeout(() => {
          setListings([]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setListings([]);
        setLoading(false);
      }
    };

    fetchListings();
  }, [sortField, sortDirection, listingType]);

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

  // Handle listing deletion
  const handleDeleteClick = (listing) => {
    setListingToDelete(listing);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!listingToDelete) return;
    
    try {
      // In a real app, this would be an API call
      // await deleteListing(listingToDelete.id);
      
      // Update local state
      setListings(listings.filter(listing => listing.id !== listingToDelete.id));
      setShowDeleteDialog(false);
      setListingToDelete(null);
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  // Handle status change
  const handleStatusClick = (listing) => {
    setListingToChangeStatus(listing);
    setShowStatusDialog(true);
  };

  const confirmStatusChange = async () => {
    if (!listingToChangeStatus) return;
    
    try {
      const newStatus = listingToChangeStatus.status === 'published' ? 'draft' : 'published';
      
      // In a real app, this would be an API call
      // await updateListingStatus(listingToChangeStatus.id, newStatus);
      
      // Update local state
      setListings(
        listings.map(listing => 
          listing.id === listingToChangeStatus.id 
            ? { ...listing, status: newStatus } 
            : listing
        )
      );
      setShowStatusDialog(false);
      setListingToChangeStatus(null);
    } catch (error) {
      console.error('Error changing listing status:', error);
    }
  };

  // Handle featured toggle
  const handleFeaturedClick = (listing) => {
    setListingToToggleFeatured(listing);
    setShowFeaturedDialog(true);
  };

  const confirmFeaturedToggle = async () => {
    if (!listingToToggleFeatured) return;
    
    try {
      const featured = !listingToToggleFeatured.isFeatured;
      
      // In a real app, this would be an API call
      // await toggleListingFeatured(listingToToggleFeatured.id, featured);
      
      // Update local state
      setListings(
        listings.map(listing => 
          listing.id === listingToToggleFeatured.id 
            ? { ...listing, isFeatured: featured } 
            : listing
        )
      );
      setShowFeaturedDialog(false);
      setListingToToggleFeatured(null);
    } catch (error) {
      console.error('Error toggling featured status:', error);
    }
  };

  return (
    <div>
      <PageHeader
        title="Listings"
        description="View and manage all listings on the Business Options Platform."
        breadcrumbs={[{ label: 'Listings' }]}
        actions={[
          {
            label: 'Add Listing',
            onClick: () => navigate('/listings/create'),
            variant: 'primary',
            icon: <ListPlus size={16} />
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
                  placeholder="Search listings by name or description..."
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
              value={listingType}
              onChange={(e) => setListingType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="business">Business</option>
              <option value="franchise">Franchise</option>
              <option value="startup">Startup</option>
              <option value="investor">Investor</option>
              <option value="digital_asset">Digital Asset</option>
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
                setListingType('');
                // Refetch listings
              }}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
              title="Reset filters"
            >
              <RefreshCcw size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Listing list table */}
      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="large" text="Loading listings..." />
        </div>
      ) : (
        <ListingListTable
          listings={listings}
          loading={loading}
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
          onDelete={handleDeleteClick}
          onChangeStatus={handleStatusClick}
          onToggleFeatured={handleFeaturedClick}
        />
      )}

      {/* Delete confirmation dialog */}
      <ConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={confirmDelete}
        title="Delete Listing"
        message={`Are you sure you want to delete ${listingToDelete?.name || 'this listing'}? This action cannot be undone.`}
        confirmText="Delete Listing"
        cancelText="Cancel"
        variant="error"
        destructive={true}
      />

      {/* Status change confirmation dialog */}
      <ConfirmationDialog
        isOpen={showStatusDialog}
        onClose={() => setShowStatusDialog(false)}
        onConfirm={confirmStatusChange}
        title={listingToChangeStatus?.status === 'published' ? 'Unpublish Listing' : 'Publish Listing'}
        message={
          listingToChangeStatus?.status === 'published'
            ? `Are you sure you want to unpublish ${listingToChangeStatus?.name || 'this listing'}? It will no longer be visible to users.`
            : `Are you sure you want to publish ${listingToChangeStatus?.name || 'this listing'}? It will be visible to all users.`
        }
        confirmText={listingToChangeStatus?.status === 'published' ? 'Unpublish' : 'Publish'}
        cancelText="Cancel"
        variant={listingToChangeStatus?.status === 'published' ? 'warning' : 'info'}
      />

      {/* Featured toggle confirmation dialog */}
      <ConfirmationDialog
        isOpen={showFeaturedDialog}
        onClose={() => setShowFeaturedDialog(false)}
        onConfirm={confirmFeaturedToggle}
        title={listingToToggleFeatured?.isFeatured ? 'Remove Featured Status' : 'Mark as Featured'}
        message={
          listingToToggleFeatured?.isFeatured
            ? `Are you sure you want to remove featured status from ${listingToToggleFeatured?.name || 'this listing'}?`
            : `Are you sure you want to mark ${listingToToggleFeatured?.name || 'this listing'} as featured? Featured listings appear prominently on the platform.`
        }
        confirmText={listingToToggleFeatured?.isFeatured ? 'Remove Featured' : 'Mark as Featured'}
        cancelText="Cancel"
        variant="info"
      />
    </div>
  );
};

export default ListingList;