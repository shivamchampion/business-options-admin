import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const PageHeader = ({ 
  title, 
  description, 
  breadcrumbs = [], 
  actions = [],
  stats = [] 
}) => {
  return (
    <div className="mb-6">
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="mb-2">
          <ol className="flex items-center text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-brand-blue">
                Dashboard
              </Link>
            </li>
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                <ChevronRight size={14} className="mx-1" />
                {index === breadcrumbs.length - 1 || !crumb.path ? (
                  <span className="text-dark-gray font-medium">{crumb.label}</span>
                ) : (
                  <Link to={crumb.path} className="hover:text-brand-blue">
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        {/* Title and Description */}
        <div>
          <h1 className="text-h2 font-bold text-dark-gray">{title}</h1>
          {description && (
            <p className="mt-1 text-gray">{description}</p>
          )}
        </div>

        {/* Action Buttons */}
        {actions.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 mt-2 md:mt-0">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                disabled={action.disabled}
                className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  action.variant === 'primary'
                    ? 'bg-brand-blue text-white hover:bg-medium-blue focus:ring-brand-blue'
                    : action.variant === 'secondary'
                    ? 'bg-white text-brand-blue border border-brand-blue hover:bg-light-blue focus:ring-brand-blue'
                    : 'bg-white text-gray border border-gray-200 hover:bg-gray-50 focus:ring-gray-300'
                } ${action.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${action.className || ''}`}
              >
                {action.icon && (
                  <span className="mr-2">{action.icon}</span>
                )}
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      {stats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-card border-t-4 border-brand-blue"
            >
              <div className="flex items-center">
                {stat.icon && (
                  <div className="mr-3 p-2 bg-light-blue rounded-md text-brand-blue">
                    {stat.icon}
                  </div>
                )}
                <div>
                  <p className="text-gray text-sm">{stat.label}</p>
                  <p className="text-h3 font-semibold text-dark-gray mt-1">
                    {stat.value}
                    {stat.change && (
                      <span 
                        className={`ml-2 text-sm font-medium ${
                          stat.change.type === 'increase' 
                            ? 'text-success' 
                            : stat.change.type === 'decrease' 
                            ? 'text-error' 
                            : 'text-gray'
                        }`}
                      >
                        {stat.change.value}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PageHeader;