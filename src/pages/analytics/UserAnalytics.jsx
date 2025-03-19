import React, { useState } from 'react';
import { Calendar, Download, Users, ArrowUpRight, UserPlus, UserCheck, UserX } from 'lucide-react';

// Components
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const UserAnalytics = () => {
  const [dateRange, setDateRange] = useState('last30');
  const [userType, setUserType] = useState('all');
  
  // Mock analytics data
  const userStats = [
    {
      title: 'Total Users',
      value: '2,547',
      change: '+12.5%',
      increasing: true,
      icon: <Users className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'New Signups',
      value: '187',
      change: '+8.3%',
      increasing: true,
      icon: <UserPlus className="h-5 w-5" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Active Users',
      value: '1,842',
      change: '+5.7%',
      increasing: true,
      icon: <UserCheck className="h-5 w-5" />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Churned Users',
      value: '43',
      change: '-2.1%',
      increasing: true,
      icon: <UserX className="h-5 w-5" />,
      color: 'bg-amber-100 text-amber-600'
    },
  ];
  
  const userDemographics = [
    { region: 'New South Wales', count: 843, percentage: 33 },
    { region: 'Victoria', count: 652, percentage: 26 },
    { region: 'Queensland', count: 423, percentage: 17 },
    { region: 'Western Australia', count: 287, percentage: 11 },
    { region: 'South Australia', count: 176, percentage: 7 },
    { region: 'Other', count: 156, percentage: 6 },
  ];
  
  const userRoles = [
    { role: 'Buyers', count: 1247, percentage: 49 },
    { role: 'Sellers', count: 876, percentage: 34 },
    { role: 'Brokers', count: 324, percentage: 13 },
    { role: 'Advisors', count: 100, percentage: 4 },
  ];
  
  const activeUsers = [
    { date: 'Jan 1', users: 1250 },
    { date: 'Jan 5', users: 1290 },
    { date: 'Jan 10', users: 1340 },
    { date: 'Jan 15', users: 1410 },
    { date: 'Jan 20', users: 1490 },
    { date: 'Jan 25', users: 1550 },
    { date: 'Jan 30', users: 1600 },
    { date: 'Feb 5', users: 1680 },
    { date: 'Feb 10', users: 1720 },
    { date: 'Feb 15', users: 1780 },
    { date: 'Feb 20', users: 1842 },
  ];
  
  const topPerformingUsers = [
    { id: 1, name: 'John Smith', type: 'Broker', listings: 24, inquiries: 47, conversions: 8 },
    { id: 2, name: 'Sarah Johnson', type: 'Seller', listings: 12, inquiries: 36, conversions: 5 },
    { id: 3, name: 'Michael Brown', type: 'Broker', listings: 18, inquiries: 31, conversions: 7 },
    { id: 4, name: 'Emily Wilson', type: 'Seller', listings: 8, inquiries: 29, conversions: 4 },
    { id: 5, name: 'Robert Davis', type: 'Advisor', listings: 0, inquiries: 52, conversions: 11 },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="User Analytics"
        description="Analyze user behavior, growth, and demographics"
        action={
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export Report
          </Button>
        }
      />
      
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${userType === 'all' ? 'bg-brand-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setUserType('all')}
          >
            All Users
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${userType === 'buyers' ? 'bg-brand-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setUserType('buyers')}
          >
            Buyers
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${userType === 'sellers' ? 'bg-brand-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setUserType('sellers')}
          >
            Sellers
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${userType === 'brokers' ? 'bg-brand-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setUserType('brokers')}
          >
            Brokers
          </button>
        </div>
        
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
        {userStats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className={`h-4 w-4 ${stat.increasing ? 'text-green-500' : 'text-red-500'} mr-1`} />
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
      
      {/* User Growth Chart */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">User Growth Over Time</h3>
          <div className="text-sm text-gray-500 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {dateRange === 'last7' ? 'Last 7 Days' : dateRange === 'last30' ? 'Last 30 Days' : 'Last 90 Days'}
          </div>
        </div>
        <div className="relative h-80 mt-4">
          {/* This would be replaced with an actual chart component */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-md">
            <div className="text-center">
              <p className="text-gray-500">User Growth Chart Placeholder</p>
              <p className="text-xs text-gray-400 mt-2">Graph showing user growth over time</p>
            </div>
          </div>
        </div>
      </Card>
      
      {/* User Demographics and Role Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-medium mb-4">User Demographics by Region</h3>
          <div className="space-y-3">
            {userDemographics.map((region, index) => (
              <div key={index}>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{region.region}</span>
                  <span className="text-sm">{region.count} ({region.percentage}%)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                  <div 
                    className="h-full bg-brand-blue rounded-full" 
                    style={{ width: `${region.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-medium mb-4">User Distribution by Role</h3>
          <div className="relative h-64">
            {/* This would be replaced with an actual chart component */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-md">
              <div className="text-center">
                <p className="text-gray-500">Role Distribution Chart Placeholder</p>
                <div className="flex justify-center gap-4 mt-4">
                  {userRoles.map((role, index) => (
                    <div key={index} className="text-center">
                      <div className="h-4 w-4 bg-brand-blue rounded-full mx-auto opacity-80" style={{ opacity: 0.5 + (index * 0.1) }}></div>
                      <p className="text-xs mt-1">{role.role}: {role.percentage}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Top Performing Users */}
      <Card className="p-6">
        <h3 className="font-medium mb-4">Top Performing Users</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Listings</th>
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Inquiries</th>
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Conversions</th>
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Conv. Rate</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topPerformingUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="text-sm font-medium">{user.name}</div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100">{user.type}</span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right">
                    <div className="text-sm">{user.listings}</div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right">
                    <div className="text-sm">{user.inquiries}</div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right">
                    <div className="text-sm">{user.conversions}</div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right">
                    <div className="text-sm">
                      {user.inquiries > 0 ? ((user.conversions / user.inquiries) * 100).toFixed(1) : 0}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* User Activity Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-medium mb-4">Engagement Metrics</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg. Session Duration</span>
                <span className="text-sm font-medium">3m 24s</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pages per Session</span>
                <span className="text-sm font-medium">4.2</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Bounce Rate</span>
                <span className="text-sm font-medium">27.8%</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Return Rate</span>
                <span className="text-sm font-medium">42.3%</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-medium mb-4">Acquisition Channels</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Organic Search</span>
                <span className="text-sm font-medium">38%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-brand-blue rounded-full" style={{ width: '38%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Direct</span>
                <span className="text-sm font-medium">27%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-brand-blue rounded-full" style={{ width: '27%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Social Media</span>
                <span className="text-sm font-medium">18%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-brand-blue rounded-full" style={{ width: '18%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Referrals</span>
                <span className="text-sm font-medium">17%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-brand-blue rounded-full" style={{ width: '17%' }}></div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-medium mb-4">Device Usage</h3>
          <div className="relative h-48">
            {/* This would be replaced with an actual chart component */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-md">
              <div className="text-center">
                <p className="text-gray-500">Device Usage Chart Placeholder</p>
                <div className="flex justify-center gap-4 mt-4">
                  <div className="text-center">
                    <div className="h-4 w-4 bg-brand-blue rounded-full mx-auto"></div>
                    <p className="text-xs mt-1">Desktop: 62%</p>
                  </div>
                  <div className="text-center">
                    <div className="h-4 w-4 bg-brand-blue rounded-full mx-auto opacity-70"></div>
                    <p className="text-xs mt-1">Mobile: 32%</p>
                  </div>
                  <div className="text-center">
                    <div className="h-4 w-4 bg-brand-blue rounded-full mx-auto opacity-40"></div>
                    <p className="text-xs mt-1">Tablet: 6%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserAnalytics;
