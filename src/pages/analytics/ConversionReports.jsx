import React, { useState } from 'react';
import { Calendar, Download, TrendingUp, TrendingDown, Users, Building, DollarSign, Filter } from 'lucide-react';

// Components
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const ConversionReports = () => {
  const [dateRange, setDateRange] = useState('last30');
  const [reportType, setReportType] = useState('all');
  
  // Mock conversion data
  const conversionStats = [
    {
      title: 'Listing Views',
      value: '43,852',
      prevValue: '38,921',
      change: '+12.7%',
      increasing: true,
    },
    {
      title: 'Inquiries',
      value: '976',
      prevValue: '908',
      change: '+7.5%',
      increasing: true,
    },
    {
      title: 'Successful Sales',
      value: '125',
      prevValue: '112',
      change: '+11.6%',
      increasing: true,
    },
    {
      title: 'Conversion Rate',
      value: '12.8%',
      prevValue: '12.3%',
      change: '+0.5%',
      increasing: true,
    },
  ];
  
  const conversionFunnel = [
    { stage: 'Views', count: 43852, percentage: 100 },
    { stage: 'Profile Clicks', count: 7894, percentage: 18 },
    { stage: 'Inquiries', count: 976, percentage: 2.2 },
    { stage: 'Detailed Discussions', count: 342, percentage: 0.8 },
    { stage: 'Offers', count: 178, percentage: 0.4 },
    { stage: 'Sales Completed', count: 125, percentage: 0.3 },
  ];
  
  const categoryConversions = [
    { category: 'Food & Beverage', inquiries: 187, sales: 26, rate: 13.9 },
    { category: 'Retail', inquiries: 165, sales: 21, rate: 12.7 },
    { category: 'Technology', inquiries: 142, sales: 23, rate: 16.2 },
    { category: 'Services', inquiries: 134, sales: 17, rate: 12.7 },
    { category: 'Manufacturing', inquiries: 98, sales: 11, rate: 11.2 },
    { category: 'E-commerce', inquiries: 93, sales: 12, rate: 12.9 },
    { category: 'Health & Beauty', inquiries: 87, sales: 9, rate: 10.3 },
    { category: 'Entertainment', inquiries: 70, sales: 6, rate: 8.6 },
  ];
  
  const priceRangeConversions = [
    { range: 'Under $250k', inquiries: 195, sales: 32, rate: 16.4 },
    { range: '$250k - $500k', inquiries: 358, sales: 51, rate: 14.2 },
    { range: '$500k - $1M', inquiries: 282, sales: 29, rate: 10.3 },
    { range: '$1M - $5M', inquiries: 121, sales: 11, rate: 9.1 },
    { range: '$5M+', inquiries: 20, sales: 2, rate: 10.0 },
  ];
  
  const monthlyTrends = [
    { month: 'Jan', views: 35240, inquiries: 782, sales: 98, rate: 12.5 },
    { month: 'Feb', views: 37650, inquiries: 832, sales: 104, rate: 12.5 },
    { month: 'Mar', views: 39875, inquiries: 887, sales: 109, rate: 12.3 },
    { month: 'Apr', views: 41230, inquiries: 921, sales: 115, rate: 12.5 },
    { month: 'May', views: 43852, inquiries: 976, sales: 125, rate: 12.8 },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Conversion Reports"
        description="Analyze conversion metrics and sales funnel performance"
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
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="all">All Conversions</option>
            <option value="category">By Category</option>
            <option value="price">By Price Range</option>
            <option value="location">By Location</option>
            <option value="source">By Source</option>
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
            className={`px-4 py-2 text-sm font-medium ${dateRange === 'last90' ? 'bg-brand-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setDateRange('last90')}
          >
            Last 90 Days
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${dateRange === 'custom' ? 'bg-brand-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setDateRange('custom')}
          >
            Custom
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {conversionStats.map((stat, index) => (
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
              <div className="text-xs text-gray-500">
                Previous: {stat.prevValue}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Conversion Funnel */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium">Conversion Funnel</h3>
          <div className="text-sm text-gray-500 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {dateRange === 'last7' ? 'Last 7 Days' : dateRange === 'last30' ? 'Last 30 Days' : 'Last 90 Days'}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <div className="space-y-4">
              {conversionFunnel.map((stage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{stage.stage}</span>
                    <span>{stage.count.toLocaleString()} ({stage.percentage}%)</span>
                  </div>
                  <div className="h-8 bg-gray-100 rounded-md overflow-hidden relative">
                    <div 
                      className="h-full bg-brand-blue" 
                      style={{ 
                        width: `${index === 0 ? 100 : (stage.count / conversionFunnel[0].count) * 100}%`,
                        opacity: 0.4 + (index * 0.1) 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-1/3 bg-gray-50 rounded-md p-4">
            <h4 className="font-medium mb-3">Funnel Insights</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                </div>
                <span>12.8% overall conversion rate from inquiry to sale</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-2 flex-shrink-0">
                  <TrendingDown className="h-3 w-3 text-amber-600" />
                </div>
                <span>Largest drop-off occurs between views and profile clicks (82%)</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                  <TrendingUp className="h-3 w-3 text-blue-600" />
                </div>
                <span>70.2% of interested parties who make offers complete the purchase</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                </div>
                <span>Technology sector has the highest inquiry-to-sale conversion rate</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
      
      {/* Conversion by Category and Price Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-medium mb-4">Conversion by Category</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Inquiries</th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categoryConversions.map((category, index) => (
                  <tr key={index}>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="text-sm font-medium">{category.category}</div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-right">
                      <div className="text-sm">{category.inquiries}</div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-right">
                      <div className="text-sm">{category.sales}</div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-right">
                      <div 
                        className={`text-sm ${category.rate > 13 ? 'text-green-600' : category.rate < 10 ? 'text-red-600' : 'text-amber-600'}`}
                      >
                        {category.rate.toFixed(1)}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-medium mb-4">Conversion by Price Range</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Range</th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Inquiries</th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {priceRangeConversions.map((range, index) => (
                  <tr key={index}>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="text-sm font-medium">{range.range}</div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-right">
                      <div className="text-sm">{range.inquiries}</div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-right">
                      <div className="text-sm">{range.sales}</div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-right">
                      <div 
                        className={`text-sm ${range.rate > 15 ? 'text-green-600' : range.rate < 10 ? 'text-red-600' : 'text-amber-600'}`}
                      >
                        {range.rate.toFixed(1)}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      
      {/* Monthly Trends */}
      <Card className="p-6">
        <h3 className="font-medium mb-4">Monthly Conversion Trends</h3>
        <div className="relative h-80">
          {/* This would be replaced with an actual chart component */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-md">
            <div className="text-center">
              <p className="text-gray-500">Monthly Conversion Trends Chart Placeholder</p>
              <p className="text-xs text-gray-400 mt-2">Graph showing monthly views, inquiries, sales and conversion rates</p>
              
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-xs font-medium text-gray-500">Month</th>
                      <th className="px-4 py-2 text-xs font-medium text-gray-500">Views</th>
                      <th className="px-4 py-2 text-xs font-medium text-gray-500">Inquiries</th>
                      <th className="px-4 py-2 text-xs font-medium text-gray-500">Sales</th>
                      <th className="px-4 py-2 text-xs font-medium text-gray-500">Conv. Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {monthlyTrends.map((month, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-xs font-medium">{month.month}</td>
                        <td className="px-4 py-2 text-xs">{month.views.toLocaleString()}</td>
                        <td className="px-4 py-2 text-xs">{month.inquiries}</td>
                        <td className="px-4 py-2 text-xs">{month.sales}</td>
                        <td className="px-4 py-2 text-xs">{month.rate}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-medium mb-4">Time to Conversion</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Less than 1 week</span>
                <span className="text-sm font-medium">12%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-brand-blue rounded-full" style={{ width: '12%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">1-4 weeks</span>
                <span className="text-sm font-medium">38%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-brand-blue rounded-full" style={{ width: '38%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">1-3 months</span>
                <span className="text-sm font-medium">32%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-brand-blue rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">3-6 months</span>
                <span className="text-sm font-medium">14%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-brand-blue rounded-full" style={{ width: '14%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Over 6 months</span>
                <span className="text-sm font-medium">4%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-brand-blue rounded-full" style={{ width: '4%' }}></div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-medium mb-4">Traffic Sources</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Organic Search</span>
                <span className="text-sm font-medium">42%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-brand-blue rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Direct</span>
                <span className="text-sm font-medium">28%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-brand-blue rounded-full" style={{ width: '28%' }}></div>
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
                <span className="text-sm">Email</span>
                <span className="text-sm font-medium">8%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-brand-blue rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Referrals</span>
                <span className="text-sm font-medium">4%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-brand-blue rounded-full" style={{ width: '4%' }}></div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-medium mb-4">Conversion Recommendations</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                <TrendingUp className="h-3 w-3 text-green-600" />
              </div>
              <span>Improve profile completion for 15% higher conversion rates</span>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                <Building className="h-3 w-3 text-green-600" />
              </div>
              <span>Focus on $250k-$500k price range with highest conversion rate</span>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                <Users className="h-3 w-3 text-green-600" />
              </div>
              <span>Technology category listings have highest buyer engagement</span>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                <DollarSign className="h-3 w-3 text-green-600" />
              </div>
              <span>Optimize listings with strong financials - 68% include this feature</span>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                <TrendingUp className="h-3 w-3 text-green-600" />
              </div>
              <span>Follow up within 48 hours increases conversion by 37%</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default ConversionReports;
