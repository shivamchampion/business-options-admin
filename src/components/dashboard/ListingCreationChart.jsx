import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import LoadingSpinner from '../common/LoadingSpinner';

// Sample data for different time ranges
const mockData = {
  today: [
    { hour: '00:00', business: 0, franchise: 0, startup: 0, investor: 0, digitalAsset: 0 },
    { hour: '02:00', business: 0, franchise: 0, startup: 0, investor: 0, digitalAsset: 0 },
    { hour: '04:00', business: 0, franchise: 0, startup: 0, investor: 0, digitalAsset: 0 },
    { hour: '06:00', business: 1, franchise: 0, startup: 0, investor: 0, digitalAsset: 0 },
    { hour: '08:00', business: 2, franchise: 1, startup: 0, investor: 0, digitalAsset: 0 },
    { hour: '10:00', business: 3, franchise: 1, startup: 1, investor: 0, digitalAsset: 1 },
    { hour: '12:00', business: 2, franchise: 0, startup: 1, investor: 1, digitalAsset: 0 },
    { hour: '14:00', business: 3, franchise: 1, startup: 2, investor: 0, digitalAsset: 1 },
    { hour: '16:00', business: 4, franchise: 1, startup: 1, investor: 1, digitalAsset: 0 },
    { hour: '18:00', business: 2, franchise: 0, startup: 1, investor: 0, digitalAsset: 1 },
    { hour: '20:00', business: 1, franchise: 0, startup: 0, investor: 0, digitalAsset: 0 },
    { hour: '22:00', business: 0, franchise: 0, startup: 0, investor: 0, digitalAsset: 0 }
  ],
  last7Days: [
    { day: 'Mon', business: 7, franchise: 3, startup: 4, investor: 2, digitalAsset: 3 },
    { day: 'Tue', business: 10, franchise: 5, startup: 6, investor: 3, digitalAsset: 5 },
    { day: 'Wed', business: 8, franchise: 4, startup: 5, investor: 1, digitalAsset: 4 },
    { day: 'Thu', business: 12, franchise: 6, startup: 8, investor: 4, digitalAsset: 7 },
    { day: 'Fri', business: 15, franchise: 7, startup: 9, investor: 3, digitalAsset: 6 },
    { day: 'Sat', business: 6, franchise: 2, startup: 3, investor: 1, digitalAsset: 2 },
    { day: 'Sun', business: 4, franchise: 1, startup: 2, investor: 0, digitalAsset: 1 }
  ],
  last30Days: [
    { date: '01', business: 18, franchise: 8, startup: 10, investor: 5, digitalAsset: 9 },
    { date: '05', business: 22, franchise: 10, startup: 12, investor: 7, digitalAsset: 11 },
    { date: '10', business: 25, franchise: 12, startup: 15, investor: 8, digitalAsset: 13 },
    { date: '15', business: 30, franchise: 15, startup: 18, investor: 10, digitalAsset: 15 },
    { date: '20', business: 27, franchise: 13, startup: 16, investor: 9, digitalAsset: 14 },
    { date: '25', business: 32, franchise: 16, startup: 19, investor: 11, digitalAsset: 16 },
    { date: '30', business: 35, franchise: 17, startup: 21, investor: 12, digitalAsset: 18 }
  ],
  lastQuarter: [
    { week: 'Week 1', business: 35, franchise: 17, startup: 22, investor: 12, digitalAsset: 18 },
    { week: 'Week 2', business: 42, franchise: 20, startup: 26, investor: 15, digitalAsset: 22 },
    { week: 'Week 3', business: 38, franchise: 18, startup: 24, investor: 14, digitalAsset: 20 },
    { week: 'Week 4', business: 45, franchise: 22, startup: 28, investor: 16, digitalAsset: 23 },
    { week: 'Week 5', business: 48, franchise: 24, startup: 30, investor: 17, digitalAsset: 25 },
    { week: 'Week 6', business: 52, franchise: 26, startup: 32, investor: 19, digitalAsset: 27 },
    { week: 'Week 7', business: 55, franchise: 27, startup: 34, investor: 20, digitalAsset: 28 },
    { week: 'Week 8', business: 50, franchise: 25, startup: 31, investor: 18, digitalAsset: 26 },
    { week: 'Week 9', business: 58, franchise: 29, startup: 36, investor: 21, digitalAsset: 30 },
    { week: 'Week 10', business: 62, franchise: 31, startup: 38, investor: 22, digitalAsset: 32 },
    { week: 'Week 11', business: 65, franchise: 32, startup: 40, investor: 24, digitalAsset: 34 },
    { week: 'Week 12', business: 70, franchise: 35, startup: 43, investor: 25, digitalAsset: 36 }
  ],
  lastYear: [
    { month: 'Jan', business: 120, franchise: 60, startup: 75, investor: 45, digitalAsset: 65 },
    { month: 'Feb', business: 130, franchise: 65, startup: 80, investor: 48, digitalAsset: 70 },
    { month: 'Mar', business: 140, franchise: 70, startup: 87, investor: 52, digitalAsset: 75 },
    { month: 'Apr', business: 155, franchise: 77, startup: 96, investor: 58, digitalAsset: 83 },
    { month: 'May', business: 170, franchise: 85, startup: 105, investor: 63, digitalAsset: 91 },
    { month: 'Jun', business: 185, franchise: 92, startup: 115, investor: 69, digitalAsset: 99 },
    { month: 'Jul', business: 205, franchise: 102, startup: 127, investor: 76, digitalAsset: 110 },
    { month: 'Aug', business: 190, franchise: 95, startup: 118, investor: 71, digitalAsset: 102 },
    { month: 'Sep', business: 210, franchise: 105, startup: 130, investor: 78, digitalAsset: 112 },
    { month: 'Oct', business: 230, franchise: 115, startup: 142, investor: 85, digitalAsset: 123 },
    { month: 'Nov', business: 250, franchise: 125, startup: 155, investor: 93, digitalAsset: 133 },
    { month: 'Dec', business: 270, franchise: 135, startup: 167, investor: 100, digitalAsset: 144 }
  ]
};

