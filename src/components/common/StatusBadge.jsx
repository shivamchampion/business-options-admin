import React from 'react';

const StatusBadge = ({ status, type, size = 'medium' }) => {
  // Determine status variant and styling
  const getStatusConfig = () => {
    // For listing status
    if (type === 'listing') {
      switch (status) {
        case 'draft':
          return { label: 'Draft', variant: 'neutral' };
        case 'pending':
          return { label: 'Pending Review', variant: 'warning' };
        case 'published':
          return { label: 'Published', variant: 'success' };
        case 'rejected':
          return { label: 'Rejected', variant: 'error' };
        case 'archived':
          return { label: 'Archived', variant: 'neutral' };
        default:
          return { label: status, variant: 'neutral' };
      }
    }
    
    // For user status
    if (type === 'user') {
      switch (status) {
        case 'active':
          return { label: 'Active', variant: 'success' };
        case 'inactive':
          return { label: 'Inactive', variant: 'neutral' };
        case 'suspended':
          return { label: 'Suspended', variant: 'warning' };
        case 'disabled':
          return { label: 'Disabled', variant: 'error' };
        default:
          return { label: status, variant: 'neutral' };
      }
    }
    
    // For application (Insta Apply) status
    if (type === 'application') {
      switch (status) {
        case 'new':
          return { label: 'New', variant: 'info' };
        case 'contacted':
          return { label: 'Contacted', variant: 'warning' };
        case 'converted':
          return { label: 'Converted', variant: 'success' };
        case 'closed':
          return { label: 'Closed', variant: 'neutral' };
        default:
          return { label: status, variant: 'neutral' };
      }
    }
    
    // For lead status
    if (type === 'lead') {
      switch (status) {
        case 'new':
          return { label: 'New', variant: 'info' };
        case 'contacted':
          return { label: 'Contacted', variant: 'info' };
        case 'qualified':
          return { label: 'Qualified', variant: 'warning' };
        case 'negotiation':
          return { label: 'Negotiation', variant: 'warning' };
        case 'converted':
          return { label: 'Converted', variant: 'success' };
        case 'lost':
          return { label: 'Lost', variant: 'error' };
        default:
          return { label: status, variant: 'neutral' };
      }
    }
    
    // For document status
    if (type === 'document') {
      switch (status) {
        case 'pending':
          return { label: 'Pending', variant: 'warning' };
        case 'verified':
          return { label: 'Verified', variant: 'success' };
        case 'rejected':
          return { label: 'Rejected', variant: 'error' };
        default:
          return { label: status, variant: 'neutral' };
      }
    }
    
    // Default for custom statuses
    return { label: status, variant: 'neutral' };
  };
  
  const { label, variant } = getStatusConfig();
  
  // Size variants
  const sizeClasses = {
    small: 'px-1.5 py-0.5 text-xs',
    medium: 'px-2.5 py-0.5 text-xs',
    large: 'px-3 py-1 text-sm',
  };
  
  // Variant styles (using Tailwind classes)
  const variantClasses = {
    success: 'bg-success bg-opacity-10 text-success',
    warning: 'bg-warning bg-opacity-10 text-warning',
    error: 'bg-error bg-opacity-10 text-error',
    info: 'bg-brand-blue bg-opacity-10 text-brand-blue',
    neutral: 'bg-gray bg-opacity-10 text-gray',
  };
  
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${sizeClasses[size]} ${variantClasses[variant]}`}>
      {/* Add visual dot indicator */}
      <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${variantClasses[variant].replace('bg-opacity-10', '')} ${variantClasses[variant].replace('text-', 'bg-')}`}></span>
      {label}
    </span>
  );
};

export default StatusBadge;