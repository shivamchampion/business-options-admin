import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star, 
  Calendar, 
  Search, 
  RefreshCcw, 
  Filter, 
  Eye, 
  XCircle,
  Clock,
  Download,
  Info
} from 'lucide-react';
import toast from 'react-hot-toast';

import PageHeader from '../../components/layout/PageHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ConfirmationDialog from '../../components/common/ConfirmationDialog';
import { LISTING_TYPES, LISTING_STATUS } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';

const FeaturedListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState('featuredUntil');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [listingType, setListingType] = useState('');
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showExtendDialog, setShowExtendDialog] = useState(false);
  const [extensionDays, setExtensionDays] = useState(30);

  // Fetch featured listings
  useEffect(() => {
    const fetchFeaturedListings = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // const response = await getFeaturedListings({ 
        //   sortField, 
        //   sortDirection,
        //   type: listingType || undefined,
        //   search: searchQuery || undefined
        // });
        
        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data for featured listings
        const mockFeaturedListings = [
          // Business example
          {
            id: 'business-123',
            name: 'Premium Restaurant in South Delhi',
            type: LISTING_TYPES.BUSINESS,
            status: LISTING_STATUS.PUBLISHED,
            isFeatured: true,
            featuredUntil: new Date('2025-04-30').toISOString(),
            ownerName: 'Rajesh Kumar',
            ownerId: 'user-123',
            createdAt: '2024-02-15T10:00:00Z',
            updatedAt: '2024-03-10T14:30:00Z',
            publishedAt: '2024-02-20T09:15:00Z',
            expiresAt: '2024-08-20T09:15:00Z',
            location: {
              city: 'New Delhi',
              state: 'Delhi',
              country: 'India'
            },
            media: {
              featuredImage: {
                url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
              }
            },
            businessDetails: {
              businessType: 'Restaurant',
              establishedYear: 2013,
              sale: {
                askingPrice: {
                  value: 15000000,
                  currency: 'INR',
                  formatted: '₹1,50,00,000'
                }
              }
            },
            analytics: { 
              viewCount: 1245,
              contactCount: 32
            },
            featuredBy: 'admin-user-1',
            featuredDate: '2024-03-01T10:30:00Z'
          },
          
          // Investor example
          {
            id: 'investor-456',
            name: 'Angel Investor for Tech Startups',
            type: LISTING_TYPES.INVESTOR,
            status: LISTING_STATUS.PUBLISHED,
            isFeatured: true,
            featuredUntil: new Date('2025-05-15').toISOString(),
            ownerName: 'Priya Patel',
            ownerId: 'user-456',
            createdAt: '2024-02-10T16:45:00Z',
            updatedAt: '2024-02-25T09:30:00Z',
            publishedAt: '2024-02-15T11:20:00Z',
            expiresAt: '2024-08-15T11:20:00Z',
            location: {
              city: 'Hyderabad',
              state: 'Telangana',
              country: 'India'
            },
            media: {
              featuredImage: {
                url: 'https://images.unsplash.com/photo-1553484771-047a44eee7a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
              }
            },
            investorDetails: {
              investorType: 'Angel',
              yearsOfExperience: 12,
              investment: {
                annualInvestmentTarget: {
                  value: 50000000,
                  currency: 'INR',
                  formatted: '₹5 Crore'
                }
              }
            },
            analytics: {
              viewCount: 742,
              contactCount: 28
            },
            featuredBy: 'admin-user-2',
            featuredDate: '2024-02-15T14:20:00Z'
          },
          
          // Digital Asset example
          {
            id: 'digital-789',
            name: 'E-commerce Store with 100k Monthly Visitors',
            type: LISTING_TYPES.DIGITAL_ASSET,
            status: LISTING_STATUS.PUBLISHED,
            isFeatured: true,
            featuredUntil: new Date('2025-03-25').toISOString(),
            ownerName: 'Arjun Reddy',
            ownerId: 'user-789',
            createdAt: '2024-03-05T11:20:00Z',
            updatedAt: '2024-03-15T14:10:00Z',
            publishedAt: '2024-03-10T09:45:00Z',
            expiresAt: '2024-09-10T09:45:00Z',
            location: {
              city: 'Remote',
              state: 'Not Applicable',
              country: 'India'
            },
            media: {
              featuredImage: {
                url: 'https://images.unsplash.com/photo-1561715276-a2d087060f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
              }
            },
            digitalAssetDetails: {
              assetType: 'E-commerce Store',
              sale: {
                askingPrice: {
                  value: 3500000,
                  currency: 'INR',
                  formatted: '₹35,00,000'
                }
              },
              traffic: {
                monthlyVisitors: 100000
              }
            },
            analytics: {
              viewCount: 319,
              contactCount: 8
            },
            featuredBy: 'admin-user-1',
            featuredDate: '2024-03-12T16:30:00Z'
          },
          
          // Franchise example
          {
            id: 'franchise-101',
            name: 'Coffee Franchise Opportunity',
            type: LISTING_TYPES.FRANCHISE,
            status: LISTING_STATUS.PUBLISHED,
            isFeatured: true,
            featuredUntil: new Date('2025-06-10').toISOString(),
            ownerName: 'Vikram Mehta',
            ownerId: 'user-101',
            createdAt: '2024-01-28T09:15:00Z',
            updatedAt: '2024-02-10T11:45:00Z',
            publishedAt: '2024-02-01T12:30:00Z',
            expiresAt: '2024-08-01T12:30:00Z',
            location: {
              city: 'Mumbai',
              state: 'Maharashtra',
              country: 'India'
            },
            media: {
              featuredImage: {
                url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
              }
            },
            franchiseDetails: {
              franchiseBrand: 'Brew Haven',
              franchiseType: 'Coffee Shop',
              investment: {
                franchiseFee: {
                  value: 1500000,
                  currency: 'INR',
                  formatted: '₹15,00,000'
                }
              }
            },
            analytics: {
              viewCount: 875,
              contactCount: 19
            },
            featuredBy: 'admin-user-3',
            featuredDate: '2024-02-05T11:15:00Z'
          },
          
          // Startup example
          {
            id: 'startup-202',
            name: 'AI-Powered Healthcare Solution',
            type: LISTING_TYPES.STARTUP,
            status: LISTING_STATUS.PUBLISHED,
            isFeatured: true,
            featuredUntil: new Date('2025-07-01').toISOString(),
            ownerName: 'Sanjay Gupta',
            ownerId: 'user-202',
            createdAt: '2024-03-01T15:40:00Z',
            updatedAt: '2024-03-05T10:20:00Z',
            publishedAt: '2024-03-05T12:15:00Z',
            expiresAt: '2024-09-05T12:15:00Z',
            location: {
              city: 'Bangalore',
              state: 'Karnataka',
              country: 'India'
            },
            media: {
              featuredImage: {
                url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
              }
            },
            startupDetails: {
              developmentStage: 'Seed',
              funding: {
                currentRaisingAmount: {
                  value: 30000000,
                  currency: 'INR',
                  formatted: '₹3 Crore'
                }
              }
            },
            analytics: {
              viewCount: 412,
              contactCount: 15
            },
            featuredBy: 'admin-user-2',
            featuredDate: '2024-03-06T09:10:00Z'
          }
        ];
        
        // Apply filters
        let filteredListings = [...mockFeaturedListings];
        
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
          let aValue, bValue;
          
          // Handle special case for featuredUntil
          if (sortField === 'featuredUntil') {
            aValue = new Date(a.featuredUntil).getTime();
            bValue = new Date(b.featuredUntil).getTime();
          } else {
            // Handle nested fields
            const getNestedValue = (obj, path) => {
              const keys = path.split('.');
              return keys.reduce((o, key) => (o || {})[key], obj);
            };
            
            aValue = sortField.includes('.') ? getNestedValue(a, sortField) : a[sortField];
            bValue = sortField.includes('.') ? getNestedValue(b, sortField) : b[sortField];
            
            // Handle dates
            if (aValue && typeof aValue === 'string' && aValue.includes('T')) {
              aValue = new Date(aValue).getTime();
              bValue = new Date(bValue).getTime();
            }
          }
          
          if (sortDirection === 'asc') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });
        
        setListings(filteredListings);
      } catch (error) {
        console.error('Error fetching featured listings:', error);
        toast.error('Failed to fetch featured listings');
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedListings();
  }, [sortField, sortDirection, listingType, searchQuery]);

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already handled by the useEffect dependency
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSortField('featuredUntil');
    setSortDirection('asc');
    setSearchQuery('');
    setListingType('');
  };

  // Handle remove from featured
  const handleRemoveFeatured = (listing) => {
    setSelectedListing(listing);
    setShowRemoveDialog(true);
  };

  const confirmRemoveFeatured = async () => {
    if (!selectedListing) return;
    
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      // await removeFeaturedStatus(selectedListing.id);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setListings(listings.filter(listing => listing.id !== selectedListing.id));
      toast.success(`${selectedListing.name} removed from featured listings`);
    } catch (error) {
      console.error('Error removing featured status:', error);
      toast.error('Failed to remove featured status');
    } finally {
      setLoading(false);
      setShowRemoveDialog(false);
      setSelectedListing(null);
    }
  };

  // Handle extend featured period
  const handleExtendFeatured = (listing) => {
    setSelectedListing(listing);
    setExtensionDays(30); // Default to 30 days
    setShowExtendDialog(true);
  };

  const confirmExtendFeatured = async () => {
    if (!selectedListing) return;
    
    try {
      setLoading(true);
      
      // Calculate new expiry date
      const currentFeaturedUntil = new Date(selectedListing.featuredUntil);
      const newFeaturedUntil = new Date(currentFeaturedUntil);
      newFeaturedUntil.setDate(newFeaturedUntil.getDate() + extensionDays);
      
      // In a real app, this would be an API call
      // await extendFeaturedPeriod(selectedListing.id, newFeaturedUntil);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setListings(
        listings.map(listing => 
          listing.id === selectedListing.id 
            ? { 
                ...listing, 
                featuredUntil: newFeaturedUntil.toISOString()
              } 
            : listing
        )
      );
      
      toast.success(`Featured period extended for ${selectedListing.name}`);
    } catch (error) {
      console.error('Error extending featured period:', error);
      toast.error('Failed to extend featured period');
    } finally {
      setLoading(false);
      setShowExtendDialog(false);
      setSelectedListing(null);
    }
  };

  // Handle view details
  const handleViewDetails = (listing) => {
    navigate(`/listings/${listing.id}`);
  };

  // Export featured listings
  const handleExportListings = () => {
    toast.success('Exporting featured listings...');
    // In a real app, this would trigger an API call to generate a CSV/Excel file
  };

  // Days remaining for featured listings
  const getDaysRemaining = (featuredUntil) => {
    const now = new Date();
    const endDate = new Date(featuredUntil);
    const diffTime = endDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div>
      <PageHeader
        title="Featured Listings"
        description="Manage listings with premium visibility on the platform."
        breadcrumbs={[
          { label: 'Listings', path: '/listings' },
          { label: 'Featured Listings' }
        ]}
        actions={[
          {
            label: 'Export',
            onClick: handleExportListings,
            variant: 'default',
            icon: <Download size={16} />
          }
        ]}
      />

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-card border-l-4 border-warning">
          <div className="flex items-center">
            <div className="mr-3 p-2 bg-warning bg-opacity-10 rounded-md text-warning">
              <Star size={20} />
            </div>
            <div>
              <p className="text-gray text-sm">Total Featured</p>
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
              <p className="text-gray text-sm">Expiring Within 30 Days</p>
              <p className="text-h3 font-semibold text-dark-gray mt-1">
                {listings.filter(listing => {
                  const daysRemaining = getDaysRemaining(listing.featuredUntil);
                  return daysRemaining <= 30 && daysRemaining > 0;
                }).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-card border-l-4 border-success">
          <div className="flex items-center">
            <div className="mr-3 p-2 bg-success bg-opacity-10 rounded-md text-success">
              <Eye size={20} />
            </div>
            <div>
              <p className="text-gray text-sm">Total Featured Views</p>
              <p className="text-h3 font-semibold text-dark-gray mt-1">
                {listings.reduce((total, listing) => total + (listing.analytics?.viewCount || 0), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info box */}
      <div className="bg-light-blue bg-opacity-70 border-l-4 border-brand-blue text-dark-gray p-4 rounded-lg mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-brand-blue" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm">
              Featured listings receive premium placement on the platform, appearing at the top of search results and on the homepage. 
              They typically receive 3-5x more views than standard listings.
            </p>
          </div>
        </div>
      </div>

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
                  placeholder="Search featured listings..."
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

      {/* Featured listings table */}
      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="large" text="Loading featured listings..." />
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
                      onClick={() => handleSort('name')}
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
                      onClick={() => handleSort('type')}
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
                      onClick={() => handleSort('featuredDate')}
                    >
                      Featured Since
                      {sortField === 'featuredDate' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">
                    <button 
                      className="flex items-center text-xs uppercase font-medium text-gray hover:text-dark-gray"
                      onClick={() => handleSort('featuredUntil')}
                    >
                      Expires In
                      {sortField === 'featuredUntil' && (
                        <span className="ml-1">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left whitespace-nowrap">
                    <button 
                      className="flex items-center text-xs uppercase font-medium text-gray hover:text-dark-gray"
                      onClick={() => handleSort('analytics.viewCount')}
                    >
                      Views
                      {sortField === 'analytics.viewCount' && (
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
                {listings.map((listing) => {
                  const daysRemaining = getDaysRemaining(listing.featuredUntil);
                  const isExpiringSoon = daysRemaining <= 7 && daysRemaining > 0;
                  const isExpired = daysRemaining <= 0;
                  
                  return (
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
                                <Star size={20} className="text-warning" />
                              </div>
                            )}
                            
                            <div className="absolute top-0 right-0 w-4 h-4 bg-warning flex items-center justify-center">
                              <Star size={10} className="text-white" />
                            </div>
                          </div>
                          
                          <div className="ml-3">
                            <div className="text-sm font-medium text-dark-gray truncate max-w-xs">
                              {listing.name}
                            </div>
                            <div className="flex items-center text-xs text-gray">
                              {/* Display price based on listing type */}
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
                        <div className="text-sm text-gray">
                          {formatDate(listing.featuredDate, 'dd MMM yyyy')}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className={`text-sm ${
                          isExpired ? 'text-error' : 
                          isExpiringSoon ? 'text-warning' : 
                          'text-success'
                        } font-medium`}>
                          {isExpired ? (
                            'Expired'
                          ) : (
                            `${daysRemaining} days`
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray">
                          <Eye size={16} className="mr-1" />
                          {listing.analytics?.viewCount?.toLocaleString() || 0}
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
                            onClick={() => handleExtendFeatured(listing)}
                            className="p-1 text-gray hover:text-success rounded-full hover:bg-light-blue transition-colors"
                            title="Extend Featured Period"
                          >
                            <Calendar size={18} />
                          </button>
                          
                          <button
                            onClick={() => handleRemoveFeatured(listing)}
                            className="p-1 text-gray hover:text-error rounded-full hover:bg-light-blue transition-colors"
                            title="Remove Featured Status"
                          >
                            <XCircle size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <Star size={48} className="text-warning mx-auto mb-4" />
          <h3 className="text-lg font-medium text-dark-gray mb-2">No Featured Listings</h3>
          <p className="text-gray">There are currently no featured listings on the platform.</p>
          <button
            onClick={() => navigate('/listings')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-medium-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
          >
            Browse All Listings
          </button>
        </div>
      )}

      {/* Remove Featured Dialog */}
      <ConfirmationDialog
        isOpen={showRemoveDialog}
        onClose={() => setShowRemoveDialog(false)}
        onConfirm={confirmRemoveFeatured}
        title="Remove Featured Status"
        message={`Are you sure you want to remove the featured status from "${selectedListing?.name}"? It will no longer appear in featured sections of the platform.`}
        confirmText="Remove Featured"
        cancelText="Cancel"
        variant="warning"
      />

      {/* Extend Featured Dialog */}
      <ConfirmationDialog
        isOpen={showExtendDialog}
        onClose={() => setShowExtendDialog(false)}
        onConfirm={confirmExtendFeatured}
        title="Extend Featured Period"
        message={
          <div>
            <p className="mb-4">
              Current expiry date: <strong>{selectedListing && formatDate(selectedListing.featuredUntil, 'dd MMM yyyy')}</strong>
            </p>
            <p className="mb-2">Select extension period:</p>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
              value={extensionDays}
              onChange={(e) => setExtensionDays(parseInt(e.target.value, 10))}
            >
              <option value={7}>7 days</option>
              <option value={30}>30 days</option>
              <option value={60}>60 days</option>
              <option value={90}>90 days</option>
            </select>
            <p className="mt-4">
              New expiry date: <strong>
                {selectedListing && formatDate(
                  new Date(
                    new Date(selectedListing.featuredUntil).getTime() + 
                    extensionDays * 24 * 60 * 60 * 1000
                  ),
                  'dd MMM yyyy'
                )}
              </strong>
            </p>
          </div>
        }
        confirmText="Extend"
        cancelText="Cancel"
        variant="info"
      />
    </div>
  );
};

export default FeaturedListings;