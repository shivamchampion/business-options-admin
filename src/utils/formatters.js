import { format, formatDistance, formatRelative, isValid } from 'date-fns';

// Format currency with Indian Rupee symbol (₹)
export const formatCurrency = (amount, currency = 'INR') => {
  if (amount === undefined || amount === null) return '';
  
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  return formatter.format(amount);
};

// Format percentage
export const formatPercentage = (value, decimals = 2) => {
  if (value === undefined || value === null) return '';
  
  return `${parseFloat(value).toFixed(decimals)}%`;
};

// Format number with commas (Indian format: 1,00,000)
export const formatNumber = (number) => {
  if (number === undefined || number === null) return '';
  
  return new Intl.NumberFormat('en-IN').format(number);
};

// Format date in various formats
export const formatDate = (date, formatString = 'dd MMM yyyy') => {
  if (!date) return '';
  
  // Convert Firestore timestamp to Date if needed
  const dateObj = date?.toDate ? date.toDate() : new Date(date);
  
  if (!isValid(dateObj)) return '';
  
  return format(dateObj, formatString);
};

// Format time
export const formatTime = (date, formatString = 'hh:mm a') => {
  if (!date) return '';
  
  // Convert Firestore timestamp to Date if needed
  const dateObj = date?.toDate ? date.toDate() : new Date(date);
  
  if (!isValid(dateObj)) return '';
  
  return format(dateObj, formatString);
};

// Format date and time
export const formatDateTime = (date, formatString = 'dd MMM yyyy, hh:mm a') => {
  if (!date) return '';
  
  // Convert Firestore timestamp to Date if needed
  const dateObj = date?.toDate ? date.toDate() : new Date(date);
  
  if (!isValid(dateObj)) return '';
  
  return format(dateObj, formatString);
};

// Format relative time (e.g., "2 hours ago")
export const formatRelativeTime = (date) => {
  if (!date) return '';
  
  // Convert Firestore timestamp to Date if needed
  const dateObj = date?.toDate ? date.toDate() : new Date(date);
  
  if (!isValid(dateObj)) return '';
  
  return formatDistance(dateObj, new Date(), { addSuffix: true });
};

// Format phone number (e.g., +91 98765 43210)
export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  
  // Remove non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // For Indian numbers
  if (cleaned.length === 10) {
    return `+91 ${cleaned.substring(0, 5)} ${cleaned.substring(5)}`;
  }
  
  // For numbers with country code
  if (cleaned.length > 10) {
    const countryCode = cleaned.substring(0, cleaned.length - 10);
    const rest = cleaned.substring(cleaned.length - 10);
    return `+${countryCode} ${rest.substring(0, 5)} ${rest.substring(5)}`;
  }
  
  // Return as is if it doesn't match expected formats
  return phoneNumber;
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
};

// Capitalize first letter of each word
export const capitalizeWords = (text) => {
  if (!text) return '';
  
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Format name (first letter uppercase, rest lowercase)
export const formatName = (firstName, lastName) => {
  const formattedFirst = firstName ? firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase() : '';
  const formattedLast = lastName ? lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase() : '';
  
  return [formattedFirst, formattedLast].filter(Boolean).join(' ');
};

// Get initials from name
export const getInitials = (name) => {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
};

// Format address
export const formatAddress = (address = {}) => {
  const { street, city, state, pincode, country } = address;
  
  return [street, city, state, pincode, country]
    .filter(Boolean)
    .join(', ');
};

// Format listing type for display
export const formatListingType = (type) => {
  if (!type) return '';
  
  const typeMap = {
    'business': 'Business',
    'franchise': 'Franchise',
    'startup': 'Startup',
    'investor': 'Investor',
    'digital_asset': 'Digital Asset'
  };
  
  return typeMap[type] || capitalizeWords(type);
};