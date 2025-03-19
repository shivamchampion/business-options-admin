import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Clock, 
  Calendar, 
  Search, 
  RefreshCcw, 
  AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';

import PageHeader from '../../components/layout/PageHeader';
import ListingListTable from '../../components/listings/ListingListTable';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ConfirmationDialog from '../../components/common/ConfirmationDialog';
import { LISTING_TYPES, LISTING_STATUS } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';

const PendingApproval = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [listingType, setListingType] = useState('');
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [actionListing, setActionListing] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  // Fetch pending listings
  useEffect(() => {
    const fetchPendingListings = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // const response = await getListings({ 
        //   status: 'pending',
        //   sortField, 
        //   sortDirection,
        //   type: listingType || undefined,
        //   search: searchQuery || undefined
        // });
        
        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data for pending listings
        const mockPendingListings = [
          // Startup example
          {
            id: 'startup-789',
            name: 'AI-Powered EdTech Platform',
            type: LISTING_TYPES.STARTUP,
            status: LISTING_STATUS.PENDING,
            isFeatured: false,
            ownerName: 'Ananya Sharma',
            ownerId: 'user-789',
            createdAt: '2024-02-20T14:30:00Z',
            updatedAt: '2024-03-05T10:15:00Z',
            rating: {
              systemRating: 7.9
            },
            location: {
              city: 'Bangalore',
              state: 'Karnataka',
              country: 'India'
            },
            media: {
              featuredImage: {
                url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
              }
            },
            startupDetails: {
              developmentStage: 'Seed',
              foundedDate: '2022-10-15',
              funding: {
                fundingStage: 'Seed',
                currentRaisingAmount: {
                  value: 25000000,
                  currency: 'INR',
                  formatted: '₹2.5 Crore'
                },
                equityOffered: 15
              }
            },
            analytics: {
              viewCount: 0,
              contactCount: 0
            }
          },
          
          // Business example
          {
            id: 'business-456',
            name: 'Boutique Hotel in Goa',
            type: LISTING_TYPES.BUSINESS,
            status: LISTING_STATUS.PENDING,
            isFeatured: false,
            ownerName: 'Rohan Singhania',
            ownerId: 'user-456',
            createdAt: '2024-03-10T09:20:00Z',
            updatedAt: '2024-03-10T09:20:00Z',
            rating: {
              systemRating: 8.2
            },
            location: {
              city: 'Panaji',
              state: 'Goa',
              country: 'India'
            },
            media: {
              featuredImage: {
                url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
              }
            },
            businessDetails: {
              businessType: 'Hospitality',
              establishedYear: 2018,
              sale: {
                askingPrice: {
                  value: 75000000,
                  currency: 'INR',
                  formatted: '₹7.5 Crore'
                }
              }
            },
            analytics: {
              viewCount: 0,
              contactCount: 0
            }
          },
          
          // Digital Asset example
          {
            id: 'digital-123',
            name: 'Health & Fitness Blog with 50k Monthly Traffic',
            type: LISTING_TYPES.DIGITAL_ASSET,
            status: LISTING_STATUS.PENDING,
            isFeatured: false,
            ownerName: 'Meera Patel',
            ownerId: 'user-123',
            createdAt: '2024-03-12T15:40:00Z',
            updatedAt: '2024-03-12T15:40:00Z',
            rating: {
              systemRating: 7.6
            },
            location: {
              city: 'Remote',
              state: 'Not Applicable',
              country: 'India'
            },
            media: {
              featuredImage: {
                url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
              }
            },
            digitalAssetDetails: {
              assetType: 'Blog',
              platformFramework: 'WordPress',
              creationDate: '2020-08-15',
              traffic: {
                monthlyVisitors: 50000,
                monthlyPageviews: 120000
              },
              sale: {
                askingPrice: {
                  value: 1800000,
                  currency: 'INR',
                  formatted: '₹18,00,000'
                }
              }
            },
            analytics: {
              viewCount: 0,
              contactCount: 0
            }
          }
        ];
        
        // Apply filters
        let filteredListings = [...mockPendingListings];
        
        if (listingType) {
          filteredListings = filteredListings.filter(listing => listing.type === listingType);
        }
        
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredListings = filteredListings.filter(listing => 
            listing.name.toLowerCase().includes(query) || 
            listing.ownerName.toLowerCase().includes(query)
          );
        }
        
        // Apply sorting
        filteredListings.sort((a, b) => {
          // Handle nested fields
          const getNestedValue = (obj, path) => {
            const keys = path.split('.');
            return keys.reduce((o, key) => (o || {})[key], obj);
          };
          
          let aValue = sortField.includes('.') ? getNestedValue(a, sortField) : a[sortField];
          let bValue = sortField.includes('.') ? getNestedValue(b, sortField) : b[sortField];
          
          // Handle dates
          if (aValue && typeof aValue === 'string' && aValue.includes('T')) {
            aValue = new Date(aValue).getTime();
            bValue = new Date(bValue).getTime();
          }
          
          if (sortDirection === 'asc') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });
        
        setListings(filteredListings);
      } catch (error) {
        console.error('Error fetching pending listings:', error);
        toast.error('Failed to fetch pending listings');
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingListings();
  }, [sortField, sortDirection, listingType, searchQuery]);

  // Handle sort
  const handleSort = (field, direction) => {
    setSortField(field);
    setSortDirection(direction);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSortField('createdAt');
    setSortDirection('desc');
    setSearchQuery('');
    setListingType('');
  };

  // Handle approval action
  const handleApproveClick = (listing) => {
    setActionListing(listing);
    setShowApproveDialog(true);
  };

  const confirmApprove = async () => {
    if (!actionListing) return;
    
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      // await approveListingListing(actionListing.id);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setListings(listings.filter(listing => listing.id !== actionListing.id));
      toast.success(`${actionListing.name} has been approved and published`);
    } catch (error) {
      console.error('Error approving listing:', error);
      toast.error('Failed to approve listing');
    } finally {
      setLoading(false);
      setShowApproveDialog(false);
      setActionListing(null);
    }
  };

  // Handle rejection action
  const handleRejectClick = (listing) => {
    setActionListing(listing);
    setRejectReason('');
    setShowRejectDialog(true);
  };

  const confirmReject = async () => {
    if (!actionListing) return;
    
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      // await rejectListing(actionListing.id, rejectReason);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setListings(listings.filter(listing => listing.id !== actionListing.id));
      toast.success(`${actionListing.name} has been rejected`);
    } catch (error) {
      console.error('Error rejecting listing:', error);
      toast.error('Failed to reject listing');
    } finally {
      setLoading(false);
      setShowRejectDialog(false);
      setActionListing(null);
      setRejectReason('');
    }
  };

  // Handle view details
  const handleViewDetails = (listing) => {
    navigate(`/listings/${listing.id}`);
  };

  return (
    <div>
      <PageHeader
        title="Pending Approval"
        description="Review and approve listings waiting for publication."
        breadcrumbs={[
          { label: 'Listings', path: '/listings' },
          { label: 'Pending Approval' }
        ]}
      />

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-card border-l-4 border-warning">
          <div className="flex items-center">
            <div className="mr-3 p-2 bg-warning bg-opacity-10 rounded-md text-warning">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-gray text-sm">Pending Review</p>
              <p className="text-h3 font-semibold text-dark-gray mt-1">
                {listings.length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-card border-l-4 border-brand-blue">
          <div className="flex items-center">
            <div className="mr-3 p-2 bg-light-blue rounded-md text-brand-blue">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-gray text-sm">Submitted Today</p>
              <p className="text-h3 font-semibold text-dark-gray mt-1">
                {listings.filter(listing => {
                  const today = new Date();
                  const createdDate = new Date(listing.createdAt);
                  return today.toDateString() === createdDate.toDateString();
                }).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-card border-l-4 border-success">
          <div className="flex items-center">
            <div className="mr-3 p-2 bg-success bg-opacity-10 rounded-md text-success">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-gray text-sm">Average Time to Approve</p>
              <p className="text-h3 font-semibold text-dark-gray mt-1">
                1.5 days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alert for pending listings */}
      {listings.length > 0 && (
        <div className="bg-warning bg-opacity-10 border-l-4 border-warning text-warning-dark p-4 rounded-lg mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-warning" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-warning-800">
                There {listings.length === 1 ? 'is 1 listing' : `are ${listings.length} listings`} pending approval. 
                Timely reviews help maintain user satisfaction.
              </p>
            </div>
          </div>
        </div>
      )}

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
                  placeholder="Search pending listings..."
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
              <option value={LISTING_TYPES.BUSINESS}>Business</option>
              <option value={LISTING_TYPES.FRANCHISE}>Franchise</option>
              <option value={LISTING_TYPES.STARTUP}>Startup</option>
              <option value={LISTING_TYPES.INVESTOR}>Investor</option>
              <option value={LISTING_TYPES.DIGITAL_ASSET}>Digital Asset</option>
            </select>
            
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
              title="Reset filters"
            >
              <RefreshCcw size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Custom actions table */}
      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="large" text="Loading pending listings..." />
        </div>
      ) : listings.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 data-table">
              <thead className="data-table-header">
                <tr>
                  <th className="px-4 py-3 text-left whitespace-nowrap">
                    <button
                      className="flex items-center text-xs uppercase font-medium text-gray hover:text-dark-gray"
                      onClick={() => handleSort('name', sortDirection === 'asc' ? 'desc' : 'asc')}
                    >
                      Listing
                      {sortField === 'name' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">
                    <button
                      className="flex items-center text-xs uppercase font-medium text-gray hover:text-dark-gray"
                      onClick={() => handleSort('type', sortDirection === 'asc' ? 'desc' : 'asc')}
                    >
                      Type
                      {sortField === 'type' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">
                    <button
                      className="flex items-center text-xs uppercase font-medium text-gray hover:text-dark-gray"
                      onClick={() => handleSort('ownerName', sortDirection === 'asc' ? 'desc' : 'asc')}
                    >
                      Submitted By
                      {sortField === 'ownerName' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">
                    <button
                      className="flex items-center text-xs uppercase font-medium text-gray hover:text-dark-gray"
                      onClick={() => handleSort('createdAt', sortDirection === 'asc' ? 'desc' : 'asc')}
                    >
                      Submitted On
                      {sortField === 'createdAt' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
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
                {listings.map((listing) => (
                  <tr key={listing.id} className="data-table-row">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 relative rounded overflow-hidden bg-light-blue flex items-center justify-center">
                          {listing.media?.featuredImage?.url ? (
                            <img 
                              src={listing.media.featuredImage.url} 
                              alt={listing.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="bg-light-blue w-full h-full flex items-center justify-center">
                              <Eye size={20} className="text-brand-blue" />
                            </div>
                          )}
                        </div>
                        
                        <div className="ml-3">
                          <div className="text-sm font-medium text-dark-gray truncate max-w-xs">
                            {listing.name}
                          </div>
                          <div className="flex items-center text-xs text-gray">
                            {/* Display price or relevant field based on listing type */}
                            {listing.type === LISTING_TYPES.BUSINESS && listing.businessDetails?.sale?.askingPrice?.formatted && (
                              <span className="font-medium text-success mr-2">
                                {listing.businessDetails.sale.askingPrice.formatted}
                              </span>
                            )}
                            {listing.type === LISTING_TYPES.FRANCHISE && listing.franchiseDetails?.investment?.franchiseFee?.formatted && (
                              <span className="font-medium text-success mr-2">
                                FF: {listing.franchiseDetails.investment.franchiseFee.formatted}
                              </span>
                            )}
                            {listing.type === LISTING_TYPES.STARTUP && listing.startupDetails?.funding?.currentRaisingAmount?.formatted && (
                              <span className="font-medium text-success mr-2">
                                Raising: {listing.startupDetails.funding.currentRaisingAmount.formatted}
                              </span>
                            )}
                            {listing.type === LISTING_TYPES.DIGITAL_ASSET && listing.digitalAssetDetails?.sale?.askingPrice?.formatted && (
                              <span className="font-medium text-success mr-2">
                                {listing.digitalAssetDetails.sale.askingPrice.formatted}
                              </span>
                            )}
                            
                            {listing.location?.city && (
                              <span>
                                {listing.location.city}, {listing.location.state}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-dark-gray">
                        {listing.type === LISTING_TYPES.BUSINESS && 'Business'}
                        {listing.type === LISTING_TYPES.FRANCHISE && 'Franchise'}
                        {listing.type === LISTING_TYPES.STARTUP && 'Startup'}
                        {listing.type === LISTING_TYPES.INVESTOR && 'Investor'}
                        {listing.type === LISTING_TYPES.DIGITAL_ASSET && 'Digital Asset'}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-dark-gray">
                        {listing.ownerName}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray">
                        {formatDate(listing.createdAt, 'dd MMM yyyy')}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleViewDetails(listing)}
                          className="p-1 text-gray hover:text-brand-blue rounded-full hover:bg-light-blue transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleApproveClick(listing)}
                          className="p-1 text-gray hover:text-success rounded-full hover:bg-light-blue transition-colors"
                          title="Approve Listing"
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button
                          onClick={() => handleRejectClick(listing)}
                          className="p-1 text-gray hover:text-error rounded-full hover:bg-light-blue transition-colors"
                          title="Reject Listing"
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <CheckCircle size={48} className="text-success mx-auto mb-4" />
          <h3 className="text-lg font-medium text-dark-gray mb-2">No Pending Listings</h3>
          <p className="text-gray">All listings have been reviewed. Check back later for new submissions.</p>
        </div>
      )}

      {/* Approve Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showApproveDialog}
        onClose={() => setShowApproveDialog(false)}
        onConfirm={confirmApprove}
        title="Approve Listing"
        message={`Are you sure you want to approve "${actionListing?.name}"? This will publish the listing and make it visible to all users.`}
        confirmText="Approve"
        cancelText="Cancel"
        variant="success"
      />

      {/* Reject Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showRejectDialog}
        onClose={() => setShowRejectDialog(false)}
        onConfirm={confirmReject}
        title="Reject Listing"
        message={
          <div>
            <p className="mb-4">
              Are you sure you want to reject "{actionListing?.name}"? Please provide a reason for rejection:
            </p>
            <textarea
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-error focus:border-error"
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Explain why this listing is being rejected..."
            />
          </div>
        }
        confirmText="Reject"
        cancelText="Cancel"
        variant="error"
        destructive={true}
      />
    </div>
  );
};

export default PendingApproval;