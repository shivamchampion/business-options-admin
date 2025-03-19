import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, UserCheck, Zap, MessageSquare } from 'lucide-react';

const QuickActions = ({ 
  loading = false,
  pendingApprovals = 0,
  instaApplyNeedingProcessing = 0,
  userVerifications = 0,
  supportInquiries = 0
}) => {
  const actions = [
    {
      title: 'Listings Pending Approval',
      count: pendingApprovals,
      icon: <AlertTriangle size={20} className="text-warning" />,
      description: 'Listings waiting for your review',
      link: '/listings/pending',
      linkText: 'Review Listings'
    },
    {
      title: 'Insta Apply Submissions',
      count: instaApplyNeedingProcessing,
      icon: <Zap size={20} className="text-brand-blue" />,
      description: 'New applications needing processing',
      link: '/applications/new',
      linkText: 'Process Applications'
    },
    {
      title: 'User Verifications',
      count: userVerifications,
      icon: <UserCheck size={20} className="text-success" />,
      description: 'User verification requests',
      link: '/users',
      linkText: 'Verify Users'
    },
    {
      title: 'Support Inquiries',
      count: supportInquiries,
      icon: <MessageSquare size={20} className="text-error" />,
      description: 'Recent support inquiries',
      link: '/support',
      linkText: 'View Inquiries'
    }
  ];

  if (loading) {
    return (
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="animate-pulse bg-white rounded-lg p-4 shadow-card">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
              <div className="h-5 bg-gray-200 rounded w-3/5"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5 mb-3"></div>
            <div className="h-8 bg-gray-200 rounded w-2/5"></div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {actions.map((action, index) => (
        <div key={index} className="bg-white rounded-lg p-4 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="mr-2">{action.icon}</div>
              <h4 className="text-sm font-medium text-dark-gray">{action.title}</h4>
            </div>
          </div>
          
          <div className="mb-3">
            <span className="text-h3 font-semibold text-dark-gray">{action.count}</span>
          </div>
          
          <p className="text-xs text-gray mb-3">{action.description}</p>
          
          {action.count > 0 ? (
            <Link 
              to={action.link} 
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-brand-blue text-white hover:bg-medium-blue transition-colors"
            >
              {action.linkText}
            </Link>
          ) : (
            <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-gray-100 text-gray cursor-default">
              None pending
            </span>
          )}
        </div>
      ))}
    </>
  );
};

export default QuickActions;