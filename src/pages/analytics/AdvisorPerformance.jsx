import React, { useState } from 'react';
import { Calendar, Download, Users, ArrowUpRight, Filter, BarChart2, TrendingUp, TrendingDown } from 'lucide-react';

// Components
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const AdvisorPerformance = () => {
  const [dateRange, setDateRange] = useState('last30');
  const [performanceFilter, setPerformanceFilter] = useState('all');
  
  // Mock advisor data
  const advisorStats = [
    {
      title: 'Total Advisors',
      value: '28',
      change: '+3',
      increasing: true,
      icon: <Users className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Clients Served',
      value: '137',
      change: '+15.3%',
      increasing: true,
      icon: <Users className="h-5 w-5" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Avg. Client Rating',
      value: '4.7/5',
      change: '+0.2',
      increasing: true,
      icon: <BarChart2 className="h-5 w-5" />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Deals Closed',
      value: '75',
      change: '+12.5%',
      increasing: true,
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'bg-amber-100 text-amber-600'
    },
  ];
  
  const topAdvisors = [
    { id: 1, name: 'Robert Davis', clientRating: 4.9, clients: 17, deals: 12, revenue: 48500, specialization: 'Food & Beverage' },
    { id: 2, name: 'Jennifer Wilson', clientRating: 4.8, clients: 21, deals: 15, revenue: 63200, specialization: 'Retail' },
    { id: 3, name: 'Michael Thompson', clientRating: 4.8, clients: 14, deals: 9, revenue: 37800, specialization: 'Technology' },
    { id: 4, name: 'Sarah Johnson', clientRating: 4.7, clients: 13, deals: 7, revenue: 35600, specialization: 'Services' },
    { id: 5, name: 'David Anderson', clientRating: 4.7, clients: 19, deals: 11, revenue: 42100, specialization: 'Manufacturing' },
  ];
  
  const advisorsBySpecialization = [
    { specialization: 'Food & Beverage', count: 6, deals: 17, avgSatisfaction: 4.5 },
    { specialization: 'Retail', count: 5, deals: 21, avgSatisfaction: 4.6 },
    { specialization: 'Technology', count: 4, deals: 14, avgSatisfaction: 4.8 },
    { specialization: 'Services', count: 4, deals: 12, avgSatisfaction: 4.6 },
    { specialization: 'Manufacturing', count: 3, deals: 9, avgSatisfaction: 4.7 },
    { specialization: 'Health & Beauty', count: 2, deals: 6, avgSatisfaction: 4.4 },
    { specialization: 'Other', count: 4, deals: 8, avgSatisfaction: 4.5 },
  ];
  
  const performanceMetrics = [
    { metric: 'Avg. Days to Close Deal', value: 47, prevValue: 52, change: -5, improving: true },
    { metric: 'Client Satisfaction', value: '92%', prevValue: '89%', change: 3, improving: true },
    { metric: 'Avg. Revenue per Deal', value: '$28,450', prevValue: '$27,200', change: 4.6, improving: true },
    { metric: 'Client Retention Rate', value: '84%', prevValue: '81%', change: 3, improving: true },
    { metric: 'Deal Success Rate', value: '76%', prevValue: '72%', change: 4, improving: true },
  ];
  
  const monthlyPerformance = [
    { month: 'Jan', clients: 98, deals: 13, satisfaction: 4.5, revenue: 357000 },
    { month: 'Feb', clients: 104, deals: 15, satisfaction: 4.6, revenue: 413000 },
    { month: 'Mar', clients: 115, deals: 17, satisfaction: 4.6, revenue: 476000 },
    { month: 'Apr', clients: 125, deals: 18, satisfaction: 4.7, revenue: 498000 },
    { month: 'May', clients: 137, deals: 21, satisfaction: 4.7, revenue: 572000 },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Advisor Performance"
        description="Monitor and analyze business advisor performance metrics"
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
            value={performanceFilter}
            onChange={(e) => setPerformanceFilter(e.target.value)}
          >
            <option value="all">All Advisors</option>
            <option value="top">Top Performers</option>
            <option value="new">New Advisors</option>
            <option value="experienced">Experienced Advisors</option>
          </select>
        </div>
        
        <div className="inline-flex rounded-md shadow-sm">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${dateRange === 'last30' ? 'bg-brand-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setDateRange('last30')}
          >
            30 Days
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${dateRange === 'last90' ? 'bg-brand-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setDateRange('last90')}
          >
            90 Days
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${dateRange === 'last6months' ? 'bg-brand-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setDateRange('last6months')}
          >
            6 Months
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${dateRange === 'lastyear' ? 'bg-brand-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setDateRange('lastyear')}
          >
            1 Year
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {advisorStats.map((stat, index) => (
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
      
      {/* Top Advisors */}
      <Card className="p-6">
        <h3 className="font-medium mb-4">Top Performing Advisors</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Advisor</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Clients</th>
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Deals</th>
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topAdvisors.map((advisor) => (
                <tr key={advisor.id}>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="text-sm font-medium">{advisor.name}</div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100">{advisor.specialization}</span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end">
                      <span className="text-sm font-medium">{advisor.clientRating}</span>
                      <div className="ml-1 h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right">
                    <div className="text-sm">{advisor.clients}</div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right">
                    <div className="text-sm">{advisor.deals}</div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right">
                    <div className="text-sm font-medium">${advisor.revenue.toLocaleString()}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-medium mb-4">Key Performance Metrics</h3>
          <div className="space-y-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{metric.metric}</span>
                <div>
                  <div className="flex items-center justify-end">
                    <span className="text-sm font-medium">{metric.value}</span>
                    <div className="ml-2 flex items-center">
                      {metric.improving ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span 
                        className={metric.improving ? 'text-green-500 text-xs' : 'text-red-500 text-xs'}
                      >
                        {metric.change > 0 ? '+' : ''}{typeof metric.change === 'number' && metric.change.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 text-right">
                    Previous: {metric.prevValue}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-medium mb-4">Advisors by Specialization</h3>
          <div className="space-y-4">
            {advisorsBySpecialization.map((specialization, index) => (
              <div key={index}>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{specialization.specialization}</span>
                  <span className="text-sm">{specialization.count} advisors</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{specialization.deals} deals</span>
                  <span>Avg. Rating: {specialization.avgSatisfaction.toFixed(1)}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-brand-blue rounded-full" 
                    style={{ width: `${(specialization.count / 28) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Monthly Performance Chart */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Monthly Performance Trends</h3>
          <div className="text-sm text-gray-500 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Last 5 Months
          </div>
        </div>
        <div className="relative h-80">
          {/* This would be replaced with an actual chart component */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-md">
            <div className="text-center">
              <p className="text-gray-500">Monthly Performance Chart Placeholder</p>
              <p className="text-xs text-gray-400 mt-2">Graph showing monthly clients, deals, and revenue trends</p>
              
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-xs font-medium text-gray-500">Month</th>
                      <th className="px-4 py-2 text-xs font-medium text-gray-500">Clients</th>
                      <th className="px-4 py-2 text-xs font-medium text-gray-500">Deals</th>
                      <th className="px-4 py-2 text-xs font-medium text-gray-500">Satisfaction</th>
                      <th className="px-4 py-2 text-xs font-medium text-gray-500">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {monthlyPerformance.map((month, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-xs font-medium">{month.month}</td>
                        <td className="px-4 py-2 text-xs">{month.clients}</td>
                        <td className="px-4 py-2 text-xs">{month.deals}</td>
                        <td className="px-4 py-2 text-xs">{month.satisfaction.toFixed(1)}</td>
                        <td className="px-4 py-2 text-xs">${month.revenue.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Advisor Insights and Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-medium mb-4">Performance Breakdown</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Top Performers (4.8+)</span>
                <span className="text-sm font-medium">7 (25%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Strong Performers (4.5-4.7)</span>
                <span className="text-sm font-medium">12 (43%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '43%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average Performers (4.0-4.4)</span>
                <span className="text-sm font-medium">6 (21%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '21%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Needs Improvement (&lt;4.0)</span>
                <span className="text-sm font-medium">3 (11%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '11%' }}></div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-medium mb-4">Client Feedback Highlights</h3>
          <div className="space-y-4">
            <div className="p-3 bg-green-50 rounded border border-green-100">
              <p className="text-sm">"Robert provided exceptional guidance throughout the entire acquisition process. His industry knowledge was invaluable."</p>
              <div className="flex justify-between mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-3 w-3 bg-green-500 rounded-full mr-0.5"></div>
                  ))}
                </div>
                <span className="text-xs text-gray-500">Business Buyer</span>
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded border border-blue-100">
              <p className="text-sm">"Jennifer made the selling process much smoother than anticipated. Great communication and negotiation skills."</p>
              <div className="flex justify-between mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`h-3 w-3 ${i < 4 ? 'bg-blue-500' : 'bg-gray-200'} rounded-full mr-0.5`}></div>
                  ))}
                </div>
                <span className="text-xs text-gray-500">Business Seller</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-medium mb-4">Recommendations</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                <TrendingUp className="h-3 w-3 text-green-600" />
              </div>
              <span>Provide additional training for advisors in Health & Beauty sector to improve satisfaction ratings</span>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                <TrendingUp className="h-3 w-3 text-green-600" />
              </div>
              <span>Recruit 2 more tech specialists based on strong performance in this category</span>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                <TrendingUp className="h-3 w-3 text-green-600" />
              </div>
              <span>Implement mentorship program pairing top performers with those needing improvement</span>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                <TrendingUp className="h-3 w-3 text-green-600" />
              </div>
              <span>Review commission structure to further incentivize client satisfaction and retention</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default AdvisorPerformance;
