import React from 'react';

const EmptyState = ({
  title,
  description,
  icon,
  actionButton,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      {/* Icon */}
      {icon && <div className="mb-4 text-gray-300">{icon}</div>}

      {/* Title */}
      <h3 className="text-h4 font-medium text-dark-gray mb-2">{title}</h3>

      {/* Description */}
      <p className="text-gray max-w-md mx-auto mb-6">{description}</p>

      {/* Action Button */}
      {actionButton && (
        <div className="mt-2">
          {actionButton}
        </div>
      )}
    </div>
  );
};

export default EmptyState;