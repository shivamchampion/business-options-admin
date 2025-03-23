import React from 'react';
import { 
  Building, 
  Store, 
  Rocket, 
  Wallet, 
  Globe 
} from 'lucide-react';

// Listing Types with icons and descriptions
export const LISTING_TYPES = [
  {
    value: 'business',
    label: 'Business',
    description: 'Established businesses for sale',
    icon: <Building className="h-5 w-5 text-primary" />,
  },
  {
    value: 'franchise',
    label: 'Franchise',
    description: 'Ready-to-start franchise opportunities',
    icon: <Store className="h-5 w-5 text-primary" />,
  },
  {
    value: 'startup',
    label: 'Startup',
    description: 'Early-stage ventures seeking investment',
    icon: <Rocket className="h-5 w-5 text-primary" />,
  },
  {
    value: 'investor',
    label: 'Investor',
    description: 'Investors looking for opportunities',
    icon: <Wallet className="h-5 w-5 text-primary" />,
  },
  {
    value: 'digital_asset',
    label: 'Digital Asset',
    description: 'Websites, apps, and online businesses',
    icon: <Globe className="h-5 w-5 text-primary" />,
  },
];

// Listing Statuses with colors
export const LISTING_STATUSES = [
  {
    value: 'draft',
    label: 'Draft',
    description: 'Work in progress, not visible to others',
    colorClass: 'bg-gray-400',
  },
  {
    value: 'pending',
    label: 'Pending Review',
    description: 'Awaiting admin approval',
    colorClass: 'bg-amber-400',
  },
  {
    value: 'published',
    label: 'Published',
    description: 'Live and visible to all users',
    colorClass: 'bg-green-400',
  },
  {
    value: 'rejected',
    label: 'Rejected',
    description: 'Not approved, requires changes',
    colorClass: 'bg-red-400',
  },
  {
    value: 'archived',
    label: 'Archived',
    description: 'No longer active or visible',
    colorClass: 'bg-gray-600',
  },
];

// Subscription Plan Types with features
export const PLAN_TYPES = [
  {
    value: 'free',
    label: 'Free',
    description: '1 basic listing, 30 days',
    price: '₹0 / month',
    features: [
      '1 Listing',
      '3 Images per listing',
      'No document uploads',
      '30-day listing duration',
    ],
    highlight: false,
  },
  {
    value: 'basic',
    label: 'Basic',
    description: '3 listings, 60 days',
    price: '₹1,999 / month',
    features: [
      '3 Listings',
      '5 Images per listing',
      '2 Document uploads',
      '60-day listing duration',
    ],
    highlight: false,
  },
  {
    value: 'advanced',
    label: 'Advanced',
    description: '5 listings, 90 days',
    price: '₹3,999 / month',
    features: [
      '5 Listings',
      '10 Images per listing',
      '5 Document uploads',
      '90-day listing duration',
    ],
    highlight: true,
  },
  {
    value: 'premium',
    label: 'Premium',
    description: '10 listings, featured status',
    price: '₹7,999 / month',
    features: [
      '10 Listings',
      '15 Images per listing',
      '10 Document uploads',
      'Featured status available',
      '120-day listing duration',
    ],
    highlight: false,
  },
  {
    value: 'platinum',
    label: 'Platinum',
    description: 'Unlimited listings, priority support',
    price: '₹14,999 / month',
    features: [
      'Unlimited Listings',
      'Unlimited Images',
      'Unlimited Document uploads',
      'Featured status included',
      'Priority support',
      'Permanent listings',
    ],
    highlight: false,
  },
];

// Industries data
export const INDUSTRIES = [
  { id: 'retail', name: 'Retail' },
  { id: 'food_beverage', name: 'Food & Beverage' },
  { id: 'manufacturing', name: 'Manufacturing' },
  { id: 'technology', name: 'Technology' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'education', name: 'Education' },
  { id: 'real_estate', name: 'Real Estate' },
  { id: 'hospitality', name: 'Hospitality' },
  { id: 'automotive', name: 'Automotive' },
  { id: 'construction', name: 'Construction' },
  { id: 'finance', name: 'Finance & Banking' },
  { id: 'professional_services', name: 'Professional Services' },
  { id: 'entertainment', name: 'Entertainment & Media' },
  { id: 'transportation', name: 'Transportation & Logistics' },
  { id: 'agriculture', name: 'Agriculture' },
  { id: 'ecommerce', name: 'E-commerce' },
  { id: 'fitness', name: 'Fitness & Wellness' },
  { id: 'beauty', name: 'Beauty & Personal Care' },
  { id: 'home_services', name: 'Home Services' },
  { id: 'travel', name: 'Travel & Tourism' },
];

