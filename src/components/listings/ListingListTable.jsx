import React from 'react';
import { Link } from 'react-router-dom';
import {
  MoreHorizontal,
  Edit,
  Trash2,
  ListPlus,
  ArrowUp,
  ArrowDown,
  FileText,
  Star,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  User
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { formatDate, formatCurrency, formatListingType } from '../../utils/formatters';
import { LISTING_STATUS } from '../../utils/constants';

const ListingListTable = ({
  listings = [],
  loading = false,
  onSort = () => {},
  sortField = 'createdAt',
  sortDirection = 'desc',
  onDelete = () => {},
  onChangeStatus = () => {},
  onToggleFeatured = () => {},
}) => {
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
            <div className="grid grid-cols-7 gap-4">
              <div className="h-5 bg-gray-200 rounded col-span-2"></div>
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
              <div className="grid grid-cols-7 gap-4 items-center">
                <div className="flex items-center col-span-2">
                  <div className="w-10 h-10 bg-gray-200 rounded mr-3"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-20 col-span-1"></div>
                <div className="h-4 bg-gray-200 rounded w-24 col-span-1"></div>
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

  // No listings
  if (!listings || listings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-card p-6 text-center">
        <FileText size={40} className="mx-auto text-gray-300 mb-3" />
        <h3 className="text-h4 font-medium text-dark-gray mb-2">No Listings Found</h3>
        <p className="text-gray mb-4">There are no listings matching your criteria.</p>
        <Link
          to="/listings/create"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-medium-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
        >
          <ListPlus size={16} className="mr-2" />
          Add New Listing
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
                  onClick={() => handleSortClick('name')}
                >
                  Listing
                  {renderSortIndicator('name')}
                </button>
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                <button
                  className="flex items-center text-xs uppercase font-medium text-gray hover:text-dark-gray"
                  onClick={() => handleSortClick('type')}
                >
                  Type
                  {renderSortIndicator('type')}
                </button>
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                <button
                  className="flex items-center text-xs uppercase font-medium text-gray hover:text-dark-gray"
                  onClick={() => handleSortClick('ownerName')}
                >
                  Owner
                  {renderSortIndicator('ownerName')}
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
                  Created
                  {renderSortIndicator('createdAt')}
                </button>
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                <button
                  className="flex items-center text-xs uppercase font-medium text-gray hover:text-dark-gray"
                  onClick={() => handleSortClick('analytics.viewCount')}
                >
                  Views
                  {renderSortIndicator('analytics.viewCount')}
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
                          <FileText size={20} className="text-brand-blue" />
                        </div>
                      )}
                      
                      {/* Featured indicator */}
                      {listing.isFeatured && (
                        <span className="absolute top-0 right-0 w-4 h-4 bg-warning flex items-center justify-center">
                          <Star size={12} className="text-white" />
                        </span>
                      )}
                    </div>
                    
                    <div className="ml-3">
                      <div className="text-sm font-medium text-dark-gray truncate max-w-xs">
                        {listing.name}
                      </div>
                      <div className="flex items-center text-xs text-gray">
                        {listing.businessDetails?.askingPrice?.value && (
                          <span className="font-medium text-success mr-2">
                            {formatCurrency(listing.businessDetails.askingPrice.value)}
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
                    {formatListingType(listing.type)}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center text-sm text-dark-gray">
                    <User size={14} className="mr-1 text-gray" />
                    <span>
                      {listing.ownerName || 'Unknown User'}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <StatusBadge 
                    status={listing.status} 
                    type="listing" 
                    size="small" 
                  />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray" title={formatDate(listing.createdAt, 'dd MMM yyyy, HH:mm')}>
                    <Clock size={14} className="mr-1" />
                    {formatDate(listing.createdAt, 'dd MMM yyyy')}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray">
                    <Eye size={14} className="mr-1" />
                    {listing.analytics?.viewCount || 0}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link
                      to={`/listings/${listing.id}`}
                      className="p-1 text-gray hover:text-brand-blue rounded-full hover:bg-light-blue transition-colors"
                      title="View Listing"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      to={`/listings/${listing.id}/edit`}
                      className="p-1 text-gray hover:text-warning rounded-full hover:bg-light-blue transition-colors"
                      title="Edit Listing"
                    >
                      <Edit size={18} />
                    </Link>
                    
                    {/* Featured toggle button */}
                    <button
                      onClick={() => onToggleFeatured(listing)}
                      className={`p-1 rounded-full hover:bg-light-blue transition-colors ${
                        listing.isFeatured 
                          ? 'text-warning' 
                          : 'text-gray hover:text-warning'
                      }`}
                      title={listing.isFeatured ? 'Remove Featured Status' : 'Mark as Featured'}
                    >
                      <Star size={18} />
                    </button>
                    
                    {/* Status toggle for pending/published */}
                    {(listing.status === LISTING_STATUS.PENDING || listing.status === LISTING_STATUS.PUBLISHED) && (
                      <button
                        onClick={() => onChangeStatus(listing)}
                        className={`p-1 rounded-full hover:bg-light-blue transition-colors ${
                          listing.status === LISTING_STATUS.PUBLISHED 
                            ? 'text-success hover:text-gray' 
                            : 'text-gray hover:text-success'
                        }`}
                        title={listing.status === LISTING_STATUS.PUBLISHED ? 'Unpublish Listing' : 'Publish Listing'}
                      >
                        {listing.status === LISTING_STATUS.PUBLISHED ? (
                          <XCircle size={18} />
                        ) : (
                          <CheckCircle size={18} />
                        )}
                      </button>
                    )}
                    
                    {/* Delete button */}
                    <button
                      onClick={() => onDelete(listing)}
                      className="p-1 text-gray hover:text-error rounded-full hover:bg-light-blue transition-colors"
                      title="Delete Listing"
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

export default ListingListTable;