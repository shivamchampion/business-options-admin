import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

/**
 * Breadcrumbs component for navigation hierarchy
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.homeLabel] - Custom label for home/dashboard
 */
const Breadcrumbs = ({ 
  className = '', 
  homeLabel = { title: 'Dashboard', path: '/dashboard' } 
}) => {
  const location = useLocation()
  
  // Split the pathname and remove empty strings
  const pathnames = location.pathname.split('/').filter(x => x)
  
  // Generate breadcrumb items
  const breadcrumbItems = [
    homeLabel,
    ...pathnames.map((name, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
      const title = name
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())
      return { title, path: routeTo }
    })
  ]

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center text-sm text-gray-500 ${className}`}
    >
      <ol className="flex items-center space-x-1">
        {breadcrumbItems.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {index > 0 && (
              <ChevronRight 
                className="h-4 w-4 mx-2 text-gray-400" 
                aria-hidden="true" 
              />
            )}
            {index === breadcrumbItems.length - 1 ? (
              <span className="text-gray-700 font-medium">
                {item.title}
              </span>
            ) : (
              <Link
                to={item.path}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs