import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Users, Building, DollarSign, BarChart2, Calendar } from 'lucide-react';

// Components
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/ui/Card';

const AnalyticsOverview = () => {
  const [dateRange, setDateRange] = useState('last30');
  
  // Mock analytics data
  const stats = [
    {
      title: 'Total Users',
      value: '2,547',
      change: '+12.5%',
      increasing: true,
      icon: <Users className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Active Listings',
      value: '583',
      change: '+5.2%',
      increasing: true,
      icon: <Building className="h-5 w-5" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Revenue',
      value: '$24,389',
      change: '+8.7%',
      increasing: true,
      icon: <DollarSign className="h-5 w-5" />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '-0.4%',
      increasing: false,
      icon: <BarChart2 className="h-5 w-5" />,
      color: 'bg-amber-100 text-amber-600'
    },
  ];
  
  const topListings = [
    { id: 1, name: 'Premium Cafe in Sydney CBD', views: 1245, inquiries: 28, category: 'Food & Beverage' },
    { id: 2, name: 'Established Online Fashion Retailer', views: 1042, inquiries: 23, category: 'E-commerce' },
    { id: 3, name: 'Digital Marketing Agency - 10 Years', views: 876, inquiries: 19, category: 'Services' },
    { id: 4, name: 'SaaS Platform with 5,000+ Users', views: 758, inquiries: 21, category: 'Technology' },
    { id: 5, name: 'Gym Franchise Opportunity', views: 721, inquiries: 15, category: 'Fitness' },
  ];
  
  const recentActivity = [
    { 
      id: 1, 
      type: 'new_listing', 
      title: 'New listing created', 
      description: 'Premium Restaurant in Melbourne', 
      timestamp: '2 hours ago', 
      user: 'John Smith' 
    },
    { 
      id: 2, 
      type: 'inquiry', 
      title: 'New inquiry received', 
      description: 'For Digital Marketing Agency', 
      timestamp: '5 hours ago', 
      user: 'Sarah Johnson' 
    },
    { 
      id: 3, 
      type: 'user_signup', 
      title: 'New user registered', 
      description: 'Michael Brown', 
      timestamp: '8 hours ago', 
      user: 'System' 
    },
    { 
      id: 4, 
      type: 'payment', 
      title: 'Subscription payment received', 
      description: '$199 - Premium Plan', 
      timestamp: '1 day ago', 
      user: 'Tech Solutions Inc.' 
    },
    { 
      id: 5, 
      type: 'listing_update', 
      title: 'Listing updated', 
      description: 'Coastal Cafe price reduced', 
      timestamp: '1 day ago', 
      user: 'Admin User' 
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Analytics Overview"
        description="Monitor key metrics and performance indicators"
      />
      
      {/* Date Range Selector */}
      <div className="flex justify-end">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${dateRange === 'last7' ? 'bg-brand-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setDateRange('last7')}
          >
            Last 7 Days
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${dateRange === 'last30' ? 'bg-brand-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setDateRange('last30')}
          >
            Last 30 Days
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${dateRange === 'last90' ? 'bg-brand-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setDateRange('last90')}
          >
            Last 90 Days
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
                <div className="flex items-center mt-2">
                  {stat.increasing ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span 
                    className={stat.increasing ? 'text-green-500 text-sm' : 'text-red-500 text-sm'}
                  >
                    {stat.change} from previous period
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">User Growth</h3>
            <div className="text-sm text-gray-500 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Last 30 Days
            </div>
          </div>
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
            <p className="text-gray-500">User Growth Chart Placeholder</p>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Revenue Trends</h3>
            <div className="text-sm text-gray-500 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Last 30 Days
            </div>
          </div>
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
            <p className="text-gray-500">Revenue Chart Placeholder</p>
          </div>
        </Card>
      </div>
      
      {/* Top Listings */}
      <Card className="p-6">
        <h3 className="font-medium mb-4">Top Performing Listings</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Listing</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Inquiries</th>
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Conv. Rate</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topListings.map((listing) => (
                <tr key={listing.id}>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="text-sm font-medium">{listing.name}</div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100">{listing.category}</span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right">
                    <div className="text-sm">{listing.views.toLocaleString()}</div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right">
                    <div className="text-sm">{listing.inquiries}</div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right">
                    <div className="text-sm">{((listing.inquiries / listing.views) * 100).toFixed(2)}%</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="font-medium mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  {activity.type === 'new_listing' && <Building className="h-4 w-4 text-blue-600" />}
                  {activity.type === 'inquiry' && <Users className="h-4 w-4 text-blue-600" />}
                  {activity.type === 'user_signup' && <Users className="h-4 w-4 text-blue-600" />}
                  {activity.type === 'payment' && <DollarSign className="h-4 w-4 text-blue-600" />}
                  {activity.type === 'listing_update' && <Building className="h-4 w-4 text-blue-600" />}
                </div>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <span className="text-xs text-gray-500">{activity.timestamp}</span>
                </div>
                <p className="text-sm text-gray-500">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">by {activity.user}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsOverview;
