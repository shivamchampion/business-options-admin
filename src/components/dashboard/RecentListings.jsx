import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, FileText } from 'lucide-react';
import { formatRelativeTime } from '../../utils/formatters';
import StatusBadge from '../common/StatusBadge';
import { formatListingType } from '../../utils/formatters';

const RecentListings = ({ listings = [], loading = false }) => {
  if (loading) {
    return (
      <div className="animate-pulse">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
            <div className="w-10 h-10 rounded bg-gray-200"></div>
            <div className="ml-3 flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/5 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/5"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-16 mr-3"></div>
            <div className="h-6 bg-gray-200 rounded w-6"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!listings || listings.length === 0) {
    return (
      <div className="py-6 text-center">
        <FileText size={24} className="mx-auto text-gray-300 mb-2" />
        <p className="text-gray">No listings created yet</p>
      </div>
    );
  }

  return (
    <div>
      {listings.map((listing) => (
        <div key={listing.id} className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
          <div className="w-10 h-10 rounded overflow-hidden bg-light-blue flex items-center justify-center">
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
          </div>
          
          <div className="ml-3 flex-1">
            <h4 className="text-sm font-medium text-dark-gray truncate">
              {listing.name}
            </h4>
            <div className="flex items-center">
              <span className="text-xs text-gray mr-2">
                {formatListingType(listing.type)}
              </span>
              <span className="text-xs text-gray">
                by {listing.ownerName || 'Unknown User'}
              </span>
            </div>
          </div>
          
          <StatusBadge 
            status={listing.status} 
            type="listing" 
            size="small" 
          />
          
          <Link 
            to={`/listings/${listing.id}`} 
            className="ml-3 text-gray hover:text-brand-blue"
            title="View listing details"
          >
            <ExternalLink size={16} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecentListings;