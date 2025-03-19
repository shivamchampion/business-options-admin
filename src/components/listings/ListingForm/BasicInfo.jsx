import React from 'react';
import { useFormContext } from 'react-hook-form';
import { 
  Store, 
  Building2, 
  Rocket, 
  CircleDollarSign,
  Globe, 
  HelpCircle,
  Info 
} from 'lucide-react';
import { LISTING_TYPES, INDIAN_STATES } from '../../../utils/constants';

const BasicInfo = () => {
  const { 
    register, 
    formState: { errors }, 
    watch,
    setValue 
  } = useFormContext();
  
  const listingType = watch('type');
  const description = watch('description') || '';

  // Industry options
  const industryOptions = [
    { value: 'agriculture', label: 'Agriculture & Farming' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'beauty', label: 'Beauty & Wellness' },
    { value: 'construction', label: 'Construction & Real Estate' },
    { value: 'ecommerce', label: 'E-commerce & Retail' },
    { value: 'education', label: 'Education & Training' },
    { value: 'food', label: 'Food & Beverage' },
    { value: 'healthcare', label: 'Healthcare & Medical' },
    { value: 'hospitality', label: 'Hospitality & Tourism' },
    { value: 'it', label: 'IT & Technology' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'professional', label: 'Professional Services' },
    { value: 'telecom', label: 'Telecommunications' },
    { value: 'transportation', label: 'Transportation & Logistics' },
    { value: 'other', label: 'Other' }
  ];

  // Get icon based on listing type
  const getListingIcon = (type) => {
    switch (type) {
      case LISTING_TYPES.BUSINESS:
        return <Store size={24} />;
      case LISTING_TYPES.FRANCHISE:
        return <Building2 size={24} />;
      case LISTING_TYPES.STARTUP:
        return <Rocket size={24} />;
      case LISTING_TYPES.INVESTOR:
        return <CircleDollarSign size={24} />;
      case LISTING_TYPES.DIGITAL_ASSET:
        return <Globe size={24} />;
      default:
        return <Store size={24} />;
    }
  };

  // Handle listing type change
  const handleListingTypeChange = (e) => {
    setValue('type', e.target.value);
  };

  return (
    <div className="space-y-6">
      <div className="form-section">
        <h2 className="form-section-title">Basic Information</h2>
        <p className="text-gray text-sm mb-6">
          Provide essential details about your listing. This information will appear in search results and listings.
        </p>

        {/* Listing Type */}
        <div className="mb-6">
          <label className="form-label required">Listing Type</label>
          <p className="form-helper-text mb-3">
            Select the type of listing you want to create. This determines the fields you'll need to fill out.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.values(LISTING_TYPES).map((type) => (
              <div key={type} className="relative">
                <input
                  type="radio"
                  id={`type-${type}`}
                  value={type}
                  {...register('type')}
                  className="sr-only"
                />
                <label
                  htmlFor={`type-${type}`}
                  className={`cursor-pointer flex flex-col items-center p-4 rounded-lg border ${
                    listingType === type
                      ? 'border-brand-blue bg-light-blue text-brand-blue'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray'
                  }`}
                >
                  <div className="mb-2">
                    {getListingIcon(type)}
                  </div>
                  <span className="font-medium text-center">
                    {type === LISTING_TYPES.BUSINESS && 'Business'}
                    {type === LISTING_TYPES.FRANCHISE && 'Franchise'}
                    {type === LISTING_TYPES.STARTUP && 'Startup'}
                    {type === LISTING_TYPES.INVESTOR && 'Investor'}
                    {type === LISTING_TYPES.DIGITAL_ASSET && 'Digital Asset'}
                  </span>
                </label>
              </div>
            ))}
          </div>
          
          {errors.type && (
            <p className="form-error">{errors.type.message}</p>
          )}
        </div>

        {/* Listing Name */}
        <div className="mb-6">
          <label htmlFor="name" className="form-label required">Listing Name</label>
          <div className="flex">
            <input
              id="name"
              type="text"
              {...register('name')}
              className={`w-full rounded-md border ${
                errors.name ? 'border-error focus:ring-error' : 'border-gray-300 focus:ring-brand-blue'
              } focus:outline-none focus:ring-2 px-3 py-2`}
              placeholder={
                listingType === LISTING_TYPES.BUSINESS ? 'e.g., Premium Restaurant in South Delhi' :
                listingType === LISTING_TYPES.FRANCHISE ? 'e.g., ABC Coffee Franchise Opportunity' :
                listingType === LISTING_TYPES.STARTUP ? 'e.g., InnovateTech AI Solutions' :
                listingType === LISTING_TYPES.INVESTOR ? 'e.g., Growth Capital Ventures' :
                'e.g., Established E-commerce Store'
              }
            />
          </div>
          
          {errors.name ? (
            <p className="form-error">{errors.name.message}</p>
          ) : (
            <p className="form-helper-text">
              3-100 characters. Give your listing a clear, descriptive name that attracts potential buyers.
            </p>
          )}
        </div>

        {/* Industries */}
        <div className="mb-6">
          <label className="form-label required">Industries</label>
          <p className="form-helper-text mb-2">
            Select up to 3 industries that best describe this listing.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {industryOptions.map((industry) => (
              <div key={industry.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`industry-${industry.value}`}
                  value={industry.value}
                  {...register('industries')}
                  className="h-4 w-4 text-brand-blue rounded border-gray-300 focus:ring-brand-blue"
                />
                <label
                  htmlFor={`industry-${industry.value}`}
                  className="ml-2 text-sm text-dark-gray"
                >
                  {industry.label}
                </label>
              </div>
            ))}
          </div>
          
          {errors.industries && (
            <p className="form-error mt-2">{errors.industries.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="form-label required">Description</label>
          <textarea
            id="description"
            {...register('description')}
            rows={6}
            className={`w-full rounded-md border ${
              errors.description ? 'border-error focus:ring-error' : 'border-gray-300 focus:ring-brand-blue'
            } focus:outline-none focus:ring-2 px-3 py-2`}
            placeholder={`Describe your ${
              listingType === LISTING_TYPES.BUSINESS ? 'business' :
              listingType === LISTING_TYPES.FRANCHISE ? 'franchise opportunity' :
              listingType === LISTING_TYPES.STARTUP ? 'startup' :
              listingType === LISTING_TYPES.INVESTOR ? 'investment focus' :
              'digital asset'
            } in detail...`}
          ></textarea>
          
          <div className="flex items-center justify-between mt-1">
            {errors.description ? (
              <p className="form-error">{errors.description.message}</p>
            ) : (
              <p className="form-helper-text">
                100-5000 characters. Provide a comprehensive overview.
              </p>
            )}
            <span className={`text-xs ${
              description.length > 5000 ? 'text-error' :
              description.length > 4500 ? 'text-warning' :
              description.length < 100 ? 'text-error' :
              'text-gray'
            }`}>
              {description.length}/5000
            </span>
          </div>
        </div>

        {/* Status and Plan (hidden in actual form, for admin only) */}
        <div className="mb-6 hidden">
          <input type="hidden" {...register('status')} value="draft" />
          <input type="hidden" {...register('plan')} value="Free" />
        </div>
      </div>

      {/* Location Information */}
      <div className="form-section">
        <h2 className="form-section-title">Location Information</h2>
        
        {/* Country - hidden and defaults to India */}
        <input type="hidden" {...register('location.country')} value="India" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* State */}
          <div>
            <label htmlFor="location.state" className="form-label required">State</label>
            <select
              id="location.state"
              {...register('location.state')}
              className={`w-full rounded-md border ${
                errors.location?.state ? 'border-error focus:ring-error' : 'border-gray-300 focus:ring-brand-blue'
              } focus:outline-none focus:ring-2 px-3 py-2`}
            >
              <option value="">Select State</option>
              {INDIAN_STATES.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            
            {errors.location?.state && (
              <p className="form-error">{errors.location.state.message}</p>
            )}
          </div>
          
          {/* City */}
          <div>
            <label htmlFor="location.city" className="form-label required">City</label>
            <input
              id="location.city"
              type="text"
              {...register('location.city')}
              className={`w-full rounded-md border ${
                errors.location?.city ? 'border-error focus:ring-error' : 'border-gray-300 focus:ring-brand-blue'
              } focus:outline-none focus:ring-2 px-3 py-2`}
              placeholder="e.g., Mumbai"
            />
            
            {errors.location?.city && (
              <p className="form-error">{errors.location.city.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="form-section">
        <h2 className="form-section-title">Contact Information</h2>
        <p className="text-gray text-sm mb-6">
          This information will be used for inquiries about your listing.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Email */}
          <div>
            <label htmlFor="contactInfo.email" className="form-label required">Email Address</label>
            <input
              id="contactInfo.email"
              type="email"
              {...register('contactInfo.email')}
              className={`w-full rounded-md border ${
                errors.contactInfo?.email ? 'border-error focus:ring-error' : 'border-gray-300 focus:ring-brand-blue'
              } focus:outline-none focus:ring-2 px-3 py-2`}
              placeholder="e.g., contact@example.com"
            />
            
            {errors.contactInfo?.email ? (
              <p className="form-error">{errors.contactInfo.email.message}</p>
            ) : (
              <p className="form-helper-text">
                Your primary contact email for inquiries.
              </p>
            )}
          </div>
          
          {/* Phone */}
          <div>
            <label htmlFor="contactInfo.phone" className="form-label">Phone Number</label>
            <input
              id="contactInfo.phone"
              type="tel"
              {...register('contactInfo.phone')}
              className={`w-full rounded-md border ${
                errors.contactInfo?.phone ? 'border-error focus:ring-error' : 'border-gray-300 focus:ring-brand-blue'
              } focus:outline-none focus:ring-2 px-3 py-2`}
              placeholder="e.g., +91 98765 43210"
            />
            
            {errors.contactInfo?.phone ? (
              <p className="form-error">{errors.contactInfo.phone.message}</p>
            ) : (
              <p className="form-helper-text">
                Optional. Include country code for international listings.
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Additional information */}
      <div className="bg-light-blue bg-opacity-70 rounded-md p-4 border border-brand-blue border-opacity-20">
        <div className="flex items-start">
          <Info size={20} className="text-brand-blue flex-shrink-0 mt-0.5 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-dark-gray mb-1">What happens next?</h3>
            <p className="text-sm text-gray">
              In the following steps, you'll add media files, specific details based on your listing type, and supporting documents. 
              You can save your progress as a draft at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;