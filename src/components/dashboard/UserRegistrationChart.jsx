import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import LoadingSpinner from '../common/LoadingSpinner';

// Sample data
const mockData = {
  today: [
    { hour: '00:00', users: 5 },
    { hour: '02:00', users: 3 },
    { hour: '04:00', users: 2 },
    { hour: '06:00', users: 7 },
    { hour: '08:00', users: 15 },
    { hour: '10:00', users: 12 },
    { hour: '12:00', users: 10 },
    { hour: '14:00', users: 14 },
    { hour: '16:00', users: 18 },
    { hour: '18:00', users: 13 },
    { hour: '20:00', users: 9 },
    { hour: '22:00', users: 6 }
  ],
  last7Days: [
    { day: 'Mon', users: 32 },
    { day: 'Tue', users: 45 },
    { day: 'Wed', users: 38 },
    { day: 'Thu', users: 52 },
    { day: 'Fri', users: 48 },
    { day: 'Sat', users: 25 },
    { day: 'Sun', users: 18 }
  ],
  last30Days: [
    { date: '01', users: 18 },
    { date: '02', users: 22 },
    { date: '03', users: 25 },
    { date: '04', users: 30 },
    { date: '05', users: 28 },
    { date: '06', users: 32 },
    { date: '07', users: 35 },
    { date: '08', users: 40 },
    { date: '09', users: 32 },
    { date: '10', users: 38 },
    { date: '11', users: 42 },
    { date: '12', users: 45 },
    { date: '13', users: 38 },
    { date: '14', users: 35 },
    { date: '15', users: 42 },
    { date: '16', users: 48 },
    { date: '17', users: 52 },
    { date: '18', users: 48 },
    { date: '19', users: 45 },
    { date: '20', users: 42 },
    { date: '21', users: 40 },
    { date: '22', users: 38 },
    { date: '23', users: 42 },
    { date: '24', users: 45 },
    { date: '25', users: 48 },
    { date: '26', users: 52 },
    { date: '27', users: 55 },
    { date: '28', users: 58 },
    { date: '29', users: 52 },
    { date: '30', users: 48 }
  ],
  lastQuarter: [
    { week: 'Week 1', users: 128 },
    { week: 'Week 2', users: 145 },
    { week: 'Week 3', users: 138 },
    { week: 'Week 4', users: 152 },
    { week: 'Week 5', users: 165 },
    { week: 'Week 6', users: 172 },
    { week: 'Week 7', users: 180 },
    { week: 'Week 8', users: 168 },
    { week: 'Week 9', users: 175 },
    { week: 'Week 10', users: 190 },
    { week: 'Week 11', users: 205 },
    { week: 'Week 12', users: 220 }
  ],
  lastYear: [
    { month: 'Jan', users: 420 },
    { month: 'Feb', users: 380 },
    { month: 'Mar', users: 450 },
    { month: 'Apr', users: 520 },
    { month: 'May', users: 580 },
    { month: 'Jun', users: 620 },
    { month: 'Jul', users: 750 },
    { month: 'Aug', users: 680 },
    { month: 'Sep', users: 720 },
    { month: 'Oct', users: 830 },
    { month: 'Nov', users: 900 },
    { month: 'Dec', users: 980 }
  ]
};

const UserRegistrationChart = ({ timeRange = 'last30Days', loading = false }) => {
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

  // Calculate gradient colors
  const gradientOffset = () => {
    const dataMax = Math.max(...data.map(i => i.users));
    const dataMin = Math.min(...data.map(i => i.users));
    
    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }
    
    return dataMax / (dataMax - dataMin);
  };
  
  const off = gradientOffset();

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="text-sm font-medium text-dark-gray">{`${label}`}</p>
          <p className="text-sm text-brand-blue font-semibold">
            {`${payload[0].value} new users`}
          </p>
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
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0031AC" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0031AC" stopOpacity={0.1} />
            </linearGradient>
          </defs>
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
          <Area 
            type="monotone" 
            dataKey="users" 
            stroke="#0031AC" 
            fillOpacity={1} 
            fill="url(#colorUsers)" 
            dot={{ stroke: '#0031AC', strokeWidth: 2, r: 4, fill: '#fff' }}
            activeDot={{ stroke: '#0031AC', strokeWidth: 2, r: 6, fill: '#fff' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserRegistrationChart;