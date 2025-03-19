import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, Filter, Search, Sliders } from 'lucide-react';

// Components
import PageHeader from '../../components/layout/PageHeader'
import {Card} from '../../components/ui/card';
import ApplicationCard from '../../components/insta-apply/ApplicationCard';
// import Pagination from '../../components/common/Pagination';
import StatusBadge from '../../components/common/StatusBadge';
import DateRangePicker from '../../components/common/DateRangePicker';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ProcessedApplications = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

  // Fetch processed applications
  const { data, isLoading, error } = useQuery(
    ['processed-applications', page, filter, searchQuery, dateRange],
    () => {
      // This would be replaced with actual API call
      return {
        applications: [
          {
            id: 'app-123',
            businessName: 'Coastal Cafe',
            applicantName: 'John Smith',
            applicantEmail: 'john@coastalcafe.com',
            phone: '+1 (555) 123-4567',
            submittedDate: '2025-02-15T08:30:00Z',
            processedDate: '2025-02-17T14:20:00Z',
            status: 'approved',
            businessType: 'Cafe',
            location: 'Sydney, NSW',
            assignedTo: 'Sarah Johnson'
          },
          {
            id: 'app-124',
            businessName: 'Urban Fitness',
            applicantName: 'Michael Brown',
            applicantEmail: 'michael@urbanfitness.com',
            phone: '+1 (555) 987-6543',
            submittedDate: '2025-02-14T10:15:00Z',
            processedDate: '2025-02-16T09:45:00Z',
            status: 'rejected',
            businessType: 'Fitness Center',
            location: 'Melbourne, VIC',
            assignedTo: 'David Wilson'
          },
          {
            id: 'app-125',
            businessName: 'Tech Solutions Inc.',
            applicantName: 'Jennifer Lee',
            applicantEmail: 'jennifer@techsolutions.com',
            phone: '+1 (555) 234-5678',
            submittedDate: '2025-02-13T16:45:00Z',
            processedDate: '2025-02-15T11:30:00Z',
            status: 'approved',
            businessType: 'IT Services',
            location: 'Brisbane, QLD',
            assignedTo: 'Sarah Johnson'
          },
        ],
        totalCount: 28,
        totalPages: 10
      };
    },
    {
      keepPreviousData: true,
      staleTime: 60000
    }
  );

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-destructive">Error loading applications: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Processed Applications"
        description="View and manage processed Insta Apply applications"
      />

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search by business name, applicant..."
              className="pl-10 pr-4 py-2 w-full border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </form>

        <div className="flex gap-2">
          <button
            onClick={toggleFilters}
            className="flex items-center px-3 py-2 text-sm border rounded-md hover:bg-gray-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            <ChevronDown className="h-4 w-4 ml-2" />
          </button>

          <select
            className="px-3 py-2 text-sm border rounded-md appearance-none bg-white"
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date Range</label>
              <DateRangePicker
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                onChange={setDateRange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Assigned To</label>
              <select className="w-full px-3 py-2 border rounded-md">
                <option value="">All Staff</option>
                <option value="sarah">Sarah Johnson</option>
                <option value="david">David Wilson</option>
                <option value="amanda">Amanda Lee</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Business Type</label>
              <select className="w-full px-3 py-2 border rounded-md">
                <option value="">All Types</option>
                <option value="cafe">Cafe</option>
                <option value="restaurant">Restaurant</option>
                <option value="retail">Retail</option>
                <option value="fitness">Fitness</option>
                <option value="it">IT Services</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <button className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50">
              Reset
            </button>
            <button className="px-3 py-1.5 text-sm bg-brand-blue text-white rounded-md hover:bg-medium-blue">
              Apply Filters
            </button>
          </div>
        </Card>
      )}

      {/* Application List */}
      <div className="grid grid-cols-1 gap-4">
        {data.applications.map((application) => (
          <ApplicationCard 
            key={application.id}
            application={application}
            processed
          />
        ))}
      </div>

      {/* Pagination */}
      {data.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          {/* <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          /> */}
        </div>
      )}
    </div>
  );
};

export default ProcessedApplications;