// Indian States
export const STATES = [
  { code: 'AN', name: 'Andaman and Nicobar Islands' },
  { code: 'AP', name: 'Andhra Pradesh' },
  { code: 'AR', name: 'Arunachal Pradesh' },
  { code: 'AS', name: 'Assam' },
  { code: 'BR', name: 'Bihar' },
  { code: 'CH', name: 'Chandigarh' },
  { code: 'CT', name: 'Chhattisgarh' },
  { code: 'DN', name: 'Dadra and Nagar Haveli' },
  { code: 'DD', name: 'Daman and Diu' },
  { code: 'DL', name: 'Delhi' },
  { code: 'GA', name: 'Goa' },
  { code: 'GJ', name: 'Gujarat' },
  { code: 'HR', name: 'Haryana' },
  { code: 'HP', name: 'Himachal Pradesh' },
  { code: 'JK', name: 'Jammu and Kashmir' },
  { code: 'JH', name: 'Jharkhand' },
  { code: 'KA', name: 'Karnataka' },
  { code: 'KL', name: 'Kerala' },
  { code: 'LA', name: 'Ladakh' },
  { code: 'LD', name: 'Lakshadweep' },
  { code: 'MP', name: 'Madhya Pradesh' },
  { code: 'MH', name: 'Maharashtra' },
  { code: 'MN', name: 'Manipur' },
  { code: 'ML', name: 'Meghalaya' },
  { code: 'MZ', name: 'Mizoram' },
  { code: 'NL', name: 'Nagaland' },
  { code: 'OR', name: 'Odisha' },
  { code: 'PY', name: 'Puducherry' },
  { code: 'PB', name: 'Punjab' },
  { code: 'RJ', name: 'Rajasthan' },
  { code: 'SK', name: 'Sikkim' },
  { code: 'TN', name: 'Tamil Nadu' },
  { code: 'TG', name: 'Telangana' },
  { code: 'TR', name: 'Tripura' },
  { code: 'UP', name: 'Uttar Pradesh' },
  { code: 'UT', name: 'Uttarakhand' },
  { code: 'WB', name: 'West Bengal' },
];

// Sample top cities in India (in a real app, this would be much more comprehensive)
export const CITIES = [
  { id: 'mumbai_mh', name: 'Mumbai', state: 'MH' },
  { id: 'delhi_dl', name: 'New Delhi', state: 'DL' },
  { id: 'bangalore_ka', name: 'Bengaluru', state: 'KA' },
  { id: 'hyderabad_tg', name: 'Hyderabad', state: 'TG' },
  { id: 'chennai_tn', name: 'Chennai', state: 'TN' },
  { id: 'kolkata_wb', name: 'Kolkata', state: 'WB' },
  { id: 'pune_mh', name: 'Pune', state: 'MH' },
  { id: 'ahmedabad_gj', name: 'Ahmedabad', state: 'GJ' },
  { id: 'jaipur_rj', name: 'Jaipur', state: 'RJ' },
  { id: 'lucknow_up', name: 'Lucknow', state: 'UP' },
  { id: 'nagpur_mh', name: 'Nagpur', state: 'MH' },
  { id: 'indore_mp', name: 'Indore', state: 'MP' },
  { id: 'thane_mh', name: 'Thane', state: 'MH' },
  { id: 'gurgaon_hr', name: 'Gurugram', state: 'HR' },
  { id: 'noida_up', name: 'Noida', state: 'UP' },
];

