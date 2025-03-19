import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import LoadingSpinner from '../common/LoadingSpinner';
import { formatCurrency } from '../../utils/formatters';

// Sample data for different time ranges
const mockData = {
  today: [
    { hour: '00:00', revenue: 0, target: 500 },
    { hour: '02:00', revenue: 0, target: 500 },
    { hour: '04:00', revenue: 0, target: 500 },
    { hour: '06:00', revenue: 800, target: 500 },
    { hour: '08:00', revenue: 1200, target: 500 },
    { hour: '10:00', revenue: 3500, target: 500 },
    { hour: '12:00', revenue: 2800, target: 500 },
    { hour: '14:00', revenue: 4200, target: 500 },
    { hour: '16:00', revenue: 5000, target: 500 },
    { hour: '18:00', revenue: 3800, target: 500 },
    { hour: '20:00', revenue: 2200, target: 500 },
    { hour: '22:00', revenue: 1500, target: 500 }
  ],
  last7Days: [
    { day: 'Mon', revenue: 22000, target: 20000 },
    { day: 'Tue', revenue: 25000, target: 20000 },
    { day: 'Wed', revenue: 18000, target: 20000 },
    { day: 'Thu', revenue: 30000, target: 20000 },
    { day: 'Fri', revenue: 35000, target: 20000 },
    { day: 'Sat', revenue: 15000, target: 20000 },
    { day: 'Sun', revenue: 10000, target: 20000 }
  ],
  last30Days: [
    { date: '01', revenue: 18000, target: 15000 },
    { date: '05', revenue: 22000, target: 15000 },
    { date: '10', revenue: 25000, target: 15000 },
    { date: '15', revenue: 30000, target: 15000 },
    { date: '20', revenue: 27000, target: 15000 },
    { date: '25', revenue: 32000, target: 15000 },
    { date: '30', revenue: 35000, target: 15000 }
  ],
  lastQuarter: [
    { week: 'Week 1', revenue: 80000, target: 75000 },
    { week: 'Week 2', revenue: 95000, target: 75000 },
    { week: 'Week 3', revenue: 88000, target: 75000 },
    { week: 'Week 4', revenue: 105000, target: 75000 },
    { week: 'Week 5', revenue: 110000, target: 75000 },
    { week: 'Week 6', revenue: 120000, target: 75000 },
    { week: 'Week 7', revenue: 125000, target: 75000 },
    { week: 'Week 8', revenue: 115000, target: 75000 },
    { week: 'Week 9', revenue: 130000, target: 75000 },
    { week: 'Week 10', revenue: 140000, target: 75000 },
    { week: 'Week 11', revenue: 150000, target: 75000 },
    { week: 'Week 12', revenue: 160000, target: 75000 }
  ],
  lastYear: [
    { month: 'Jan', revenue: 320000, target: 300000 },
    { month: 'Feb', revenue: 350000, target: 300000 },
    { month: 'Mar', revenue: 380000, target: 300000 },
    { month: 'Apr', revenue: 420000, target: 300000 },
    { month: 'May', revenue: 450000, target: 300000 },
    { month: 'Jun', revenue: 470000, target: 300000 },
    { month: 'Jul', revenue: 520000, target: 300000 },
    { month: 'Aug', revenue: 480000, target: 300000 },
    { month: 'Sep', revenue: 510000, target: 300000 },
    { month: 'Oct', revenue: 550000, target: 300000 },
    { month: 'Nov', revenue: 580000, target: 300000 },
    { month: 'Dec', revenue: 620000, target: 300000 }
  ]
};

const RevenueChart = ({ timeRange = 'last30Days', loading = false }) => {
  // Get data based on time range
  const data = mockData[timeRange] || mockData.last30Days;
  
  // Calculate total and average revenue
  const totalRevenue = data.reduce((sum, entry) => sum + entry.revenue, 0);
  const averageRevenue = totalRevenue / data.length;
  
  // Determine which key to use for X-axis
  const getXAxisDataKey = () => {
    switch (timeRange) {
      case 'today':
        return 'hour';
      case 'last7Days':
        return 'day';
      case 'last30Days':
        return 'date';
      case 'lastQuarter':
        return 'week';
      case 'lastYear':
        return 'month';
      default:
        return 'date';
    }
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="text-sm font-medium text-dark-gray mb-2">{`${label}`}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-sm mr-2"
                  style={{ backgroundColor: entry.color }}
                />
                <p className="text-xs text-gray">
                  {entry.dataKey === 'revenue' ? 'Revenue' : 'Target'}
                </p>
              </div>
              <p className="text-xs font-medium text-dark-gray">
                {formatCurrency(entry.value)}
              </p>
            </div>
          ))}
        </div>
      );
    }
    
    return null;
  };

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <LoadingSpinner size="medium" text="Loading chart data..." />
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey={getXAxisDataKey()} 
            tick={{ fontSize: 12, fill: '#717171' }} 
            tickLine={false}
            axisLine={{ stroke: '#E6E9ED' }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#717171' }} 
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `₹${value / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={36}
            formatter={(value) => (
              <span className="text-xs font-medium">
                {value === 'revenue' ? 'Revenue' : 'Target'}
              </span>
            )}
          />
          
          {/* Average revenue reference line */}
          <ReferenceLine 
            y={averageRevenue} 
            stroke="#717171" 
            strokeDasharray="3 3" 
            label={{ 
              position: 'right',
              value: 'Avg',
              fill: '#717171',
              fontSize: 10
            }} 
          />
          
          <Line 
            type="monotone" 
            dataKey="target" 
            stroke="#FFC107" 
            strokeWidth={2} 
            dot={false}
            strokeDasharray="5 5"
          />
          
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#00A651" 
            strokeWidth={2} 
            dot={{
              stroke: '#00A651',
              strokeWidth: 2,
              r: 4,
              fill: '#FFFFFF'
            }}
            activeDot={{
              stroke: '#00A651',
              strokeWidth: 2,
              r: 6,
              fill: '#FFFFFF'
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;