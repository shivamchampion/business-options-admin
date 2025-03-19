/**
 * Business Options Platform Constants
 * Comprehensive constants file containing predefined options for all forms and services
 */

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
  
  // Listing types (enum and UI options)
  export const LISTING_TYPES_ENUM = {
    BUSINESS: 'business',
    FRANCHISE: 'franchise',
    STARTUP: 'startup',
    INVESTOR: 'investor',
    DIGITAL_ASSET: 'digital_asset'
  };
  
  export const LISTING_TYPES = [
    { value: LISTING_TYPES_ENUM.BUSINESS, label: 'Business', icon: '💼', description: 'Established businesses for sale' },
    { value: LISTING_TYPES_ENUM.FRANCHISE, label: 'Franchise', icon: '🏪', description: 'Franchise opportunities & licenses' },
    { value: LISTING_TYPES_ENUM.STARTUP, label: 'Startup', icon: '🚀', description: 'Early-stage ventures for investment' },
    { value: LISTING_TYPES_ENUM.INVESTOR, label: 'Investor', icon: '💰', description: 'Investors seeking opportunities' },
    { value: LISTING_TYPES_ENUM.DIGITAL_ASSET, label: 'Digital Asset', icon: '💻', description: 'Websites, apps, and online businesses' },
  ];
  
  // Create a map for quick lookup
  export const LISTING_TYPES_MAP = LISTING_TYPES.reduce((acc, type) => {
    acc[type.value] = type.label;
    return acc;
  }, {});
  
  // Listing status
  export const LISTING_STATUS = {
    DRAFT: 'draft',
    PENDING: 'pending',
    PUBLISHED: 'published',
    REJECTED: 'rejected',
    ARCHIVED: 'archived'
  };
  
  // Plan types (enum and UI options)
  export const PLAN_TYPES = {
    FREE: 'free',
    BASIC: 'basic',
    ADVANCED: 'advanced',
    PREMIUM: 'premium',
    PLATINUM: 'platinum'
  };
  
  export const PLANS = [
    { value: PLAN_TYPES.FREE, label: 'Free' },
    { value: PLAN_TYPES.BASIC, label: 'Basic' },
    { value: PLAN_TYPES.ADVANCED, label: 'Advanced' },
    { value: PLAN_TYPES.PREMIUM, label: 'Premium' },
    { value: PLAN_TYPES.PLATINUM, label: 'Platinum' },
  ];
  
  // Create a map for quick lookup
  export const PLANS_MAP = PLANS.reduce((acc, plan) => {
    acc[plan.value] = plan.label;
    return acc;
  }, {});
  
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
  
  // Industries
  export const INDUSTRIES = [
    { value: 'agriculture', label: 'Agriculture & Farming' },
    { value: 'automotive', label: 'Automotive & Transport' },
    { value: 'banking', label: 'Banking & Financial Services' },
    { value: 'beauty', label: 'Beauty & Wellness' },
    { value: 'construction', label: 'Construction & Real Estate' },
    { value: 'education', label: 'Education & Training' },
    { value: 'entertainment', label: 'Entertainment & Recreation' },
    { value: 'food_beverage', label: 'Food & Beverage' },
    { value: 'healthcare', label: 'Healthcare & Medical' },
    { value: 'hospitality', label: 'Hospitality & Tourism' },
    { value: 'it', label: 'IT & Technology' },
    { value: 'manufacturing', label: 'Manufacturing & Production' },
    { value: 'media', label: 'Media & Communications' },
    { value: 'professional_services', label: 'Professional Services' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'telecom', label: 'Telecom & Internet' },
    { value: 'logistics', label: 'Transportation & Logistics' },
    { value: 'others', label: 'Others' },
  ];
  
  // Create a map for quick lookup
  export const INDUSTRIES_MAP = INDUSTRIES.reduce((acc, industry) => {
    acc[industry.value] = industry.label;
    return acc;
  }, {});
  
  // Countries
  export const COUNTRIES_ENUM = {
    INDIA: 'India',
    USA: 'United States',
    UK: 'United Kingdom',
    CANADA: 'Canada',
    AUSTRALIA: 'Australia'
  };
  
  export const COUNTRIES = [
    { value: COUNTRIES_ENUM.INDIA, label: 'India' },
    { value: COUNTRIES_ENUM.USA, label: 'United States' },
    { value: COUNTRIES_ENUM.UK, label: 'United Kingdom' },
    { value: COUNTRIES_ENUM.AUSTRALIA, label: 'Australia' },
    { value: COUNTRIES_ENUM.CANADA, label: 'Canada' },
    { value: 'Singapore', label: 'Singapore' },
    { value: 'UAE', label: 'United Arab Emirates' },
    { value: 'Other', label: 'Other' },
  ];
  
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
  
  // States by country mapping
  export const STATES_BY_COUNTRY = {
    [COUNTRIES_ENUM.INDIA]: INDIAN_STATES.map(state => ({ value: state, label: state })),
    [COUNTRIES_ENUM.USA]: [
      { value: 'AL', label: 'Alabama' },
      { value: 'AK', label: 'Alaska' },
      { value: 'AZ', label: 'Arizona' },
      { value: 'CA', label: 'California' },
      { value: 'CO', label: 'Colorado' },
      { value: 'FL', label: 'Florida' },
      { value: 'GA', label: 'Georgia' },
      { value: 'NY', label: 'New York' },
      { value: 'TX', label: 'Texas' },
      { value: 'WA', label: 'Washington' },
      // Add more US states as needed
    ],
    // Add more countries as needed
  };
  
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
  
  // Business specific constants
  export const BUSINESS_TYPES_ENUM = [
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
  
  export const BUSINESS_TYPES = [
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'service', label: 'Service' },
    { value: 'food_beverage', label: 'Food & Beverage' },
    { value: 'distribution', label: 'Distribution' },
    { value: 'it', label: 'IT & Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'construction', label: 'Construction' },
    { value: 'hospitality', label: 'Hospitality' },
    { value: 'education', label: 'Education' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'logistics', label: 'Logistics & Transportation' },
    { value: 'others', label: 'Others' },
  ];
  
  export const ENTITY_TYPES_ENUM = [
    'Sole Proprietorship',
    'Partnership',
    'LLC',
    'Private Limited',
    'LLP',
    'Corporation',
    'Other'
  ];
  
  export const ENTITY_TYPES = [
    { value: 'sole_proprietorship', label: 'Sole Proprietorship' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'llp', label: 'Limited Liability Partnership (LLP)' },
    { value: 'private_limited', label: 'Private Limited Company' },
    { value: 'corporation', label: 'Corporation' },
    { value: 'others', label: 'Others' },
  ];
  
  export const LOCATION_TYPES = [
    { value: 'leased_commercial', label: 'Leased Commercial' },
    { value: 'owned_property', label: 'Owned Property' },
    { value: 'home_based', label: 'Home-based' },
    { value: 'virtual', label: 'Virtual' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'others', label: 'Others' },
  ];
  
  export const REVENUE_TRENDS = [
    { value: 'growing', label: 'Growing (>10%)' },
    { value: 'stable', label: 'Stable (±10%)' },
    { value: 'declining', label: 'Declining (<-10%)' },
  ];
  
  // Franchise specific constants
  export const FRANCHISE_TYPES_ENUM = [
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
  
  export const FRANCHISE_TYPES = [
    { value: 'food_beverage', label: 'Food & Beverage' },
    { value: 'retail', label: 'Retail' },
    { value: 'education', label: 'Education & Training' },
    { value: 'service', label: 'Service-based' },
    { value: 'health_wellness', label: 'Health & Wellness' },
    { value: 'beauty', label: 'Beauty & Salon' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'convenience', label: 'Convenience & Grocery' },
    { value: 'clothing', label: 'Clothing & Fashion' },
    { value: 'home_services', label: 'Home Services' },
    { value: 'business_services', label: 'Business Services' },
    { value: 'others', label: 'Others' },
  ];
  
  export const AVAILABLE_TERRITORIES = [
    { value: 'north_india', label: 'North India' },
    { value: 'south_india', label: 'South India' },
    { value: 'east_india', label: 'East India' },
    { value: 'west_india', label: 'West India' },
    { value: 'central_india', label: 'Central India' },
    { value: 'metro_cities', label: 'Major Metro Cities' },
    { value: 'tier_1_cities', label: 'Tier 1 Cities' },
    { value: 'tier_2_cities', label: 'Tier 2 Cities' },
    { value: 'rural', label: 'Rural Markets' },
    { value: 'pan_india', label: 'Pan India' },
    { value: 'international', label: 'International Markets' },
  ];
  
  // Startup specific constants
  export const STARTUP_STAGES_ENUM = [
    'Idea',
    'MVP',
    'Pre-seed',
    'Seed',
    'Series A',
    'Series B+',
    'Growth',
    'Maturity'
  ];
  
  export const DEVELOPMENT_STAGES = [
    { value: 'idea', label: 'Idea Stage' },
    { value: 'mvp', label: 'Minimum Viable Product (MVP)' },
    { value: 'pre_seed', label: 'Pre-seed' },
    { value: 'seed', label: 'Seed' },
    { value: 'series_a', label: 'Series A' },
    { value: 'series_b_plus', label: 'Series B+' },
  ];
  
  export const PRODUCT_STAGES = [
    { value: 'concept', label: 'Concept' },
    { value: 'prototype', label: 'Prototype' },
    { value: 'mvp', label: 'Minimum Viable Product' },
    { value: 'beta', label: 'Beta' },
    { value: 'launched', label: 'Launched' },
    { value: 'scaling', label: 'Scaling' },
  ];
  
  export const INTELLECTUAL_PROPERTY_TYPES = [
    { value: 'patents', label: 'Patents' },
    { value: 'trademarks', label: 'Trademarks' },
    { value: 'copyrights', label: 'Copyrights' },
    { value: 'trade_secrets', label: 'Trade Secrets' },
    { value: 'design_rights', label: 'Design Rights' },
    { value: 'domain_names', label: 'Domain Names' },
  ];
  
  export const FUNDING_STAGES = [
    { value: 'bootstrapped', label: 'Bootstrapped' },
    { value: 'pre_seed', label: 'Pre-seed' },
    { value: 'seed', label: 'Seed' },
    { value: 'series_a', label: 'Series A' },
    { value: 'series_b', label: 'Series B' },
    { value: 'series_c_plus', label: 'Series C+' },
  ];
  
  // Investor specific constants
  export const INVESTOR_TYPES_ENUM = [
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
  
  export const INVESTOR_TYPES = [
    { value: 'angel', label: 'Angel Investor' },
    { value: 'venture_capital', label: 'Venture Capital' },
    { value: 'private_equity', label: 'Private Equity' },
    { value: 'family_office', label: 'Family Office' },
    { value: 'corporate', label: 'Corporate Investor' },
    { value: 'individual', label: 'Individual Investor' },
    { value: 'accelerator', label: 'Accelerator' },
    { value: 'incubator', label: 'Incubator' },
    { value: 'other', label: 'Other' },
  ];
  
  export const INVESTMENT_ROUNDS = [
    { value: 'pre_seed', label: 'Pre-seed' },
    { value: 'seed', label: 'Seed' },
    { value: 'series_a', label: 'Series A' },
    { value: 'series_b', label: 'Series B' },
    { value: 'series_c_plus', label: 'Series C+' },
    { value: 'growth', label: 'Growth' },
    { value: 'late_stage', label: 'Late Stage' },
  ];
  
  export const BUSINESS_STAGES = [
    { value: 'idea', label: 'Idea Stage' },
    { value: 'pre_revenue', label: 'Pre-revenue' },
    { value: 'early_revenue', label: 'Early Revenue' },
    { value: 'growth', label: 'Growth Stage' },
    { value: 'mature', label: 'Mature Business' },
    { value: 'turnaround', label: 'Turnaround Opportunity' },
  ];
  
  export const GEOGRAPHIC_REGIONS = [
    { value: 'north_india', label: 'North India' },
    { value: 'south_india', label: 'South India' },
    { value: 'east_india', label: 'East India' },
    { value: 'west_india', label: 'West India' },
    { value: 'central_india', label: 'Central India' },
    { value: 'pan_india', label: 'All India' },
    { value: 'southeast_asia', label: 'Southeast Asia' },
    { value: 'middle_east', label: 'Middle East' },
    { value: 'north_america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'global', label: 'Global' },
  ];
  
  export const BOARD_INVOLVEMENT_OPTIONS = [
    { value: 'observer', label: 'Observer' },
    { value: 'member', label: 'Board Member' },
    { value: 'chairman', label: 'Chairman' },
    { value: 'none', label: 'No Board Involvement' },
  ];
  
  // Digital Asset specific constants
  export const DIGITAL_ASSET_TYPES_ENUM = [
    'Website',
    'E-commerce Store',
    'Blog',
    'Mobile App',
    'SaaS',
    'Online Community',
    'Domain Portfolio',
    'Other'
  ];
  
  export const DIGITAL_ASSET_TYPES = [
    { value: 'website', label: 'Website' },
    { value: 'ecommerce', label: 'E-commerce Store' },
    { value: 'blog', label: 'Blog' },
    { value: 'mobile_app', label: 'Mobile App' },
    { value: 'saas', label: 'SaaS Platform' },
    { value: 'online_community', label: 'Online Community' },
    { value: 'marketplace', label: 'Marketplace' },
    { value: 'content_site', label: 'Content Site' },
    { value: 'domain_portfolio', label: 'Domain Portfolio' },
    { value: 'social_media', label: 'Social Media Asset' },
    { value: 'others', label: 'Others' },
  ];
  
  export const EASE_OF_MANAGEMENT_OPTIONS = [
    { value: 'passive', label: 'Passive (0-5 hrs/week)' },
    { value: 'semi-passive', label: 'Semi-passive (5-20 hrs/week)' },
    { value: 'active', label: 'Active (20+ hrs/week)' },
  ];
  
  export const ASSET_TRANSFER_METHODS = [
    { value: 'domain_transfer', label: 'Domain Transfer' },
    { value: 'company_sale', label: 'Company Sale' },
    { value: 'asset_sale', label: 'Asset Sale' },
    { value: 'content_transfer', label: 'Content Transfer' },
    { value: 'account_transfer', label: 'Account Transfer' },
    { value: 'others', label: 'Others' },
  ];
  
  // Document category and type mapping
  export const DOCUMENT_CATEGORIES_BY_TYPE = {
    'business': [
      { value: 'essential', label: 'Essential Documents' },
      { value: 'financial', label: 'Financial Documents' },
      { value: 'operational', label: 'Operational Documents' },
      { value: 'legal', label: 'Legal Documents' },
    ],
    'franchise': [
      { value: 'essential', label: 'Essential Documents' },
      { value: 'financial', label: 'Financial Documents' },
      { value: 'operational', label: 'Operational Documents' },
      { value: 'legal', label: 'Legal Documents' },
      { value: 'marketing', label: 'Marketing Materials' },
    ],
    'startup': [
      { value: 'essential', label: 'Essential Documents' },
      { value: 'financial', label: 'Financial Documents' },
      { value: 'product', label: 'Product Documents' },
      { value: 'team', label: 'Team Documents' },
      { value: 'market', label: 'Market Documents' },
    ],
    'investor': [
      { value: 'essential', label: 'Essential Documents' },
      { value: 'credentials', label: 'Credential Documents' },
      { value: 'process', label: 'Process Documents' },
      { value: 'track_record', label: 'Track Record Documents' },
    ],
    'digital_asset': [
      { value: 'essential', label: 'Essential Documents' },
      { value: 'verification', label: 'Verification Documents' },
      { value: 'technical', label: 'Technical Documents' },
      { value: 'financial', label: 'Financial Documents' },
      { value: 'operational', label: 'Operational Documents' },
    ],
  };
  
  export const DOCUMENT_TYPES_BY_CATEGORY = {
    'business': {
      'essential': [
        { value: 'business_registration', label: 'Business Registration' },
        { value: 'financial_summary', label: 'Financial Summary' },
        { value: 'business_profile', label: 'Business Profile' },
        { value: 'ownership_proof', label: 'Ownership Proof' },
      ],
      'financial': [
        { value: 'profit_loss', label: 'Profit & Loss Statement' },
        { value: 'balance_sheet', label: 'Balance Sheet' },
        { value: 'tax_returns', label: 'Tax Returns' },
        { value: 'bank_statements', label: 'Bank Statements' },
        { value: 'sales_reports', label: 'Sales Reports' },
      ],
      'operational': [
        { value: 'inventory_list', label: 'Inventory List' },
        { value: 'equipment_list', label: 'Equipment List' },
        { value: 'employee_details', label: 'Employee Details' },
        { value: 'operations_manual', label: 'Operations Manual' },
        { value: 'vendor_contracts', label: 'Vendor Contracts' },
      ],
      'legal': [
        { value: 'lease_agreement', label: 'Lease Agreement' },
        { value: 'licenses_permits', label: 'Licenses & Permits' },
        { value: 'contracts', label: 'Contracts & Agreements' },
        { value: 'intellectual_property', label: 'Intellectual Property' },
        { value: 'legal_disputes', label: 'Legal Disputes' },
      ],
    },
    'franchise': {
      'essential': [
        { value: 'franchise_disclosure', label: 'Franchise Disclosure Document' },
        { value: 'franchise_agreement', label: 'Franchise Agreement Sample' },
        { value: 'company_profile', label: 'Company Profile' },
        { value: 'brand_overview', label: 'Brand Overview' },
      ],
      'financial': [
        { value: 'unit_economics', label: 'Unit Economics Model' },
        { value: 'investment_breakdown', label: 'Investment Breakdown' },
        { value: 'financial_projections', label: 'Financial Projections' },
        { value: 'roi_analysis', label: 'ROI Analysis' },
      ],
      'operational': [
        { value: 'training_overview', label: 'Training Program Overview' },
        { value: 'support_structure', label: 'Support Structure' },
        { value: 'operations_manual', label: 'Operations Manual Sample' },
        { value: 'brand_standards', label: 'Brand Standards' },
      ],
      'legal': [
        { value: 'territory_map', label: 'Territory Map' },
        { value: 'regulatory_compliance', label: 'Regulatory Compliance' },
        { value: 'trademark_registration', label: 'Trademark Registration' },
        { value: 'certification', label: 'Certifications' },
      ],
      'marketing': [
        { value: 'marketing_materials', label: 'Marketing Materials' },
        { value: 'branding_guidelines', label: 'Branding Guidelines' },
        { value: 'promotional_campaigns', label: 'Promotional Campaigns' },
        { value: 'customer_testimonials', label: 'Customer Testimonials' },
      ],
    },
    'startup': {
      'essential': [
        { value: 'pitch_deck', label: 'Pitch Deck' },
        { value: 'business_plan', label: 'Business Plan' },
        { value: 'executive_summary', label: 'Executive Summary' },
        { value: 'company_registration', label: 'Company Registration' },
      ],
      'financial': [
        { value: 'financial_projections', label: 'Financial Projections' },
        { value: 'cap_table', label: 'Cap Table' },
        { value: 'financial_history', label: 'Financial History' },
        { value: 'funding_history', label: 'Funding History' },
      ],
      'product': [
        { value: 'product_demo', label: 'Product Demo' },
        { value: 'technical_architecture', label: 'Technical Architecture' },
        { value: 'product_roadmap', label: 'Product Roadmap' },
        { value: 'user_metrics', label: 'User Metrics' },
      ],
      'team': [
        { value: 'team_profiles', label: 'Team Profiles' },
        { value: 'org_chart', label: 'Organizational Chart' },
        { value: 'advisors', label: 'Advisors & Mentors' },
        { value: 'employment_agreements', label: 'Employment Agreements' },
      ],
      'market': [
        { value: 'market_research', label: 'Market Research' },
        { value: 'competitor_analysis', label: 'Competitor Analysis' },
        { value: 'traction_metrics', label: 'Traction Metrics' },
        { value: 'customer_testimonials', label: 'Customer Testimonials' },
      ],
    },
    'investor': {
      'essential': [
        { value: 'investment_thesis', label: 'Investment Thesis' },
        { value: 'portfolio_summary', label: 'Portfolio Summary' },
        { value: 'investment_criteria', label: 'Investment Criteria' },
        { value: 'fund_details', label: 'Fund Details' },
      ],
      'credentials': [
        { value: 'investor_bio', label: 'Investor Bio' },
        { value: 'professional_credentials', label: 'Professional Credentials' },
        { value: 'regulatory_approvals', label: 'Regulatory Approvals' },
        { value: 'testimonials', label: 'Testimonials & References' },
      ],
      'process': [
        { value: 'investment_process', label: 'Investment Process' },
        { value: 'due_diligence', label: 'Due Diligence Process' },
        { value: 'term_sheet', label: 'Term Sheet Template' },
        { value: 'post_investment', label: 'Post-Investment Support' },
      ],
      'track_record': [
        { value: 'success_cases', label: 'Success Case Studies' },
        { value: 'performance_data', label: 'Performance Data' },
        { value: 'exit_history', label: 'Exit History' },
        { value: 'industry_reports', label: 'Industry Reports' },
      ],
    },
    'digital_asset': {
      'essential': [
        { value: 'asset_overview', label: 'Asset Overview' },
        { value: 'screenshot_gallery', label: 'Screenshot Gallery' },
        { value: 'business_model', label: 'Business Model' },
        { value: 'growth_potential', label: 'Growth Potential' },
      ],
      'verification': [
        { value: 'traffic_analytics', label: 'Traffic Analytics' },
        { value: 'revenue_proof', label: 'Revenue Proof' },
        { value: 'income_reports', label: 'Income Reports' },
        { value: 'account_access', label: 'Account Access Verification' },
      ],
      'technical': [
        { value: 'domain_verification', label: 'Domain Verification' },
        { value: 'technical_specs', label: 'Technical Specifications' },
        { value: 'code_review', label: 'Code Review Summary' },
        { value: 'security_audit', label: 'Security Audit' },
      ],
      'financial': [
        { value: 'profit_loss', label: 'Profit & Loss Statement' },
        { value: 'revenue_breakdown', label: 'Revenue Breakdown' },
        { value: 'expense_details', label: 'Expense Details' },
        { value: 'monetization_details', label: 'Monetization Details' },
      ],
      'operational': [
        { value: 'operations_guide', label: 'Operations Guide' },
        { value: 'sop', label: 'Standard Operating Procedures' },
        { value: 'content_strategy', label: 'Content Strategy' },
        { value: 'transfer_plan', label: 'Transfer Plan' },
      ],
    },
  };