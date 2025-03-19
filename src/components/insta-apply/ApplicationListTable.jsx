import React from 'react';
import { Link } from 'react-router-dom';
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Zap,
  ArrowUp,
  ArrowDown,
  FileText,
  Eye,
  User,
  Clock,
  Mail,
  Phone,
  MessageSquare,
  UserCheck,
  UserPlus
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import { formatDate, formatRelativeTime, formatListingType } from '../../utils/formatters';
import { APPLICATION_STATUS } from '../../utils/constants';

const ApplicationListTable = ({
  applications = [],
  loading = false,
  onSort = () => {},
  sortField = 'createdAt',
  sortDirection = 'desc',
  onDelete = () => {},
  onAssign = () => {},
  onConvert = () => {},
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
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
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

  // No applications
  if (!applications || applications.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-card p-6 text-center">
        <Zap size={40} className="mx-auto text-gray-300 mb-3" />
        <h3 className="text-h4 font-medium text-dark-gray mb-2">No Applications Found</h3>
        <p className="text-gray mb-4">There are no Insta Apply applications matching your criteria.</p>
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
                  onClick={() => handleSortClick('applicantName')}
                >
                  Applicant
                  {renderSortIndicator('applicantName')}
                </button>
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                <button
                  className="flex items-center text-xs uppercase font-medium text-gray hover:text-dark-gray"
                  onClick={() => handleSortClick('listingType')}
                >
                  Interested In
                  {renderSortIndicator('listingType')}
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
                  Submitted
                  {renderSortIndicator('createdAt')}
                </button>
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                <button
                  className="flex items-center text-xs uppercase font-medium text-gray hover:text-dark-gray"
                  onClick={() => handleSortClick('assignedTo')}
                >
                  Assigned To
                  {renderSortIndicator('assignedTo')}
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
            {applications.map((application) => (
              <tr key={application.id} className="data-table-row">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 relative rounded-full bg-light-blue flex items-center justify-center text-brand-blue overflow-hidden">
                      <span className="font-semibold">
                        {application.applicantName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="ml-3">
                      <div className="text-sm font-medium text-dark-gray">
                        {application.applicantName}
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-gray">
                        <div className="flex items-center">
                          <Mail size={12} className="mr-1" />
                          {application.email}
                        </div>
                        <div className="flex items-center">
                          <Phone size={12} className="mr-1" />
                          {application.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-dark-gray">
                    {application.listingName || formatListingType(application.listingType) || 'General Inquiry'}
                  </div>
                  {application.listingType && (
                    <div className="text-xs text-gray">
                      {formatListingType(application.listingType)}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <StatusBadge 
                    status={application.status} 
                    type="application" 
                    size="small" 
                  />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray" title={formatDate(application.createdAt, 'dd MMM yyyy, HH:mm')}>
                    <Clock size={14} className="mr-1" />
                    {formatRelativeTime(application.createdAt)}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {application.assignedTo ? (
                    <div className="flex items-center text-sm text-dark-gray">
                      <UserCheck size={14} className="mr-1 text-success" />
                      <span>
                        {application.assignedToName || 'Assigned Staff'}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center text-sm text-gray">
                      <User size={14} className="mr-1" />
                      <span>Unassigned</span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Link
                      to={`/applications/${application.id}`}
                      className="p-1 text-gray hover:text-brand-blue rounded-full hover:bg-light-blue transition-colors"
                      title="View Application"
                    >
                      <Eye size={18} />
                    </Link>
                    
                    {/* Assign button */}
                    <button
                      onClick={() => onAssign(application)}
                      className="p-1 text-gray hover:text-success rounded-full hover:bg-light-blue transition-colors"
                      title="Assign Application"
                    >
                      <UserCheck size={18} />
                    </button>
                    
                    {/* Convert to lead button */}
                    {application.status !== APPLICATION_STATUS.CONVERTED && (
                      <button
                        onClick={() => onConvert(application)}
                        className="p-1 text-gray hover:text-warning rounded-full hover:bg-light-blue transition-colors"
                        title="Convert to Lead"
                      >
                        <UserPlus size={18} />
                      </button>
                    )}
                    
                    {/* Delete button */}
                    <button
                      onClick={() => onDelete(application)}
                      className="p-1 text-gray hover:text-error rounded-full hover:bg-light-blue transition-colors"
                      title="Delete Application"
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

export default ApplicationListTable;