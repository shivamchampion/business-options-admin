import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const MetricCard = ({
  title,
  value,
  icon,
  change,
  changeType = 'neutral', // 'increase', 'decrease', or 'neutral'
  changeLabel,
  loading = false,
  onClick = null,
}) => {
  // Handle click if card is clickable
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  
  // Determine change icon and color
  const getChangeIndicator = () => {
    if (changeType === 'increase') {
      return {
        icon: <TrendingUp size={16} />,
        colorClass: 'text-success'
      };
    } else if (changeType === 'decrease') {
      return {
        icon: <TrendingDown size={16} />,
        colorClass: 'text-error'
      };
    } else {
      return {
        icon: <Minus size={16} />,
        colorClass: 'text-gray'
      };
    }
  };
  
  const changeIndicator = getChangeIndicator();

  return (
    <div 
      className={`bg-white p-4 rounded-lg shadow-card border-t-4 border-brand-blue ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
      onClick={handleClick}
    >
      <div className="flex items-start">
        {icon && (
          <div className="mr-3 p-2 bg-light-blue rounded-md text-brand-blue">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-gray text-sm font-medium">{title}</h3>
          
          {loading ? (
            <div className="h-8 mt-1 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <div className="flex items-baseline mt-1">
              <span className="text-h3 font-semibold text-dark-gray">
                {value}
              </span>
              
              {change && (
                <div className={`flex items-center ml-2 text-sm ${changeIndicator.colorClass}`}>
                  {changeIndicator.icon}
                  <span className="ml-1">{change}</span>
                </div>
              )}
            </div>
          )}
          
          {changeLabel && (
            <p className="text-xs text-gray mt-1">{changeLabel}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;