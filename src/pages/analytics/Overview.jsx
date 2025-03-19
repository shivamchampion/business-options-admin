import React, { useState } from 'react';
import { BarChart, PieChart, LineChart, Users, ShoppingBag, DollarSign, TrendingUp, Calendar, Info } from 'lucide-react';

// Components
import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/card';
import Button from '../../components/ui/button';

const AnalyticsOverview = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(false);
  
  // Mock data for the charts and metrics
  const overviewMetrics = [
    { id: 1, title: 'Total Users', value: '2,547', change: '+12.5%', icon: <Users className="h-5 w-5 text-blue-500" />, trend: 'up' },
    { id: 2, title: 'Active Listings', value: '385', change: '+5.3%', icon: <ShoppingBag className="h-5 w-5 text-green-500" />, trend: 'up' },
    { id: 3, title: 'Monthly Revenue', value: '$24,835', change: '+18.2%', icon: <DollarSign className="h-5 w-5 text-purple-500" />, trend: 'up' },
    { id: 4, title: 'Conversion Rate', value: '3.8%', change: '-0.4%', icon: <TrendingUp className="h-5 w-5 text-amber-500" />, trend: 'down' },
  ];
  
  // Handle time range change
  const handleTimeRangeChange = (range) => {
    setLoading(true);
    setTimeRange(range);
    
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Analytics Overview"
        description="Key metrics and performance indicators for your business"
        action={
          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${timeRange === 'week' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
              onClick={() => handleTimeRangeChange('week')}
            >
              Week
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${timeRange === 'month' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border-t border-b border-gray-300 hover:bg-gray-50'}`}
              onClick={() => handleTimeRangeChange('month')}
            >
              Month
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${timeRange === 'quarter' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
              onClick={() => handleTimeRangeChange('quarter')}
            >
              Quarter
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${timeRange === 'year' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
              onClick={() => handleTimeRangeChange('year')}
            >
              Year
            </button>
          </div>
        }
      />
      
      {/* Date Range Indicator */}
      <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-md p-4">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-blue-500 mr-2" />
          <span className="text-sm font-medium text-blue-700">
            {timeRange === 'week' && 'March 12 - March 19, 2025'}
            {timeRange === 'month' && 'March 1 - March 31, 2025'}
            {timeRange === 'quarter' && 'January 1 - March 31, 2025'}
            {timeRange === 'year' && 'January 1 - December 31, 2025'}
          </span>
        </div>
        <div className="text-sm text-blue-600">
          <span className="font-medium">Last Updated:</span> Today at 2:15 PM
        </div>
      </div>
      
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewMetrics.map((metric) => (
          <Card key={metric.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full p-3 bg-gray-100">
                {metric.icon}
              </div>
              <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
              <p className="mt-1 text-3xl font-semibold">{metric.value}</p>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="overflow-hidden">
          <div className="border-b px-4 py-3 bg-gray-50">
            <h3 className="font-medium">Revenue Trend</h3>
          </div>
          <div className="p-6">
            {loading ? (
              <div className="h-60 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="h-60 bg-gray-100 rounded-md flex items-center justify-center">
                  <LineChart className="h-10 w-10 text-gray-400" />
                  <span className="ml-2 text-gray-600">Revenue Chart Visualization</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-500">Current Period</p>
                    <p className="mt-1 font-semibold">$24,835</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Previous Period</p>
                    <p className="mt-1 font-semibold">$21,012</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Year-over-Year</p>
                    <p className="mt-1 font-semibold text-green-600">+18.2%</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
        
        {/* User Acquisition Chart */}
        <Card className="overflow-hidden">
          <div className="border-b px-4 py-3 bg-gray-50">
            <h3 className="font-medium">User Acquisition</h3>
          </div>
          <div className="p-6">
            {loading ? (
              <div className="h-60 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="h-60 bg-gray-100 rounded-md flex items-center justify-center">
                  <BarChart className="h-10 w-10 text-gray-400" />
                  <span className="ml-2 text-gray-600">User Acquisition Chart</span>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  <div className="p-2 bg-blue-50 rounded text-center">
                    <p className="text-xs text-gray-500">Organic</p>
                    <p className="mt-1 font-semibold text-sm">45%</p>
                  </div>
                  <div className="p-2 bg-green-50 rounded text-center">
                    <p className="text-xs text-gray-500">Referral</p>
                    <p className="mt-1 font-semibold text-sm">28%</p>
                  </div>
                  <div className="p-2 bg-purple-50 rounded text-center">
                    <p className="text-xs text-gray-500">Social</p>
                    <p className="mt-1 font-semibold text-sm">15%</p>
                  </div>
                  <div className="p-2 bg-amber-50 rounded text-center">
                    <p className="text-xs text-gray-500">Other</p>
                    <p className="mt-1 font-semibold text-sm">12%</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
      
      {/* Secondary Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Listings by Category */}
        <Card className="overflow-hidden">
          <div className="border-b px-4 py-3 bg-gray-50">
            <h3 className="font-medium">Listings by Category</h3>
          </div>
          <div className="p-6">
            {loading ? (
              <div className="h-40 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
                  <PieChart className="h-8 w-8 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-600">Categories Chart</span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span>Restaurants</span>
                    <span className="font-medium">32%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Retail</span>
                    <span className="font-medium">28%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Service</span>
                    <span className="font-medium">24%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Other</span>
                    <span className="font-medium">16%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
        
        {/* Top Performing Advisors */}
        <Card className="overflow-hidden">
          <div className="border-b px-4 py-3 bg-gray-50">
            <h3 className="font-medium">Top Performing Advisors</h3>
          </div>
          <div className="p-6 space-y-3">
            {loading ? (
              <div className="h-40 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-sm font-medium">Advisor</span>
                  <span className="text-sm font-medium">Listings</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm">JD</div>
                      <span className="ml-2 text-sm">Jane Doe</span>
                    </div>
                    <span className="text-sm font-medium">42</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium text-sm">JS</div>
                      <span className="ml-2 text-sm">John Smith</span>
                    </div>
                    <span className="text-sm font-medium">38</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium text-sm">AJ</div>
                      <span className="ml-2 text-sm">Alex Johnson</span>
                    </div>
                    <span className="text-sm font-medium">27</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-medium text-sm">SL</div>
                      <span className="ml-2 text-sm">Sarah Lee</span>
                    </div>
                    <span className="text-sm font-medium">21</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>
        
        {/* Conversion Funnel */}
        <Card className="overflow-hidden">
          <div className="border-b px-4 py-3 bg-gray-50">
            <h3 className="font-medium">Conversion Funnel</h3>
          </div>
          <div className="p-6">
            {loading ? (
              <div className="h-40 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Visitors</span>
                      <span className="text-sm font-medium">12,486</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Listing Views</span>
                      <span className="text-sm font-medium">8,245</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: '66%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Inquiries</span>
                      <span className="text-sm font-medium">3,128</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Applications</span>
                      <span className="text-sm font-medium">476</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: '3.8%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Conversion Rate</span>
                    <span className="text-xs font-medium">3.8%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
      
      {/* Analytics Insights */}
      <Card className="p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-blue-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium">Analytics Insights</h3>
            <div className="mt-2 text-sm text-gray-500 space-y-2">
              <p>
                <span className="font-medium text-gray-700">Revenue Growth:</span> Your monthly revenue has increased by 18.2% compared to the previous month, primarily driven by a 15% increase in premium listing subscriptions.
              </p>
              <p>
                <span className="font-medium text-gray-700">User Acquisition:</span> Organic search remains your strongest channel for new users, suggesting your SEO strategy is working effectively.
              </p>
              <p>
                <span className="font-medium text-gray-700">Conversion Optimization:</span> Your overall conversion rate has decreased slightly. Consider reviewing your application process to identify potential friction points.
              </p>
            </div>
            <div className="mt-3">
              <Button variant="outline" size="sm">
                View Detailed Report
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsOverview;
