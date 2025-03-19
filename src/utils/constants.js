// Business Options Platform Constants

// Collection names
export const COLLECTIONS = {
    USERS: 'Users',
    LISTINGS: 'Listings',
    ADVISORS: 'Advisors',
    LEADS: 'Leads',
    INSTA_APPLY: 'InstaApply',
    INDUSTRIES: 'Industries',
    LOCATIONS: 'Locations',
    DOCUMENTS: 'Documents',
    REVIEWS: 'Reviews',
    PLANS: 'Plans',
    PAGES: 'Pages',
    BLOGS: 'Blogs',
    FAQS: 'FAQs',
    TESTIMONIALS: 'Testimonials',
    MEDIA: 'Media',
    ANALYTICS: 'Analytics',
    SETTINGS: 'Settings',
    LOGS: 'Logs'
  };
  
  // Storage paths
  export const STORAGE_PATHS = {
    PROFILE_IMAGES: 'profile-images',
    LISTING_IMAGES: 'listing-images',
    DOCUMENTS: 'documents',
    BLOG_IMAGES: 'blog-images',
    MEDIA_LIBRARY: 'media-library'
  };
  
  // User roles
  export const USER_ROLES = {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    ADVISOR: 'advisor',
    USER: 'user'
  };
  
  // User status
  export const USER_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    DISABLED: 'disabled'
  };
  
  // Listing types
  export const LISTING_TYPES = {
    BUSINESS: 'business',
    FRANCHISE: 'franchise',
    STARTUP: 'startup',
    INVESTOR: 'investor',
    DIGITAL_ASSET: 'digital_asset'
  };
  
  // Listing status
  export const LISTING_STATUS = {
    DRAFT: 'draft',
    PENDING: 'pending',
    PUBLISHED: 'published',
    REJECTED: 'rejected',
    ARCHIVED: 'archived'
  };
  
  // Plan types
  export const PLAN_TYPES = {
    FREE: 'Free',
    BASIC: 'Basic',
    ADVANCED: 'Advanced',
    PREMIUM: 'Premium',
    PLATINUM: 'Platinum'
  };
  
  // Application status (Insta Apply)
  export const APPLICATION_STATUS = {
    NEW: 'new',
    CONTACTED: 'contacted',
    CONVERTED: 'converted',
    CLOSED: 'closed'
  };
  
  // Lead status
  export const LEAD_STATUS = {
    NEW: 'new',
    CONTACTED: 'contacted',
    QUALIFIED: 'qualified',
    NEGOTIATION: 'negotiation',
    CONVERTED: 'converted',
    LOST: 'lost'
  };
  
  // Document verification status
  export const DOCUMENT_STATUS = {
    PENDING: 'pending',
    VERIFIED: 'verified',
    REJECTED: 'rejected'
  };
  
  // Common business types
  export const BUSINESS_TYPES = [
    'Retail',
    'Manufacturing',
    'Service',
    'Distribution',
    'F&B',
    'IT',
    'Healthcare',
    'Education',
    'E-commerce',
    'Hospitality',
    'Real Estate',
    'Construction',
    'Professional Services',
    'Entertainment',
    'Other'
  ];
  
  // Common entity types
  export const ENTITY_TYPES = [
    'Sole Proprietorship',
    'Partnership',
    'LLC',
    'Private Limited',
    'LLP',
    'Corporation',
    'Other'
  ];
  
  // Common franchise types
  export const FRANCHISE_TYPES = [
    'Food & Beverage',
    'Retail',
    'Service',
    'Education',
    'Healthcare',
    'Automotive',
    'Cleaning',
    'Beauty & Wellness',
    'Home Services',
    'Other'
  ];
  
  // Startup development stages
  export const STARTUP_STAGES = [
    'Idea',
    'MVP',
    'Pre-seed',
    'Seed',
    'Series A',
    'Series B+',
    'Growth',
    'Maturity'
  ];
  
  // Investor types
  export const INVESTOR_TYPES = [
    'Angel',
    'Venture Capital',
    'Private Equity',
    'Family Office',
    'Corporate',
    'Individual',
    'Accelerator',
    'Incubator',
    'Other'
  ];
  
  // Digital asset types
  export const DIGITAL_ASSET_TYPES = [
    'Website',
    'E-commerce Store',
    'Blog',
    'Mobile App',
    'SaaS',
    'Online Community',
    'Domain Portfolio',
    'Other'
  ];
  
  // Validation constants
  export const VALIDATION = {
    LISTING_NAME_MIN: 3,
    LISTING_NAME_MAX: 100,
    DESCRIPTION_MIN: 100,
    DESCRIPTION_MAX: 5000,
    MIN_IMAGES: 3,
    MAX_IMAGES: 10,
    MAX_IMAGE_SIZE: 5242880, // 5MB
    MIN_IMAGE_WIDTH: 800,
    MIN_IMAGE_HEIGHT: 600
  };
  
  // Time ranges
  export const TIME_RANGES = {
    TODAY: 'today',
    LAST_7_DAYS: 'last7Days',
    LAST_30_DAYS: 'last30Days',
    LAST_QUARTER: 'lastQuarter',
    LAST_YEAR: 'lastYear',
    CUSTOM: 'custom'
  };
  
  // Countries with states
  export const COUNTRIES = {
    INDIA: 'India',
    USA: 'United States',
    UK: 'United Kingdom',
    CANADA: 'Canada',
    AUSTRALIA: 'Australia'
  };
  
  // Indian states
  export const INDIAN_STATES = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'
  ];
  
  // Permissions structure
  export const PERMISSIONS = {
    USERS: {
      VIEW: 'view',
      CREATE: 'create',
      EDIT: 'edit',
      DELETE: 'delete'
    },
    LISTINGS: {
      VIEW: 'view',
      CREATE: 'create',
      EDIT: 'edit',
      DELETE: 'delete',
      APPROVE: 'approve'
    },
    CONTENT: {
      VIEW: 'view',
      CREATE: 'create',
      EDIT: 'edit',
      DELETE: 'delete'
    },
    SETTINGS: {
      VIEW: 'view',
      EDIT: 'edit'
    },
    ANALYTICS: {
      VIEW: 'view'
    },
    ADVISORS: {
      VIEW: 'view',
      CREATE: 'create',
      EDIT: 'edit',
      DELETE: 'delete'
    },
    INSTAPPLY: {
      VIEW: 'view',
      PROCESS: 'process',
      DELETE: 'delete'
    }
  };