// Colors for different listing types
const colors = {
  business: '#0031AC',    // Brand Blue
  franchise: '#3366CC',   // Medium Blue
  startup: '#00A651',     // Success Green
  investor: '#FFC107',    // Warning Amber
  digitalAsset: '#717171' // Gray
};

const ListingCreationChart = ({ timeRange = 'last30Days', loading = false }) => {
  // Get data based on time range
  const data = mockData[timeRange] || mockData.last30Days;
  
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
      // Calculate total
      const total = payload.reduce((sum, entry) => sum + entry.value, 0);
      
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
                  {entry.dataKey === 'business' ? 'Business' : 
                   entry.dataKey === 'franchise' ? 'Franchise' : 
                   entry.dataKey === 'startup' ? 'Startup' : 
                   entry.dataKey === 'investor' ? 'Investor' : 'Digital Asset'}
                </p>
              </div>
              <p className="text-xs font-medium text-dark-gray">{entry.value}</p>
            </div>
          ))}
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-dark-gray">Total</p>
              <p className="text-xs font-medium text-dark-gray">{total}</p>
            </div>
          </div>
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
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          barSize={20}
          barGap={2}
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
            tickFormatter={(value) => value}
          />
          <Tooltip content={<CustomTooltip />} />
          
          <Bar 
            dataKey="business" 
            stackId="a" 
            name="Business"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-business-${index}`} fill={colors.business} />
            ))}
          </Bar>
          
          <Bar 
            dataKey="franchise" 
            stackId="a" 
            name="Franchise"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-franchise-${index}`} fill={colors.franchise} />
            ))}
          </Bar>
          
          <Bar 
            dataKey="startup" 
            stackId="a" 
            name="Startup"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-startup-${index}`} fill={colors.startup} />
            ))}
          </Bar>
          
          <Bar 
            dataKey="investor" 
            stackId="a" 
            name="Investor"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-investor-${index}`} fill={colors.investor} />
            ))}
          </Bar>
          
          <Bar 
            dataKey="digitalAsset" 
            stackId="a" 
            name="Digital Asset"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-digitalAsset-${index}`} fill={colors.digitalAsset} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ListingCreationChart;