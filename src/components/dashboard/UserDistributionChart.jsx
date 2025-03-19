import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import LoadingSpinner from '../common/LoadingSpinner';

// Sample data
const mockData = [
  { name: 'Regular Users', value: 850, color: '#0031AC' }, // Brand Blue
  { name: 'Advisors', value: 230, color: '#00A651' },      // Success Green
  { name: 'Moderators', value: 45, color: '#FFC107' },     // Warning Amber
  { name: 'Admins', value: 12, color: '#DC3545' }          // Error Red
];

const UserDistributionChart = ({ loading = false }) => {
  // Calculate percentages
  const total = mockData.reduce((sum, entry) => sum + entry.value, 0);
  const dataWithPercentage = mockData.map(entry => ({
    ...entry,
    percentage: ((entry.value / total) * 100).toFixed(1)
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="text-sm font-medium text-dark-gray">{data.name}</p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-gray">Count:</p>
            <p className="text-xs font-medium text-dark-gray ml-3">{data.value}</p>
          </div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-gray">Percentage:</p>
            <p className="text-xs font-medium text-dark-gray ml-3">{data.percentage}%</p>
          </div>
        </div>
      );
    }
    
    return null;
  };

  // Custom legend
  const CustomLegend = ({ payload }) => {
    return (
      <ul className="flex flex-wrap justify-center items-center text-center">
        {payload.map((entry, index) => (
          <li key={`legend-${index}`} className="flex items-center mx-2 mb-2">
            <div 
              className="w-3 h-3 rounded-sm mr-1"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-gray">{entry.value}</span>
            <span className="text-xs font-medium text-dark-gray ml-1">
              ({dataWithPercentage.find(item => item.name === entry.value).percentage}%)
            </span>
          </li>
        ))}
      </ul>
    );
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
        <PieChart>
          <Pie
            data={dataWithPercentage}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
          >
            {dataWithPercentage.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color} 
                stroke="#FFFFFF"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            content={<CustomLegend />}
            verticalAlign="bottom"
            height={36}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserDistributionChart;