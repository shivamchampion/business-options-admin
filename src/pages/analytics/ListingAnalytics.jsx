import React, { useState } from 'react';
import { Calendar, Download, Building, ArrowUpRight, Eye, MessageSquare, DollarSign, Filter } from 'lucide-react';

// Components
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const ListingAnalytics = () => {
  const [dateRange, setDateRange] = useState('last30');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Mock analytics data
  const listingStats = [
    {
      title: 'Active Listings',
      value: '583',
      change: '+5.2%',
      increasing: true,
      icon: <Building className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Total Views',
      value: '43,852',
      change: '+12.8%',
      increasing: true,
      icon: <Eye className="h-5 w-5" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Inquiries',
      value: '976',
      change: '+7.4%',
      increasing: true,
      icon: <MessageSquare className="h-5 w-5" />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Avg. List Price',
      value: '$583,450',
      change: '+2.1%',
      increasing: true,
      icon: <DollarSign className="h-5 w-5" />,
      color: 'bg-amber-100 text-amber-600'
    },
  ];
  
  const listingByCategory = [
    { category: 'Food & Beverage', count: 98, percentage: 17 },
    { category: 'Retail', count: 87, percentage: 15 },
    { category: 'Technology', count: 76, percentage: 13 },
    { category: 'Services', count: 72, percentage: 12 },
    { category: 'Manufacturing', count: 64, percentage: 11 },
    { category: 'E-commerce', count: 59, percentage: 10 },
    { category: 'Health & Beauty', count: 52, percentage: 9 },
    { category: 'Entertainment', count: 42, percentage: 7 },
    { category: 'Other', count: 33, percentage: 6 }
  ];
  
  const listingPerformance = [
    { week: 'Week 1', views: 9840, inquiries: 215, conversions: 23 },
    { week: 'Week 2', views: 10250, inquiries: 235, conversions: 27 },
    { week: 'Week 3', views: 11125, inquiries: 248, conversions: 31 },
    { week: 'Week 4', views: 12637, inquiries: 278, conversions: 36 },
  ];
  
  const topPerformingListings = [
    { id: 1, name: 'Premium Cafe in Sydney CBD', category: 'Food & Beverage', price: '$875,000', views: 1245, inquiries: 28, conversion: 2.25 },
    { id: 2, name: 'Established Online Fashion Retailer', category: 'E-commerce', price: '$430,000', views: 1042, inquiries: 23, conversion: 2.21 },
    { id: 3, name: 'Digital Marketing Agency - 10 Years', category: 'Services', price: '$1,250,000', views: 876, inquiries: 19, conversion: 2.17 },
    { id: 4, name: 'SaaS Platform with 5,000+ Users', category: 'Technology', price: '$2,750,000', views: 758, inquiries: 21, conversion: 2.77 },
    { id: 5, name: 'Gym Franchise Opportunity', category: 'Fitness', price: '$390,000', views: 721, inquiries: 15, conversion: 2.08 },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Listing Analytics"
        description="Monitor performance and metrics for business listings"
        action={
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export Report
          </Button>
        }
      />
      
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            className="px-3 py-2 border rounded-md"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="food">Food & Beverage</option>
            <option value="retail">Retail</option>
            <option value="tech">Technology</option>
            <option value="services">Services</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="ecommerce">E-commerce</option>
            <option value="health">Health & Beauty</option>
            <option value="entertainment">Entertainment</option>
          </select>
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
        {listingStats.map((stat, index) => (
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
      
      {/* Listing Performance Chart */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Listing Performance Over Time</h3>
          <div className="text-sm text-gray-500 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {dateRange === 'last7' ? 'Last 7 Days' : dateRange === 'last30' ? 'Last 30 Days' : 'Last 90 Days'}
          </div>
        </div>
        <div className="relative h-80 mt-4">
          {/* This would be replaced with an actual chart component */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-md">
            <div className="text-center">
              <p className="text-gray-500">Listing Performance Chart Placeholder</p>
              <p className="text-xs text-gray-400 mt-2">Graph showing views, inquiries, and conversions over time</p>
              
              <div className="flex justify-center gap-6 mt-4">
                {listingPerformance.map((week, index) => (
                  <div key={index} className="text-center">
                    <p className="text-xs font-medium">{week.week}</p>
                    <div className="mt-2 space-y-1">
                      <div className="text-xs">Views: {week.views.toLocaleString()}</div>
                      <div className="text-xs">Inquiries: {week.inquiries}</div>
                      <div className="text-xs">Conversions: {week.conversions}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Listings by Category Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-medium mb-4">Listings by Category</h3>
          <div className="space-y-3">
            {listingByCategory.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{category.category}</span>
                  <span className="text-sm">{category.count} ({category.percentage}%)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                  <div 
                    className="h-full bg-brand-blue rounded-full" 
                    style={{ width: `${category.percentage}%`, opacity: 0.6 + (index * 0.05) }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-medium mb-4">Listing Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-md p-4">
              <p className="text-sm text-gray-500">Avg. Days Listed</p>
              <h4 className="text-2xl font-medium mt-1">74</h4>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-red-500 text-sm">+3.2%</span>
              </div>
            </div>
            <div className="border rounded-md p-4">
              <p className="text-sm text-gray-500">Avg. Views per Listing</p>
              <h4 className="text-2xl font-medium mt-1">75.2</h4>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 text-sm">+8.7%</span>
              </div>
            </div>
            <div className="border rounded-md p-4">
              <p className="text-sm text-gray-500">Inquiry Rate</p>
              <h4 className="text-2xl font-medium mt-1">2.2%</h4>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 text-sm">+0.3%</span>
              </div>
            </div>
            <div className="border rounded-md p-4">
              <p className="text-sm text-gray-500">Successful Sales</p>
              <h4 className="text-2xl font-medium mt-1">12.8%</h4>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 text-sm">+1.5%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Top Performing Listings */}
      <Card className="p-6">
        <h3 className="font-medium mb-4">Top Performing Listings</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Listing</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Inquiries</th>
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Conv. Rate</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topPerformingListings.map((listing) => (
                <tr key={listing.id}>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="text-sm font-medium">{listing.name}</div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100">{listing.category}</span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right">
                    <div className="text-sm">{listing.price}</div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right">
                    <div className="text-sm">{listing.views.toLocaleString()}</div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right">
                    <div className="text-sm">{listing.inquiries}</div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right">
                    <div className="text-sm">{listing.conversion.toFixed(2)}%</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-medium mb-4">Price Range Distribution</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Under $250k</span>
                <span className="text-sm font-medium">105 (18%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-brand-blue rounded-full" style={{ width: '18%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">$250k - $500k</span>
                <span className="text-sm font-medium">187 (32%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-brand-blue rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">$500k - $1M</span>
                <span className="text-sm font-medium">152 (26%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-brand-blue rounded-full" style={{ width: '26%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">$1M - $5M</span>
                <span className="text-sm font-medium">93 (16%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-brand-blue rounded-full" style={{ width: '16%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">$5M+</span>
                <span className="text-sm font-medium">46 (8%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-brand-blue rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-medium mb-4">Popular Listing Features</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Established Customer Base</span>
                <span className="text-sm font-medium">87%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-brand-blue rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Prime Location</span>
                <span className="text-sm font-medium">73%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-brand-blue rounded-full" style={{ width: '73%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Strong Financials</span>
                <span className="text-sm font-medium">68%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-brand-blue rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Unique Selling Proposition</span>
                <span className="text-sm font-medium">54%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-brand-blue rounded-full" style={{ width: '54%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Turnkey Operation</span>
                <span className="text-sm font-medium">49%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-brand-blue rounded-full" style={{ width: '49%' }}></div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-medium mb-4">Location Heat Map</h3>
          <div className="relative h-64">
            {/* This would be replaced with an actual map component */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-md">
              <div className="text-center">
                <p className="text-gray-500">Location Heat Map Placeholder</p>
                <p className="text-xs text-gray-400 mt-2">Map showing density of listings by location</p>
                
                <div className="flex justify-center gap-4 mt-4">
                  <div className="text-center">
                    <div className="h-4 w-4 bg-red-500 rounded-sm mx-auto opacity-80"></div>
                    <p className="text-xs mt-1">High Density</p>
                  </div>
                  <div className="text-center">
                    <div className="h-4 w-4 bg-yellow-500 rounded-sm mx-auto opacity-70"></div>
                    <p className="text-xs mt-1">Medium</p>
                  </div>
                  <div className="text-center">
                    <div className="h-4 w-4 bg-green-500 rounded-sm mx-auto opacity-60"></div>
                    <p className="text-xs mt-1">Low</p>
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

export default ListingAnalytics;
