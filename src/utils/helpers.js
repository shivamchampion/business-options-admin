// Generate a random ID
export const generateId = (length = 8) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return result;
  };
  
  // Generate a slug from a string
  export const generateSlug = (text) => {
    if (!text) return '';
    
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  };
  
  // Delay function (useful for simulating API calls in development)
  export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  // Group array by key
  export const groupBy = (array, key) => {
    return array.reduce((result, item) => {
      const groupKey = typeof key === 'function' ? key(item) : item[key];
      
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      
      result[groupKey].push(item);
      return result;
    }, {});
  };
  
  // Sort array by key
  export const sortBy = (array, key, direction = 'asc') => {
    if (!array || !Array.isArray(array)) return [];
    
    const sortedArray = [...array];
    
    return sortedArray.sort((a, b) => {
      let valueA = typeof key === 'function' ? key(a) : a[key];
      let valueB = typeof key === 'function' ? key(b) : b[key];
      
      // Handle undefined values
      if (valueA === undefined) return direction === 'asc' ? -1 : 1;
      if (valueB === undefined) return direction === 'asc' ? 1 : -1;
      
      // Handle dates
      if (valueA instanceof Date && valueB instanceof Date) {
        return direction === 'asc' 
          ? valueA.getTime() - valueB.getTime() 
          : valueB.getTime() - valueA.getTime();
      }
      
      // Handle strings
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return direction === 'asc' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }
      
      // Handle numbers
      return direction === 'asc' ? valueA - valueB : valueB - valueA;
    });
  };
  
  // Filter array by search term
  export const filterBySearchTerm = (array, searchTerm, fields = []) => {
    if (!array || !Array.isArray(array) || !searchTerm) return array;
    
    const term = searchTerm.toLowerCase();
    
    return array.filter(item => {
      return fields.some(field => {
        const value = item[field];
        
        if (!value) return false;
        
        if (typeof value === 'string') {
          return value.toLowerCase().includes(term);
        }
        
        if (typeof value === 'number') {
          return value.toString().includes(term);
        }
        
        return false;
      });
    });
  };
  
  // Calculate average rating
  export const calculateAverageRating = (ratings) => {
    if (!ratings || !Array.isArray(ratings) || ratings.length === 0) return 0;
    
    const sum = ratings.reduce((total, rating) => total + rating, 0);
    return Math.round((sum / ratings.length) * 10) / 10; // Round to 1 decimal place
  };
  
  // Calculate percentage
  export const calculatePercentage = (value, total) => {
    if (!value || !total) return 0;
    
    return Math.round((value / total) * 100);
  };
  
  // Format Firestore document
  export const formatFirestoreDoc = (doc) => {
    if (!doc || !doc.exists) return null;
    
    return {
      id: doc.id,
      ...doc.data()
    };
  };
  
  // Format Firestore query snapshot
  export const formatFirestoreQuerySnapshot = (snapshot) => {
    if (!snapshot) return [];
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  };
  
  // Parse URL query parameters
  export const parseQueryParams = (queryString) => {
    const params = new URLSearchParams(queryString);
    const result = {};
    
    for (const [key, value] of params.entries()) {
      result[key] = value;
    }
    
    return result;
  };
  
  // Build URL query string
  export const buildQueryString = (params) => {
    if (!params || typeof params !== 'object') return '';
    
    const urlParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        urlParams.append(key, value);
      }
    });
    
    const queryString = urlParams.toString();
    return queryString ? `?${queryString}` : '';
  };
  
  // Deep clone an object
  export const deepClone = (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    
    return JSON.parse(JSON.stringify(obj));
  };
  
  // Merge objects deeply
  export const deepMerge = (target, ...sources) => {
    if (!sources.length) return target;
    
    const source = sources.shift();
    
    if (source === undefined) return target;
    
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          deepMerge(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      });
    }
    
    return deepMerge(target, ...sources);
  };
  
  // Check if value is an object
  export const isObject = (item) => {
    return item && typeof item === 'object' && !Array.isArray(item);
  };
  
  // Get file extension
  export const getFileExtension = (filename) => {
    if (!filename) return '';
    
    return filename.split('.').pop().toLowerCase();
  };
  
  // Generate breadcrumbs from path
  export const generateBreadcrumbs = (path) => {
    if (!path) return [];
    
    const parts = path.split('/').filter(Boolean);
    const breadcrumbs = [];
    let currentPath = '';
    
    parts.forEach((part, index) => {
      currentPath += `/${part}`;
      
      // Skip IDs
      if (part.match(/^[0-9a-fA-F]{24}$/) || part.match(/^[0-9a-fA-F-]{36}$/)) {
        return;
      }
      
      // Format part for display
      const label = part
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        path: currentPath,
        label,
        isLast: index === parts.length - 1
      });
    });
    
    return breadcrumbs;
  };
  
  // Format JSON for display
  export const formatJSON = (json) => {
    if (typeof json !== 'object') return '';
    
    return JSON.stringify(json, null, 2);
  };
  
  // Convert object to array
  export const objectToArray = (obj) => {
    if (!obj || typeof obj !== 'object') return [];
    
    return Object.entries(obj).map(([key, value]) => ({
      key,
      ...value
    }));
  };