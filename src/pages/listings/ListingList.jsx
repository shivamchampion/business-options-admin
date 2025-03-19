import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ListPlus, 
  Filter, 
  Search, 
  RefreshCcw, 
  Calendar, 
  MoreVertical, 
  Download,
  ChevronDown,
  Check,
  CheckSquare,
  Circle,
  Star,
  AlertTriangle,
  SlidersHorizontal,
  X,
  ArrowUp,
  ArrowDown,
  MapPin,
  DollarSign,
  Eye,
  Trash
} from 'lucide-react';
import toast from 'react-hot-toast';

import PageHeader from '../../components/layout/PageHeader';
import ListingListTable from '../../components/listings/ListingListTable';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ConfirmationDialog from '../../components/common/ConfirmationDialog';
import { LISTING_TYPES, LISTING_STATUS } from '../../utils/constants';
import { formatDate, formatCurrency } from '../../utils/formatters';

const ListingList = () => {
  const navigate = useNavigate();
  
  // State for listings and loading
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Sorting state
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Basic filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [listingType, setListingType] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [featuredFilter, setFeaturedFilter] = useState('');
  
  // Advanced filters state
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [dateRangeStart, setDateRangeStart] = useState('');
  const [dateRangeEnd, setDateRangeEnd] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  
  // Type-specific filter states
  const [businessTypeFilter, setBusinessTypeFilter] = useState('');
  const [franchiseTypeFilter, setFranchiseTypeFilter] = useState('');
  const [startupStageFilter, setStartupStageFilter] = useState('');
  const [investorTypeFilter, setInvestorTypeFilter] = useState('');
  const [digitalAssetTypeFilter, setDigitalAssetTypeFilter] = useState('');
  
  // Bulk action states
  const [selectedListings, setSelectedListings] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showBulkActionMenu, setShowBulkActionMenu] = useState(false);
  
  // Confirmation dialog states
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [listingToChangeStatus, setListingToChangeStatus] = useState(null);
  const [showBulkStatusDialog, setShowBulkStatusDialog] = useState(false);
  const [bulkStatusAction, setBulkStatusAction] = useState('');
  const [showFeaturedDialog, setShowFeaturedDialog] = useState(false);
  const [listingToToggleFeatured, setListingToToggleFeatured] = useState(null);
  const [showBulkFeaturedDialog, setShowBulkFeaturedDialog] = useState(false);
  const [bulkFeaturedAction, setBulkFeaturedAction] = useState('');
  
  // Industry options for filter
  const industryOptions = [
    { value: 'agriculture', label: 'Agriculture & Farming' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'beauty', label: 'Beauty & Wellness' },
    { value: 'construction', label: 'Construction & Real Estate' },
    { value: 'ecommerce', label: 'E-commerce & Retail' },
    { value: 'education', label: 'Education & Training' },
    { value: 'food', label: 'Food & Beverage' },
    { value: 'healthcare', label: 'Healthcare & Medical' },
    { value: 'hospitality', label: 'Hospitality & Tourism' },
    { value: 'it', label: 'IT & Technology' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'professional', label: 'Professional Services' },
    { value: 'telecom', label: 'Telecommunications' },
    { value: 'transportation', label: 'Transportation & Logistics' },
    { value: 'other', label: 'Other' }
  ];
  
  // Location options for filter (major Indian cities)
  const locationOptions = [
    { value: 'delhi', label: 'Delhi' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'pune', label: 'Pune' },
    { value: 'ahmedabad', label: 'Ahmedabad' },
    { value: 'jaipur', label: 'Jaipur' },
    { value: 'remote', label: 'Remote' },
    { value: 'other', label: 'Other' }
  ];
  
  // Business type options
  const businessTypeOptions = [
    { value: 'retail', label: 'Retail' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'service', label: 'Service' },
    { value: 'distribution', label: 'Distribution' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'it', label: 'IT/Technology' },
    { value: 'hospitality', label: 'Hospitality' },
    { value: 'education', label: 'Education' },
    { value: 'other', label: 'Other' }
  ];
  
  // Franchise type options
  const franchiseTypeOptions = [
    { value: 'food', label: 'Food & Beverage' },
    { value: 'retail', label: 'Retail' },
    { value: 'education', label: 'Education' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'services', label: 'Services' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'other', label: 'Other' }
  ];
  
  // Startup stage options
  const startupStageOptions = [
    { value: 'idea', label: 'Idea/Concept' },
    { value: 'mvp', label: 'MVP' },
    { value: 'pre_seed', label: 'Pre-Seed' },
    { value: 'seed', label: 'Seed' },
    { value: 'series_a', label: 'Series A' },
    { value: 'series_b', label: 'Series B+' }
  ];
  
  // Investor type options
  const investorTypeOptions = [
    { value: 'angel', label: 'Angel' },
    { value: 'vc', label: 'Venture Capital' },
    { value: 'pe', label: 'Private Equity' },
    { value: 'family_office', label: 'Family Office' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'individual', label: 'Individual' }
  ];
  
  // Digital asset type options
  const digitalAssetTypeOptions = [
    { value: 'website', label: 'Website' },
    { value: 'ecommerce', label: 'E-commerce Store' },
    { value: 'blog', label: 'Blog' },
    { value: 'app', label: 'Mobile App' },
    { value: 'saas', label: 'SaaS Platform' },
    { value: 'social_media', label: 'Social Media Account' },
    { value: 'domain', label: 'Domain Name' },
    { value: 'other', label: 'Other' }
  ];

  // Placeholder for data fetching
  useEffect(() => {
    // Simulate API call
    const fetchListings = async () => {
      setLoading(true);
      try {
        // Build query parameters
        const queryParams = {
          page,
          pageSize,
          sortField,
          sortDirection,
          search: searchQuery,
          type: listingType || undefined,
          status: statusFilter || undefined,
          featured: featuredFilter || undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
          location: locationFilter || undefined,
          industry: industryFilter || undefined,
          startDate: dateRangeStart || undefined,
          endDate: dateRangeEnd || undefined,
          owner: ownerFilter || undefined,
          rating: ratingFilter || undefined,
          businessType: businessTypeFilter || undefined,
          franchiseType: franchiseTypeFilter || undefined,
          startupStage: startupStageFilter || undefined,
          investorType: investorTypeFilter || undefined,
          digitalAssetType: digitalAssetTypeFilter || undefined
        };
        
        // In a real app, this would be an API call
        // const response = await getListings(queryParams);
        
        // Simulate delay and mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data with one example of each listing type
        const mockListings = [
          // Business example
          {
            id: 'business-123',
            name: 'Premium Restaurant in South Delhi',
            type: LISTING_TYPES.BUSINESS,
            status: LISTING_STATUS.PUBLISHED,
            isFeatured: true,
            featuredUntil: new Date('2025-04-30'),
            ownerName: 'Rajesh Kumar',
            ownerId: 'user-123',
            createdAt: '2024-02-15T10:00:00Z',
            updatedAt: '2024-03-10T14:30:00Z',
            publishedAt: '2024-02-20T09:15:00Z',
            expiresAt: '2024-08-20T09:15:00Z',
            rating: {
              average: 8.5,
              count: 12,
              systemRating: 8.7
            },
            location: {
              city: 'New Delhi',
              state: 'Delhi',
              country: 'India'
            },
            industries: ['food', 'hospitality'],
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
            }
          },
          
          // Franchise example
          {
            id: 'franchise-456',
            name: 'Coffee Franchise Opportunity',
            type: LISTING_TYPES.FRANCHISE,
            status: LISTING_STATUS.PUBLISHED,
            isFeatured: false,
            ownerName: 'Vikram Mehta',
            ownerId: 'user-456',
            createdAt: '2024-01-28T09:15:00Z',
            updatedAt: '2024-02-10T11:45:00Z',
            publishedAt: '2024-02-01T12:30:00Z',
            expiresAt: '2024-08-01T12:30:00Z',
            rating: {
              average: 7.8,
              count: 8,
              systemRating: 8.2
            },
            location: {
              city: 'Mumbai',
              state: 'Maharashtra',
              country: 'India'
            },
            industries: ['food', 'retail'],
            media: {
              featuredImage: {
                url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
              }
            },
            franchiseDetails: {
              franchiseBrand: 'Brew Haven',
              franchiseType: 'Coffee Shop',
              franchiseSince: 2015,
              investment: {
                franchiseFee: {
                  value: 1500000,
                  currency: 'INR',
                  formatted: '₹15,00,000'
                },
                totalInitialInvestment: {
                  value: 5000000,
                  currency: 'INR',
                  formatted: '₹50,00,000'
                }
              }
            },
            analytics: {
              viewCount: 875,
              contactCount: 19
            }
          },
          
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
            industries: ['education', 'it'],
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
              viewCount: 542,
              contactCount: 12
            }
          },
          
          // Investor example
          {
            id: 'investor-101',
            name: 'Angel Investor for Tech Startups',
            type: LISTING_TYPES.INVESTOR,
            status: LISTING_STATUS.PUBLISHED,
            isFeatured: true,
            featuredUntil: new Date('2025-05-25'),
            ownerName: 'Priya Patel',
            ownerId: 'user-101',
            createdAt: '2024-02-10T16:45:00Z',
            updatedAt: '2024-02-25T09:30:00Z',
            publishedAt: '2024-02-15T11:20:00Z',
            expiresAt: '2024-08-15T11:20:00Z',
            rating: {
              average: 9.2,
              count: 6,
              systemRating: 9.0
            },
            location: {
              city: 'Hyderabad',
              state: 'Telangana',
              country: 'India'
            },
            industries: ['it', 'education', 'professional'],
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
                },
                leadInvestorStatus: true
              },
              focus: {
                primaryIndustries: ['Technology', 'FinTech', 'EdTech']
              }
            },
            analytics: {
              viewCount: 742,
              contactCount: 28
            }
          },
          
          // Digital Asset example
          {
            id: 'digital-202',
            name: 'E-commerce Store with 100k Monthly Visitors',
            type: LISTING_TYPES.DIGITAL_ASSET,
            status: LISTING_STATUS.DRAFT,
            isFeatured: false,
            ownerName: 'Arjun Reddy',
            ownerId: 'user-202',
            createdAt: '2024-03-05T11:20:00Z',
            updatedAt: '2024-03-15T14:10:00Z',
            rating: {
              systemRating: 8.4
            },
            location: {
              city: 'Remote',
              state: 'Not Applicable',
              country: 'India'
            },
            industries: ['ecommerce', 'retail'],
            media: {
              featuredImage: {
                url: 'https://images.unsplash.com/photo-1561715276-a2d087060f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
              }
            },
            digitalAssetDetails: {
              assetType: 'E-commerce Store',
              platformFramework: 'Shopify',
              creationDate: '2021-06-15',
              traffic: {
                monthlyVisitors: 100000,
                monthlyPageviews: 350000
              },
              sale: {
                askingPrice: {
                  value: 3500000,
                  currency: 'INR',
                  formatted: '₹35,00,000'
                }
              },
              financials: {
                monthlyRevenue: {
                  value: 450000,
                  currency: 'INR',
                  formatted: '₹4,50,000'
                }
              }
            },
            analytics: {
              viewCount: 319,
              contactCount: 8
            }
          },
          
          // Another business example (rejected)
          {
            id: 'business-303',
            name: 'Manufacturing Business for Sale',
            type: LISTING_TYPES.BUSINESS,
            status: LISTING_STATUS.REJECTED,
            isFeatured: false,
            ownerName: 'Sanjay Gupta',
            ownerId: 'user-303',
            createdAt: '2024-01-15T08:40:00Z',
            updatedAt: '2024-01-28T15:20:00Z',
            rating: {
              systemRating: 6.2
            },
            location: {
              city: 'Ahmedabad',
              state: 'Gujarat',
              country: 'India'
            },
            industries: ['manufacturing'],
            media: {
              featuredImage: {
                url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
              }
            },
            businessDetails: {
              businessType: 'Manufacturing',
              establishedYear: 2008,
              sale: {
                askingPrice: {
                  value: 40000000,
                  currency: 'INR',
                  formatted: '₹4,00,00,000'
                }
              }
            },
            analytics: {
              viewCount: 0,
              contactCount: 0
            }
          },
          
          // Another franchise example (archived)
          {
            id: 'franchise-404',
            name: 'Fast Food Chain Opportunity',
            type: LISTING_TYPES.FRANCHISE,
            status: LISTING_STATUS.ARCHIVED,
            isFeatured: false,
            ownerName: 'Rahul Verma',
            ownerId: 'user-404',
            createdAt: '2023-12-10T10:30:00Z',
            updatedAt: '2024-02-05T16:45:00Z',
            publishedAt: '2023-12-15T09:20:00Z',
            expiresAt: '2024-02-01T09:20:00Z',
            rating: {
              average: 6.5,
              count: 3,
              systemRating: 7.0
            },
            location: {
              city: 'Pune',
              state: 'Maharashtra',
              country: 'India'
            },
            industries: ['food'],
            media: {
              featuredImage: {
                url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
              }
            },
            franchiseDetails: {
              franchiseBrand: 'QuickBite',
              franchiseType: 'Fast Food',
              franchiseSince: 2010,
              investment: {
                franchiseFee: {
                  value: 2000000,
                  currency: 'INR',
                  formatted: '₹20,00,000'
                }
              }
            },
            analytics: {
              viewCount: 425,
              contactCount: 5
            }
          }
        ];
        
        // Apply filters if needed (in a real app, this would be done server-side)
        let filteredListings = [...mockListings];
        
        // Basic filters
        if (listingType) {
          filteredListings = filteredListings.filter(listing => listing.type === listingType);
        }
        
        if (statusFilter) {
          filteredListings = filteredListings.filter(listing => listing.status === statusFilter);
        }
        
        if (featuredFilter === 'featured') {
          filteredListings = filteredListings.filter(listing => listing.isFeatured);
        } else if (featuredFilter === 'not_featured') {
          filteredListings = filteredListings.filter(listing => !listing.isFeatured);
        }
        
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredListings = filteredListings.filter(listing => 
            listing.name.toLowerCase().includes(query) || 
            listing.ownerName.toLowerCase().includes(query) ||
            listing.id.toLowerCase().includes(query)
          );
        }
        
        // Advanced filters
        if (minPrice) {
          filteredListings = filteredListings.filter(listing => {
            let price = 0;
            if (listing.type === LISTING_TYPES.BUSINESS && listing.businessDetails?.sale?.askingPrice?.value) {
              price = listing.businessDetails.sale.askingPrice.value;
            } else if (listing.type === LISTING_TYPES.FRANCHISE && listing.franchiseDetails?.investment?.totalInitialInvestment?.value) {
              price = listing.franchiseDetails.investment.totalInitialInvestment.value;
            } else if (listing.type === LISTING_TYPES.STARTUP && listing.startupDetails?.funding?.currentRaisingAmount?.value) {
              price = listing.startupDetails.funding.currentRaisingAmount.value;
            } else if (listing.type === LISTING_TYPES.DIGITAL_ASSET && listing.digitalAssetDetails?.sale?.askingPrice?.value) {
              price = listing.digitalAssetDetails.sale.askingPrice.value;
            }
            return price >= parseInt(minPrice, 10);
          });
        }
        
        if (maxPrice) {
          filteredListings = filteredListings.filter(listing => {
            let price = 0;
            if (listing.type === LISTING_TYPES.BUSINESS && listing.businessDetails?.sale?.askingPrice?.value) {
              price = listing.businessDetails.sale.askingPrice.value;
            } else if (listing.type === LISTING_TYPES.FRANCHISE && listing.franchiseDetails?.investment?.totalInitialInvestment?.value) {
              price = listing.franchiseDetails.investment.totalInitialInvestment.value;
            } else if (listing.type === LISTING_TYPES.STARTUP && listing.startupDetails?.funding?.currentRaisingAmount?.value) {
              price = listing.startupDetails.funding.currentRaisingAmount.value;
            } else if (listing.type === LISTING_TYPES.DIGITAL_ASSET && listing.digitalAssetDetails?.sale?.askingPrice?.value) {
              price = listing.digitalAssetDetails.sale.askingPrice.value;
            }
            return price <= parseInt(maxPrice, 10);
          });
        }
        
        if (locationFilter) {
          filteredListings = filteredListings.filter(listing => 
            listing.location?.city?.toLowerCase().includes(locationFilter.toLowerCase())
          );
        }
        
        if (industryFilter) {
          filteredListings = filteredListings.filter(listing => 
            listing.industries?.includes(industryFilter)
          );
        }
        
        if (dateRangeStart) {
          const startDate = new Date(dateRangeStart);
          filteredListings = filteredListings.filter(listing => 
            new Date(listing.createdAt) >= startDate
          );
        }
        
        if (dateRangeEnd) {
          const endDate = new Date(dateRangeEnd);
          endDate.setHours(23, 59, 59, 999); // End of day
          filteredListings = filteredListings.filter(listing => 
            new Date(listing.createdAt) <= endDate
          );
        }
        
        if (ownerFilter) {
          filteredListings = filteredListings.filter(listing => 
            listing.ownerName.toLowerCase().includes(ownerFilter.toLowerCase()) ||
            listing.ownerId.toLowerCase().includes(ownerFilter.toLowerCase())
          );
        }
        
        if (ratingFilter) {
          const rating = parseFloat(ratingFilter);
          filteredListings = filteredListings.filter(listing => 
            (listing.rating?.systemRating || 0) >= rating
          );
        }
        
        // Type-specific filters
        if (businessTypeFilter && listingType === LISTING_TYPES.BUSINESS) {
          filteredListings = filteredListings.filter(listing => 
            listing.businessDetails?.businessType?.toLowerCase() === businessTypeFilter.toLowerCase()
          );
        }
        
        if (franchiseTypeFilter && listingType === LISTING_TYPES.FRANCHISE) {
          filteredListings = filteredListings.filter(listing => 
            listing.franchiseDetails?.franchiseType?.toLowerCase() === franchiseTypeFilter.toLowerCase()
          );
        }
        
        if (startupStageFilter && listingType === LISTING_TYPES.STARTUP) {
          filteredListings = filteredListings.filter(listing => 
            listing.startupDetails?.developmentStage?.toLowerCase() === startupStageFilter.toLowerCase()
          );
        }
        
        if (investorTypeFilter && listingType === LISTING_TYPES.INVESTOR) {
          filteredListings = filteredListings.filter(listing => 
            listing.investorDetails?.investorType?.toLowerCase() === investorTypeFilter.toLowerCase()
          );
        }
        
        if (digitalAssetTypeFilter && listingType === LISTING_TYPES.DIGITAL_ASSET) {
          filteredListings = filteredListings.filter(listing => 
            listing.digitalAssetDetails?.assetType?.toLowerCase() === digitalAssetTypeFilter.toLowerCase()
          );
        }
        
        // Apply sorting (in a real app, this would be done server-side)
        filteredListings.sort((a, b) => {
          // Handle nested fields like businessDetails.sale.askingPrice.value
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
        
        // Pagination (in a real app, this would be handled by the server)
        const startIndex = (page - 1) * pageSize;
        const paginatedListings = filteredListings.slice(startIndex, startIndex + pageSize);
        
        // Set states
        setListings(paginatedListings);
        setTotalCount(filteredListings.length);
        
        // Reset selected listings when filter changes
        setSelectedListings([]);
        setSelectAll(false);
      } catch (error) {
        console.error('Error fetching listings:', error);
        toast.error('Failed to fetch listings');
        setListings([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [
    page, 
    pageSize, 
    sortField, 
    sortDirection, 
    searchQuery, 
    listingType, 
    statusFilter, 
    featuredFilter,
    minPrice,
    maxPrice,
    locationFilter,
    industryFilter,
    dateRangeStart,
    dateRangeEnd,
    ownerFilter,
    ratingFilter,
    businessTypeFilter,
    franchiseTypeFilter,
    startupStageFilter,
    investorTypeFilter,
    digitalAssetTypeFilter
  ]);

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Get sort indicator
  const getSortIndicator = (field) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' ? (
      <ArrowUp size={14} className="ml-1" />
    ) : (
      <ArrowDown size={14} className="ml-1" />
    );
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // Search is triggered by useEffect dependency
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSortField('createdAt');
    setSortDirection('desc');
    setSearchQuery('');
    setListingType('');
    setStatusFilter('');
    setFeaturedFilter('');
    setMinPrice('');
    setMaxPrice('');
    setLocationFilter('');
    setIndustryFilter('');
    setDateRangeStart('');
    setDateRangeEnd('');
    setOwnerFilter('');
    setRatingFilter('');
    setBusinessTypeFilter('');
    setFranchiseTypeFilter('');
    setStartupStageFilter('');
    setInvestorTypeFilter('');
    setDigitalAssetTypeFilter('');
    setShowAdvancedFilters(false);
    
    // Reset page
    setPage(1);
  };

  // Handle listing deletion
  const handleDeleteClick = (listing) => {
    setListingToDelete(listing);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!listingToDelete) return;
    
    try {
      setLoading(true);
      // In a real app, this would be an API call
      // await deleteListing(listingToDelete.id);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setListings(listings.filter(listing => listing.id !== listingToDelete.id));
      toast.success('Listing deleted successfully');
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast.error('Failed to delete listing');
    } finally {
      setLoading(false);
      setShowDeleteDialog(false);
      setListingToDelete(null);
    }
  };

  // Handle status change
  const handleStatusChange = (listing) => {
    setListingToChangeStatus(listing);
    setShowStatusDialog(true);
  };

  const confirmStatusChange = async () => {
    if (!listingToChangeStatus) return;
    
    try {
      setLoading(true);
      const newStatus = listingToChangeStatus.status === LISTING_STATUS.PUBLISHED 
        ? LISTING_STATUS.DRAFT 
        : LISTING_STATUS.PUBLISHED;
      
      // In a real app, this would be an API call
      // await updateListingStatus(listingToChangeStatus.id, newStatus);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setListings(
        listings.map(listing => 
          listing.id === listingToChangeStatus.id 
            ? { ...listing, status: newStatus } 
            : listing
        )
      );
      
      toast.success(`Listing ${newStatus === LISTING_STATUS.PUBLISHED ? 'published' : 'unpublished'} successfully`);
    } catch (error) {
      console.error('Error changing listing status:', error);
      toast.error('Failed to update listing status');
    } finally {
      setLoading(false);
      setShowStatusDialog(false);
      setListingToChangeStatus(null);
    }
  };

  // Handle featured toggle
  const handleFeaturedToggle = (listing) => {
    setListingToToggleFeatured(listing);
    setShowFeaturedDialog(true);
  };

  const confirmFeaturedToggle = async () => {
    if (!listingToToggleFeatured) return;
    
    try {
      setLoading(true);
      const featured = !listingToToggleFeatured.isFeatured;
      
      // In a real app, this would be an API call
      // await toggleListingFeatured(listingToToggleFeatured.id, featured);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setListings(
        listings.map(listing => 
          listing.id === listingToToggleFeatured.id 
            ? { 
                ...listing, 
                isFeatured: featured,
                featuredUntil: featured ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null 
              } 
            : listing
        )
      );
      
      toast.success(`Listing ${featured ? 'marked as featured' : 'removed from featured listings'}`);
    } catch (error) {
      console.error('Error toggling featured status:', error);
      toast.error('Failed to update featured status');
    } finally {
      setLoading(false);
      setShowFeaturedDialog(false);
      setListingToToggleFeatured(null);
    }
  };

  // Export listings
  const handleExportListings = () => {
    toast.success('Exporting listings...');
    // In a real app, this would trigger an API call to generate a CSV/Excel file
  };
  
  // Handle bulk selection
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedListings([]);
    } else {
      setSelectedListings(listings.map(listing => listing.id));
    }
    setSelectAll(!selectAll);
  };
  
  const handleSelectListing = (listingId) => {
    setSelectedListings(prevSelected => {
      if (prevSelected.includes(listingId)) {
        return prevSelected.filter(id => id !== listingId);
      } else {
        return [...prevSelected, listingId];
      }
    });
  };
  
  // Bulk actions
  const handleBulkDelete = () => {
    if (selectedListings.length === 0) {
      toast.error('No listings selected');
      return;
    }
    
    setShowBulkDeleteDialog(true);
  };
  
  const confirmBulkDelete = async () => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      // await bulkDeleteListings(selectedListings);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update local state
      setListings(listings.filter(listing => !selectedListings.includes(listing.id)));
      toast.success(`${selectedListings.length} listings deleted successfully`);
      
      // Reset selection
      setSelectedListings([]);
      setSelectAll(false);
    } catch (error) {
      console.error('Error bulk deleting listings:', error);
      toast.error('Failed to delete selected listings');
    } finally {
      setLoading(false);
      setShowBulkDeleteDialog(false);
    }
  };
  
  const handleBulkStatus = (action) => {
    if (selectedListings.length === 0) {
      toast.error('No listings selected');
      return;
    }
    
    setBulkStatusAction(action);
    setShowBulkStatusDialog(true);
  };
  
  const confirmBulkStatus = async () => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      // await bulkUpdateListingStatus(selectedListings, bulkStatusAction);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update local state
      setListings(listings.map(listing => {
        if (selectedListings.includes(listing.id)) {
          return { ...listing, status: bulkStatusAction };
        }
        return listing;
      }));
      
      const actionText = bulkStatusAction === LISTING_STATUS.PUBLISHED ? 'published' : 
                         bulkStatusAction === LISTING_STATUS.DRAFT ? 'set to draft' :
                         bulkStatusAction === LISTING_STATUS.PENDING ? 'sent for review' :
                         bulkStatusAction === LISTING_STATUS.REJECTED ? 'rejected' : 'archived';
      
      toast.success(`${selectedListings.length} listings ${actionText} successfully`);
      
      // Reset selection
      setSelectedListings([]);
      setSelectAll(false);
    } catch (error) {
      console.error('Error bulk updating listing status:', error);
      toast.error('Failed to update selected listings');
    } finally {
      setLoading(false);
      setShowBulkStatusDialog(false);
      setBulkStatusAction('');
    }
  };
  
  const handleBulkFeatured = (action) => {
    if (selectedListings.length === 0) {
      toast.error('No listings selected');
      return;
    }
    
    setBulkFeaturedAction(action);
    setShowBulkFeaturedDialog(true);
  };
  
  const confirmBulkFeatured = async () => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      // await bulkToggleListingFeatured(selectedListings, bulkFeaturedAction === 'feature');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update local state
      setListings(listings.map(listing => {
        if (selectedListings.includes(listing.id)) {
          return { 
            ...listing, 
            isFeatured: bulkFeaturedAction === 'feature',
            featuredUntil: bulkFeaturedAction === 'feature' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null
          };
        }
        return listing;
      }));
      
      toast.success(`${selectedListings.length} listings ${bulkFeaturedAction === 'feature' ? 'featured' : 'unfeatured'} successfully`);
      
      // Reset selection
      setSelectedListings([]);
      setSelectAll(false);
    } catch (error) {
      console.error('Error bulk toggling featured status:', error);
      toast.error('Failed to update selected listings');
    } finally {
      setLoading(false);
      setShowBulkFeaturedDialog(false);
      setBulkFeaturedAction('');
    }
  };
  
  const handleBulkExport = () => {
    if (selectedListings.length === 0) {
      toast.error('No listings selected');
      return;
    }
    
    toast.success(`Exporting ${selectedListings.length} listings...`);
    // In a real app, this would trigger an API call to generate a CSV/Excel file
  };
  
  // Pagination handlers
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  
  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value, 10));
    setPage(1); // Reset to first page
  };
  
  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div>
      <PageHeader
        title="Listings"
        description="View and manage all listings on the Business Options Platform."
        actions={[
          {
            label: 'Add Listing',
            onClick: () => navigate('/listings/create'),
            variant: 'primary',
            icon: <ListPlus size={16} />
          },
          {
            label: 'Export All',
            onClick: handleExportListings,
            variant: 'default',
            icon: <Download size={16} />
          }
        ]}
      />

      {/* Stats dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-card border-t-4 border-brand-blue">
          <div className="flex items-center">
            <div className="mr-3 p-2 bg-light-blue rounded-md text-brand-blue">
              <ListPlus size={20} />
            </div>
            <div>
              <p className="text-gray text-sm">Total Listings</p>
              <p className="text-h3 font-semibold text-dark-gray mt-1">
                {totalCount}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-card border-t-4 border-success">
          <div className="flex items-center">
            <div className="mr-3 p-2 bg-success bg-opacity-10 rounded-md text-success">
              <ListPlus size={20} />
            </div>
            <div>
              <p className="text-gray text-sm">Published</p>
              <p className="text-h3 font-semibold text-dark-gray mt-1">
                {listings.filter(listing => listing.status === LISTING_STATUS.PUBLISHED).length}
                <span className="text-sm text-gray ml-1">
                  of {totalCount}
                </span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-card border-t-4 border-warning">
          <div className="flex items-center">
            <div className="mr-3 p-2 bg-warning bg-opacity-10 rounded-md text-warning">
              <Star size={20} />
            </div>
            <div>
              <p className="text-gray text-sm">Featured</p>
              <p className="text-h3 font-semibold text-dark-gray mt-1">
                {listings.filter(listing => listing.isFeatured).length}
                <span className="text-sm text-gray ml-1">
                  of {totalCount}
                </span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-card border-t-4 border-error">
          <div className="flex items-center">
            <div className="mr-3 p-2 bg-error bg-opacity-10 rounded-md text-error">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-gray text-sm">Pending Approval</p>
              <p className="text-h3 font-semibold text-dark-gray mt-1">
                {listings.filter(listing => listing.status === LISTING_STATUS.PENDING).length}
                <span className="text-sm text-gray ml-1">
                  of {totalCount}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and search */}
      <div className="bg-white p-4 rounded-lg shadow-card mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <form onSubmit={handleSearch} className="flex">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                  placeholder="Search by listing name, ID, or owner..."
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
          <div className="flex items-center gap-2 flex-wrap">
            {/* Listing Type Filter */}
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
            
            {/* Status Filter */}
            <select
              className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value={LISTING_STATUS.DRAFT}>Draft</option>
              <option value={LISTING_STATUS.PENDING}>Pending Approval</option>
              <option value={LISTING_STATUS.PUBLISHED}>Published</option>
              <option value={LISTING_STATUS.REJECTED}>Rejected</option>
              <option value={LISTING_STATUS.ARCHIVED}>Archived</option>
            </select>
            
            {/* Featured Filter */}
            <select
              className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
              value={featuredFilter}
              onChange={(e) => setFeaturedFilter(e.target.value)}
            >
              <option value="">All Listings</option>
              <option value="featured">Featured Only</option>
              <option value="not_featured">Not Featured</option>
            </select>
            
            {/* Advanced Filters Button */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`inline-flex items-center px-3 py-2 border ${
                showAdvancedFilters 
                  ? 'border-brand-blue text-brand-blue bg-light-blue'
                  : 'border-gray-300 text-gray bg-white hover:bg-gray-50'
              } rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue`}
            >
              <SlidersHorizontal size={16} className="mr-2" />
              Advanced Filters
              {showAdvancedFilters ? <ChevronDown size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
            </button>
            
            {/* Reset Filters Button */}
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
              title="Reset filters"
            >
              <RefreshCcw size={16} />
            </button>
          </div>
        </div>
        
        {/* Advanced filters section */}
        {showAdvancedFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray mb-1">Price Range</label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign size={16} className="text-gray" />
                    </div>
                    <input
                      type="number"
                      placeholder="Min"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign size={16} className="text-gray" />
                    </div>
                    <input
                      type="number"
                      placeholder="Max"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray mb-1">Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={16} className="text-gray" />
                  </div>
                  <select
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  >
                    <option value="">All Locations</option>
                    {locationOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Industry */}
              <div>
                <label className="block text-sm font-medium text-gray mb-1">Industry</label>
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                >
                  <option value="">All Industries</option>
                  {industryOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray mb-1">Date Range</label>
                <div className="flex space-x-2">
                  <input
                    type="date"
                    className="block flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                    value={dateRangeStart}
                    onChange={(e) => setDateRangeStart(e.target.value)}
                  />
                  <input
                    type="date"
                    className="block flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                    value={dateRangeEnd}
                    onChange={(e) => setDateRangeEnd(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Owner Filter */}
              <div>
                <label className="block text-sm font-medium text-gray mb-1">Owner</label>
                <input
                  type="text"
                  placeholder="Search by owner name or ID"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                  value={ownerFilter}
                  onChange={(e) => setOwnerFilter(e.target.value)}
                />
              </div>
              
              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray mb-1">Minimum Rating</label>
                <select
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                >
                  <option value="">Any Rating</option>
                  <option value="9">9+ (Excellent)</option>
                  <option value="8">8+ (Very Good)</option>
                  <option value="7">7+ (Good)</option>
                  <option value="6">6+ (Above Average)</option>
                  <option value="5">5+ (Average)</option>
                  <option value="0">All Ratings</option>
                </select>
              </div>
              
              {/* Type-specific filters based on selected listing type */}
              {listingType === LISTING_TYPES.BUSINESS && (
                <div>
                  <label className="block text-sm font-medium text-gray mb-1">Business Type</label>
                  <select
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                    value={businessTypeFilter}
                    onChange={(e) => setBusinessTypeFilter(e.target.value)}
                  >
                    <option value="">All Business Types</option>
                    {businessTypeOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              )}
              
              {listingType === LISTING_TYPES.FRANCHISE && (
                <div>
                  <label className="block text-sm font-medium text-gray mb-1">Franchise Type</label>
                  <select
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                    value={franchiseTypeFilter}
                    onChange={(e) => setFranchiseTypeFilter(e.target.value)}
                  >
                    <option value="">All Franchise Types</option>
                    {franchiseTypeOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              )}
              
              {listingType === LISTING_TYPES.STARTUP && (
                <div>
                  <label className="block text-sm font-medium text-gray mb-1">Startup Stage</label>
                  <select
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                    value={startupStageFilter}
                    onChange={(e) => setStartupStageFilter(e.target.value)}
                  >
                    <option value="">All Stages</option>
                    {startupStageOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              )}
              
              {listingType === LISTING_TYPES.INVESTOR && (
                <div>
                  <label className="block text-sm font-medium text-gray mb-1">Investor Type</label>
                  <select
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                    value={investorTypeFilter}
                    onChange={(e) => setInvestorTypeFilter(e.target.value)}
                  >
                    <option value="">All Investor Types</option>
                    {investorTypeOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              )}
              
              {listingType === LISTING_TYPES.DIGITAL_ASSET && (
                <div>
                  <label className="block text-sm font-medium text-gray mb-1">Digital Asset Type</label>
                  <select
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
                    value={digitalAssetTypeFilter}
                    onChange={(e) => setDigitalAssetTypeFilter(e.target.value)}
                  >
                    <option value="">All Digital Asset Types</option>
                    {digitalAssetTypeOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bulk actions */}
      {selectedListings.length > 0 && (
        <div className="bg-light-blue bg-opacity-70 p-4 rounded-lg mb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center">
            <CheckSquare size={20} className="text-brand-blue mr-2" />
            <span className="text-dark-gray font-medium">
              {selectedListings.length} {selectedListings.length === 1 ? 'listing' : 'listings'} selected
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Bulk Delete */}
            <button
              onClick={handleBulkDelete}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-error bg-white hover:bg-error hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-error"
            >
              Delete
            </button>
            
            {/* Bulk Status Change */}
            <div className="relative inline-block text-left">
              <button
                onClick={() => setShowBulkActionMenu(!showBulkActionMenu)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
              >
                Change Status <ChevronDown size={16} className="ml-2" />
              </button>
              
              {showBulkActionMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button
                      onClick={() => {
                        handleBulkStatus(LISTING_STATUS.PUBLISHED);
                        setShowBulkActionMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray hover:bg-gray-100"
                      role="menuitem"
                    >
                      Publish
                    </button>
                    <button
                      onClick={() => {
                        handleBulkStatus(LISTING_STATUS.DRAFT);
                        setShowBulkActionMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray hover:bg-gray-100"
                      role="menuitem"
                    >
                      Set to Draft
                    </button>
                    <button
                      onClick={() => {
                        handleBulkStatus(LISTING_STATUS.PENDING);
                        setShowBulkActionMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray hover:bg-gray-100"
                      role="menuitem"
                    >
                      Send for Review
                    </button>
                    <button
                      onClick={() => {
                        handleBulkStatus(LISTING_STATUS.ARCHIVED);
                        setShowBulkActionMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray hover:bg-gray-100"
                      role="menuitem"
                    >
                      Archive
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Bulk Feature */}
            <button
              onClick={() => handleBulkFeatured('feature')}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-warning bg-white hover:bg-warning hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-warning"
            >
              <Star size={16} className="mr-2" />
              Feature
            </button>
            
            {/* Bulk Export */}
            <button
              onClick={handleBulkExport}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
            >
              <Download size={16} className="mr-2" />
              Export
            </button>
            
            {/* Clear Selection */}
            <button
              onClick={() => {
                setSelectedListings([]);
                setSelectAll(false);
              }}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
            >
              <X size={16} className="mr-2" />
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Results summary */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray">
          Showing <span className="font-medium text-dark-gray">{listings.length}</span> of <span className="font-medium text-dark-gray">{totalCount}</span> listings
          {listingType && ` of type "${listingType}"`}
          {statusFilter && ` with status "${statusFilter}"`}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      </div>

      {/* Listing list table */}
      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="large" text="Loading listings..." />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 data-table">
              <thead className="bg-gray-50">
                <tr>
                  {/* Bulk select checkbox */}
                  <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-brand-blue rounded border-gray-300 focus:ring-brand-blue"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </div>
                  </th>
                  
                  {/* Listing column */}
                  <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center group focus:outline-none"
                      onClick={() => handleSort('name')}
                    >
                      Listing
                      {getSortIndicator('name')}
                    </button>
                  </th>
                  
                  {/* Type column */}
                  <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center group focus:outline-none"
                      onClick={() => handleSort('type')}
                    >
                      Type
                      {getSortIndicator('type')}
                    </button>
                  </th>
                  
                  {/* Owner column */}
                  <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center group focus:outline-none"
                      onClick={() => handleSort('ownerName')}
                    >
                      Owner
                      {getSortIndicator('ownerName')}
                    </button>
                  </th>
                  
                  {/* Status column */}
                  <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center group focus:outline-none"
                      onClick={() => handleSort('status')}
                    >
                      Status
                      {getSortIndicator('status')}
                    </button>
                  </th>
                  
                  {/* Rating column */}
                  <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center group focus:outline-none"
                      onClick={() => handleSort('rating.systemRating')}
                    >
                      Rating
                      {getSortIndicator('rating.systemRating')}
                    </button>
                  </th>
                  
                  {/* Created date column */}
                  <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center group focus:outline-none"
                      onClick={() => handleSort('createdAt')}
                    >
                      Created
                      {getSortIndicator('createdAt')}
                    </button>
                  </th>
                  
                  {/* Analytics column */}
                  <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      className="flex items-center group focus:outline-none"
                      onClick={() => handleSort('analytics.viewCount')}
                    >
                      Views
                      {getSortIndicator('analytics.viewCount')}
                    </button>
                  </th>
                  
                  {/* Actions column */}
                  <th scope="col" className="px-3 py-3.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {listings.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-3 py-8 text-center text-gray-500">
                      No listings found matching the current filters.
                    </td>
                  </tr>
                ) : (
                  listings.map((listing) => (
                    <tr key={listing.id} className="hover:bg-gray-50">
                      {/* Selection checkbox */}
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-brand-blue rounded border-gray-300 focus:ring-brand-blue"
                            checked={selectedListings.includes(listing.id)}
                            onChange={() => handleSelectListing(listing.id)}
                          />
                        </div>
                      </td>
                      
                      {/* Listing details */}
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {/* Listing image */}
                          <div className="flex-shrink-0 h-10 w-10 relative">
                            {listing.media?.featuredImage?.url ? (
                              <img
                                className="h-10 w-10 rounded-md object-cover"
                                src={listing.media.featuredImage.url}
                                alt={listing.name}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center text-gray-500">
                                <ListPlus size={20} />
                              </div>
                            )}
                            {listing.isFeatured && (
                              <div className="absolute top-0 right-0 w-4 h-4 bg-warning flex items-center justify-center rounded-full">
                                <Star size={8} className="text-white" />
                              </div>
                            )}
                          </div>
                          
                          {/* Listing name and info */}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {listing.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              ID: {listing.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      {/* Type */}
                      <td className="px-3 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-blue-100 text-blue-800">
                          {listing.type === LISTING_TYPES.BUSINESS && 'Business'}
                          {listing.type === LISTING_TYPES.FRANCHISE && 'Franchise'}
                          {listing.type === LISTING_TYPES.STARTUP && 'Startup'}
                          {listing.type === LISTING_TYPES.INVESTOR && 'Investor'}
                          {listing.type === LISTING_TYPES.DIGITAL_ASSET && 'Digital Asset'}
                        </span>
                      </td>
                      
                      {/* Owner */}
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm text-gray-900">{listing.ownerName}</div>
                        </div>
                      </td>
                      
                      {/* Status */}
                      <td className="px-3 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-medium rounded-full ${
                          listing.status === LISTING_STATUS.PUBLISHED
                            ? 'bg-green-100 text-green-800'
                            : listing.status === LISTING_STATUS.DRAFT
                            ? 'bg-gray-100 text-gray-800'
                            : listing.status === LISTING_STATUS.PENDING
                            ? 'bg-yellow-100 text-yellow-800'
                            : listing.status === LISTING_STATUS.REJECTED
                            ? 'bg-red-100 text-red-800'
                            : 'bg-purple-100 text-purple-800' // Archived
                        }`}>
                          {listing.status}
                        </span>
                      </td>
                      
                      {/* Rating */}
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {listing.rating?.systemRating?.toFixed(1) || '-'}/10
                        </div>
                      </td>
                      
                      {/* Created Date */}
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(listing.createdAt, 'dd MMM yyyy')}
                      </td>
                      
                      {/* Views */}
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {listing.analytics?.viewCount?.toLocaleString() || 0}
                      </td>
                      
                      {/* Actions */}
                      <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          {/* View */}
                          <button
                            onClick={() => navigate(`/listings/${listing.id}`)}
                            className="text-brand-blue hover:text-brand-blue-dark"
                            title="View details"
                          >
                            <Eye size={18} />
                          </button>
                          
                          {/* Edit */}
                          <button
                            onClick={() => navigate(`/listings/${listing.id}/edit`)}
                            className="text-gray-600 hover:text-brand-blue"
                            title="Edit listing"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          
                          {/* Feature toggle */}
                          <button
                            onClick={() => handleFeaturedToggle(listing)}
                            className={`${listing.isFeatured ? 'text-warning' : 'text-gray-600'} hover:text-warning`}
                            title={listing.isFeatured ? 'Remove featured status' : 'Mark as featured'}
                          >
                            <Star size={18} />
                          </button>
                          
                          {/* Status toggle */}
                          {(listing.status === LISTING_STATUS.PUBLISHED || listing.status === LISTING_STATUS.DRAFT) && (
                            <button
                              onClick={() => handleStatusChange(listing)}
                              className={`${listing.status === LISTING_STATUS.PUBLISHED ? 'text-success' : 'text-gray-600'} hover:text-success`}
                              title={listing.status === LISTING_STATUS.PUBLISHED ? 'Unpublish' : 'Publish'}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                          )}
                          
                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteClick(listing)}
                            className="text-gray-600 hover:text-error"
                            title="Delete listing"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {listings.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-700">
              Showing <span className="font-medium">{(page - 1) * pageSize + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(page * pageSize, totalCount)}
              </span> of{' '}
              <span className="font-medium">{totalCount}</span> listings
            </span>
            
            <select
              className="ml-4 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-brand-blue focus:border-brand-blue"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
          </div>
          
          <div className="inline-flex space-x-2">
            <button
              onClick={() => handlePageChange(1)}
              disabled={page === 1}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                page === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              First
            </button>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                page === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            
            {/* Page numbers */}
            <div className="flex space-x-1">
              {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                
                if (pageNum <= totalPages) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        page === pageNum
                          ? 'bg-brand-blue text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                return null;
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                page === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                page === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Last
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Dialogs */}
      {/* Delete Dialog */}
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

      {/* Bulk Delete Dialog */}
      <ConfirmationDialog
        isOpen={showBulkDeleteDialog}
        onClose={() => setShowBulkDeleteDialog(false)}
        onConfirm={confirmBulkDelete}
        title="Delete Selected Listings"
        message={`Are you sure you want to delete ${selectedListings.length} selected ${selectedListings.length === 1 ? 'listing' : 'listings'}? This action cannot be undone.`}
        confirmText="Delete Listings"
        cancelText="Cancel"
        variant="error"
        destructive={true}
      />

      {/* Status Change Dialog */}
      <ConfirmationDialog
        isOpen={showStatusDialog}
        onClose={() => setShowStatusDialog(false)}
        onConfirm={confirmStatusChange}
        title={listingToChangeStatus?.status === LISTING_STATUS.PUBLISHED ? 'Unpublish Listing' : 'Publish Listing'}
        message={
          listingToChangeStatus?.status === LISTING_STATUS.PUBLISHED
            ? `Are you sure you want to unpublish ${listingToChangeStatus?.name || 'this listing'}? It will no longer be visible to users.`
            : `Are you sure you want to publish ${listingToChangeStatus?.name || 'this listing'}? It will be visible to all users.`
        }
        confirmText={listingToChangeStatus?.status === LISTING_STATUS.PUBLISHED ? 'Unpublish' : 'Publish'}
        cancelText="Cancel"
        variant={listingToChangeStatus?.status === LISTING_STATUS.PUBLISHED ? 'warning' : 'info'}
      />

      {/* Bulk Status Change Dialog */}
      <ConfirmationDialog
        isOpen={showBulkStatusDialog}
        onClose={() => setShowBulkStatusDialog(false)}
        onConfirm={confirmBulkStatus}
        title={`${bulkStatusAction === LISTING_STATUS.PUBLISHED ? 'Publish' : 
                 bulkStatusAction === LISTING_STATUS.DRAFT ? 'Set to Draft' :
                 bulkStatusAction === LISTING_STATUS.PENDING ? 'Send for Review' :
                 bulkStatusAction === LISTING_STATUS.REJECTED ? 'Reject' : 'Archive'} Selected Listings`}
        message={`Are you sure you want to ${
          bulkStatusAction === LISTING_STATUS.PUBLISHED ? 'publish' : 
          bulkStatusAction === LISTING_STATUS.DRAFT ? 'set to draft' :
          bulkStatusAction === LISTING_STATUS.PENDING ? 'send for review' :
          bulkStatusAction === LISTING_STATUS.REJECTED ? 'reject' : 'archive'
        } ${selectedListings.length} selected ${selectedListings.length === 1 ? 'listing' : 'listings'}?`}
        confirmText="Confirm"
        cancelText="Cancel"
        variant="info"
      />

      {/* Featured Toggle Dialog */}
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

      {/* Bulk Featured Dialog */}
      <ConfirmationDialog
        isOpen={showBulkFeaturedDialog}
        onClose={() => setShowBulkFeaturedDialog(false)}
        onConfirm={confirmBulkFeatured}
        title={bulkFeaturedAction === 'feature' ? 'Feature Selected Listings' : 'Remove Featured Status'}
        message={`Are you sure you want to ${bulkFeaturedAction === 'feature' ? 'mark' : 'remove'} ${selectedListings.length} selected ${selectedListings.length === 1 ? 'listing' : 'listings'} as ${bulkFeaturedAction === 'feature' ? 'featured' : 'not featured'}?`}
        confirmText={bulkFeaturedAction === 'feature' ? 'Mark as Featured' : 'Remove Featured'}
        cancelText="Cancel"
        variant="info"
      />
    </div>
  );
};

export default ListingList;