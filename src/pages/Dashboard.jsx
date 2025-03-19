import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Store,
  Zap,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  UserPlus,
  ListPlus,
  Clock,
  MoreHorizontal
} from 'lucide-react';

import PageHeader from '../components/layout/PageHeader';
import MetricCard from '../components/dashboard/MetricCard';
import UserRegistrationChart from '../components/dashboard/UserRegistrationChart';
import ListingCreationChart from '../components/dashboard/ListingCreationChart';
import RevenueChart from '../components/dashboard/RevenueChart';
import UserDistributionChart from '../components/dashboard/UserDistributionChart';
import RecentUsers from '../components/dashboard/RecentUsers';
import RecentListings from '../components/dashboard/RecentListings';
import QuickActions from '../components/dashboard/QuickActions';

// Placeholder data for dashboard
const mockData = {
  metrics: {
    totalUsers: 1254,
    activeListings: 347,
    instaApplySubmissions: 89,
    totalRevenue: 125000
  },
  recentUsers: [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', createdAt: new Date('2023-05-01') },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'advisor', createdAt: new Date('2023-05-02') },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'user', createdAt: new Date('2023-05-03') },
    { id: '4', name: 'Alice Williams', email: 'alice@example.com', role: 'user', createdAt: new Date('2023-05-04') },
    { id: '5', name: 'Mike Brown', email: 'mike@example.com', role: 'advisor', createdAt: new Date('2023-05-05') }
  ],
  recentListings: [
    { id: '1', name: 'Restaurant for Sale', type: 'business', owner: 'John Doe', status: 'published', createdAt: new Date('2023-05-01') },
    { id: '2', name: 'Coffee Shop Franchise', type: 'franchise', owner: 'Jane Smith', status: 'pending', createdAt: new Date('2023-05-02') },
    { id: '3', name: 'Tech Startup', type: 'startup', owner: 'Bob Johnson', status: 'published', createdAt: new Date('2023-05-03') },
    { id: '4', name: 'Angel Investor', type: 'investor', owner: 'Alice Williams', status: 'published', createdAt: new Date('2023-05-04') },
    { id: '5', name: 'E-commerce Website', type: 'digital_asset', owner: 'Mike Brown', status: 'pending', createdAt: new Date('2023-05-05') }
  ],
  pendingTasks: {
    pendingApprovals: 12,
    instaApplyNeedingProcessing: 8,
    userVerifications: 5,
    supportInquiries: 3
  }
};

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('last30Days');
  const [dashboardData, setDashboardData] = useState(mockData);
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // In a real application, this would fetch data from Firestore
      // const data = await getDashboardData(timeRange);
      // setDashboardData(data);
      
      // Using mock data for demonstration
      setTimeout(() => {
        setDashboardData(mockData);
        setLoading(false);
      }, 800);
    };

    fetchData();
  }, [timeRange]);

  // Header actions
  const headerActions = [
    {
      label: 'Add User',
      onClick: () => { /* Navigate to add user */ },
      variant: 'secondary',
      icon: <UserPlus size={16} />
    },
    {
      label: 'Add Listing',
      onClick: () => { /* Navigate to add listing */ },
      variant: 'primary',
      icon: <ListPlus size={16} />
    }
  ];

  // Quick stats for header
  const headerStats = [
    {
      label: 'Total Users',
      value: dashboardData.metrics.totalUsers,
      icon: <Users size={18} />,
      change: { type: 'increase', value: '+12%' }
    },
    {
      label: 'Active Listings',
      value: dashboardData.metrics.activeListings,
      icon: <Store size={18} />,
      change: { type: 'increase', value: '+8%' }
    },
    {
      label: 'Insta Apply Submissions',
      value: dashboardData.metrics.instaApplySubmissions,
      icon: <Zap size={18} />,
      change: { type: 'decrease', value: '-3%' }
    },
    {
      label: 'Total Revenue',
      value: `₹${dashboardData.metrics.totalRevenue.toLocaleString()}`,
      icon: <DollarSign size={18} />,
      change: { type: 'increase', value: '+15%' }
    }
  ];

  // Handler for time range change
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome to the Business Options Platform admin panel."
        actions={headerActions}
        stats={headerStats}
      />

      {/* Time Period Filter */}
      <div className="mb-6 flex items-center justify-between bg-white p-4 rounded-lg shadow-card">
        <h3 className="text-h4 font-medium">Overview</h3>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => handleTimeRangeChange(e.target.value)}
            className="border border-gray-200 rounded-md text-sm p-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          >
            <option value="today">Today</option>
            <option value="last7Days">Last 7 Days</option>
            <option value="last30Days">Last 30 Days</option>
            <option value="lastQuarter">Last Quarter</option>
            <option value="lastYear">Last Year</option>
          </select>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-card">
          <h3 className="text-h4 font-medium mb-4">User Registration Trend</h3>
          <UserRegistrationChart timeRange={timeRange} loading={loading} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-card">
          <h3 className="text-h4 font-medium mb-4">Listing Creation Trend</h3>
          <ListingCreationChart timeRange={timeRange} loading={loading} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-card">
          <h3 className="text-h4 font-medium mb-4">Revenue Trend</h3>
          <RevenueChart timeRange={timeRange} loading={loading} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-card">
          <h3 className="text-h4 font-medium mb-4">User Type Distribution</h3>
          <UserDistributionChart loading={loading} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-h4 font-medium">Latest User Registrations</h3>
            <Link 
              to="/users" 
              className="text-sm text-brand-blue hover:underline"
            >
              View All
            </Link>
          </div>
          <RecentUsers users={dashboardData.recentUsers} loading={loading} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-h4 font-medium">Latest Listing Submissions</h3>
            <Link 
              to="/listings" 
              className="text-sm text-brand-blue hover:underline"
            >
              View All
            </Link>
          </div>
          <RecentListings listings={dashboardData.recentListings} loading={loading} />
        </div>
      </div>

      {/* Quick Tasks */}
      <div className="bg-white p-4 rounded-lg shadow-card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-h4 font-medium">Quick Tasks</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActions 
            loading={loading}
            pendingApprovals={dashboardData.pendingTasks.pendingApprovals}
            instaApplyNeedingProcessing={dashboardData.pendingTasks.instaApplyNeedingProcessing}
            userVerifications={dashboardData.pendingTasks.userVerifications}
            supportInquiries={dashboardData.pendingTasks.supportInquiries}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;