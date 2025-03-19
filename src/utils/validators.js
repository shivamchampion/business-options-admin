import { VALIDATION } from './constants';

// Validate email format
export const isValidEmail = (email) => {
  if (!email) return false;
  
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

// Validate phone number (Indian format)
export const isValidIndianPhone = (phone) => {
  if (!phone) return false;
  
  // Remove non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a valid Indian mobile number (10 digits, starting with 6, 7, 8, or 9)
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(cleaned);
};

// Validate password strength
export const isStrongPassword = (password) => {
  if (!password) return false;
  
  // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Validate listing name
export const isValidListingName = (name) => {
  if (!name) return false;
  
  return name.length >= VALIDATION.LISTING_NAME_MIN && name.length <= VALIDATION.LISTING_NAME_MAX;
};

// Validate description
export const isValidDescription = (description) => {
  if (!description) return false;
  
  return description.length >= VALIDATION.DESCRIPTION_MIN && description.length <= VALIDATION.DESCRIPTION_MAX;
};

// Validate PAN number (Indian Permanent Account Number)
export const isValidPAN = (pan) => {
  if (!pan) return false;
  
  // PAN format: 5 alphabets, 4 numbers, 1 alphabet
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
};

// Validate GST number (Indian Goods and Services Tax Number)
export const isValidGST = (gst) => {
  if (!gst) return false;
  
  // GST format: 2 digit state code, 10 digit PAN, 1 digit entity number, 1 digit check sum, Z by default
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstRegex.test(gst);
};

// Validate Indian postal code (PIN code)
export const isValidPincode = (pincode) => {
  if (!pincode) return false;
  
  // Indian PIN code: 6 digits
  const pincodeRegex = /^[1-9][0-9]{5}$/;
  return pincodeRegex.test(pincode);
};

// Validate URL
export const isValidURL = (url) => {
  if (!url) return false;
  
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

// Validate file type
export const isValidFileType = (file, allowedTypes) => {
  if (!file || !allowedTypes) return false;
  
  return allowedTypes.includes(file.type);
};

// Validate file size
export const isValidFileSize = (file, maxSize = VALIDATION.MAX_IMAGE_SIZE) => {
  if (!file) return false;
  
  return file.size <= maxSize;
};

// Validate image dimensions
export const isValidImageDimensions = async (file, minWidth = VALIDATION.MIN_IMAGE_WIDTH, minHeight = VALIDATION.MIN_IMAGE_HEIGHT) => {
  if (!file || !file.type.startsWith('image/')) return false;
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve(img.width >= minWidth && img.height >= minHeight);
    };
    img.onerror = () => {
      resolve(false);
    };
    img.src = URL.createObjectURL(file);
  });
};

// Validate year (YYYY format)
export const isValidYear = (year) => {
  if (!year) return false;
  
  const currentYear = new Date().getFullYear();
  const yearNumber = parseInt(year, 10);
  
  return !isNaN(yearNumber) && yearNumber >= 1900 && yearNumber <= currentYear;
};

// Validate positive number
export const isPositiveNumber = (value) => {
  if (value === undefined || value === null || value === '') return false;
  
  const number = parseFloat(value);
  return !isNaN(number) && number > 0;
};

// Validate non-negative number
export const isNonNegativeNumber = (value) => {
  if (value === undefined || value === null || value === '') return false;
  
  const number = parseFloat(value);
  return !isNaN(number) && number >= 0;
};

// Validate percentage (0-100)
export const isValidPercentage = (value) => {
  if (value === undefined || value === null || value === '') return false;
  
  const number = parseFloat(value);
  return !isNaN(number) && number >= 0 && number <= 100;
};

// Validate required fields
export const validateRequiredFields = (data, requiredFields) => {
  const errors = {};
  
  requiredFields.forEach(field => {
    if (!data[field]) {
      errors[field] = 'This field is required';
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validate form data with custom validation functions
export const validateFormData = (data, validations) => {
  const errors = {};
  
  Object.entries(validations).forEach(([field, validation]) => {
    if (typeof validation === 'function') {
      const error = validation(data[field], data);
      if (error) {
        errors[field] = error;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};