// Business Types
export const BUSINESS_TYPES = [
  { value: 'retail', label: 'Retail Store' },
  { value: 'restaurant', label: 'Restaurant/Cafe' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'service', label: 'Service Business' },
  { value: 'distribution', label: 'Distribution/Wholesale' },
  { value: 'e_commerce', label: 'E-Commerce' },
  { value: 'health_care', label: 'Healthcare' },
  { value: 'educational', label: 'Educational Institution' },
  { value: 'it_company', label: 'IT/Software Company' },
  { value: 'hospitality', label: 'Hotel/Hospitality' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'logistics', label: 'Logistics/Transportation' },
  { value: 'construction', label: 'Construction' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'agriculture', label: 'Agriculture' },
];

// Entity Types
export const ENTITY_TYPES = [
  { value: 'sole_proprietorship', label: 'Sole Proprietorship' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'llp', label: 'Limited Liability Partnership (LLP)' },
  { value: 'private_limited', label: 'Private Limited Company' },
  { value: 'public_limited', label: 'Public Limited Company' },
  { value: 'opc', label: 'One Person Company (OPC)' },
  { value: 'corporation', label: 'Corporation' },
];

// Location Types
export const LOCATION_TYPES = [
  { value: 'leased_commercial', label: 'Leased Commercial Space' },
  { value: 'owned_property', label: 'Owned Property' },
  { value: 'home_based', label: 'Home-Based' },
  { value: 'virtual', label: 'Virtual/Online' },
  { value: 'mobile', label: 'Mobile Business' },
  { value: 'shared_workspace', label: 'Shared Workspace/Coworking' },
  { value: 'mall_kiosk', label: 'Mall/Retail Center Kiosk' },
];

// Revenue Trends
export const REVENUE_TRENDS = [
  { value: 'growing', label: 'Growing (>10%)' },
  { value: 'stable', label: 'Stable (±10%)' },
  { value: 'declining', label: 'Declining (<-10%)' },
];

// Franchise Types
export const FRANCHISE_TYPES = [
  { value: 'food_beverage', label: 'Food & Beverage' },
  { value: 'retail', label: 'Retail' },
  { value: 'education', label: 'Education & Training' },
  { value: 'health_fitness', label: 'Health & Fitness' },
  { value: 'beauty', label: 'Beauty & Wellness' },
  { value: 'services', label: 'Home & Commercial Services' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'hospitality', label: 'Hotels & Hospitality' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'technology', label: 'Technology & IT' },
];

// Startup Development Stages
export const STARTUP_STAGES = [
  { value: 'idea', label: 'Idea Stage' },
  { value: 'mvp', label: 'Minimum Viable Product (MVP)' },
  { value: 'pre_seed', label: 'Pre-Seed' },
  { value: 'seed', label: 'Seed' },
  { value: 'series_a', label: 'Series A' },
  { value: 'series_b', label: 'Series B' },
  { value: 'series_c_plus', label: 'Series C+' },
];

// Investor Types
export const INVESTOR_TYPES = [
  { value: 'angel', label: 'Angel Investor' },
  { value: 'venture_capital', label: 'Venture Capital' },
  { value: 'private_equity', label: 'Private Equity' },
  { value: 'family_office', label: 'Family Office' },
  { value: 'corporate', label: 'Corporate Investor' },
  { value: 'individual', label: 'Individual Investor' },
  { value: 'investment_group', label: 'Investment Group/Syndicate' },
];

// Digital Asset Types
export const DIGITAL_ASSET_TYPES = [
  { value: 'content_website', label: 'Content Website/Blog' },
  { value: 'ecommerce_store', label: 'E-Commerce Store' },
  { value: 'saas', label: 'SaaS Platform' },
  { value: 'mobile_app', label: 'Mobile Application' },
  { value: 'online_community', label: 'Online Community/Forum' },
  { value: 'marketplace', label: 'Online Marketplace' },
  { value: 'domain_portfolio', label: 'Domain Portfolio' },
  { value: 'social_media', label: 'Social Media Account/Channel' },
  { value: 'newsletter', label: 'Newsletter/Subscription Service' },
  { value: 'online_course', label: 'Online Course/Educational Content' },
];

// Business Management Levels
export const MANAGEMENT_LEVELS = [
  { value: 'passive', label: 'Passive (0-5 hrs/week)' },
  { value: 'semi_passive', label: 'Semi-Passive (5-20 hrs/week)' },
  { value: 'active', label: 'Active (20+ hrs/week)' },
];