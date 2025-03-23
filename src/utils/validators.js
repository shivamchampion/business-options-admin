import { z } from 'zod';

// Helper schema for validating phone numbers
const phoneRegex = /^\+?[0-9]{1,4}[-. ]?(\([0-9]{1,4}\)[-. ]?)?[0-9]{1,14}$/;

// Helper schema for contact information
const contactInfoSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  phone: z.string()
    .regex(phoneRegex, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  alternatePhone: z.string()
    .regex(phoneRegex, 'Please enter a valid alternate phone number')
    .optional()
    .or(z.literal('')),
  website: z.string()
    .url('Please enter a valid website URL')
    .optional()
    .or(z.literal('')),
  contactName: z.string()
    .max(100, 'Contact name must be 100 characters or less')
    .optional()
    .or(z.literal('')),
  preferredContactMethod: z.enum(['email', 'phone', 'whatsapp'], { 
    invalid_type_error: 'Please select a valid contact method'
  })
    .optional(),
});

// Helper schema for location information
const locationSchema = z.object({
  country: z.string()
    .default('India'),
  state: z.string()
    .min(1, 'State is required'),
  city: z.string()
    .min(1, 'City is required'),
  address: z.string()
    .max(200, 'Address must be 200 characters or less')
    .optional()
    .or(z.literal('')),
  pincode: z.string()
    .max(10, 'Pincode must be 10 characters or less')
    .optional()
    .or(z.literal('')),
});

// Basic info schema for the first step of the listing form
export const basicInfoSchema = z.object({
  type: z.enum(['business', 'franchise', 'startup', 'investor', 'digital_asset'], {
    required_error: 'Listing type is required',
    invalid_type_error: 'Please select a valid listing type',
  }),
  name: z.string()
    .min(3, 'Listing name must be at least 3 characters')
    .max(100, 'Listing name must be 100 characters or less')
    .regex(/^[a-zA-Z0-9 &-]+$/, 'Only letters, numbers, spaces, hyphens, and ampersands are allowed'),
  industries: z.array(z.string())
    .min(1, 'At least one industry is required')
    .max(3, 'Maximum of 3 industries allowed'),
  description: z.string()
    .min(100, 'Description must be at least 100 characters')
    .max(5000, 'Description must be 5000 characters or less'),
  shortDescription: z.string()
    .max(150, 'Short description must be 150 characters or less')
    .optional(),
  status: z.enum(['draft', 'pending', 'published', 'rejected', 'archived'], {
    required_error: 'Status is required',
  }).default('draft'),
  plan: z.enum(['free', 'basic', 'advanced', 'premium', 'platinum'], {
    required_error: 'Plan type is required',
  }).default('free'),
  location: locationSchema,
  contactInfo: contactInfoSchema,
});

// Media upload schema for the second step
export const mediaUploadSchema = z.object({
  media: z.object({
    featuredImage: z.object({
      url: z.string().url('Featured image URL is invalid'),
      path: z.string().min(1, 'Storage path is required'),
      alt: z.string().optional(),
      width: z.number().optional(),
      height: z.number().optional(),
    }).nullable().optional(),
    galleryImages: z.array(
      z.object({
        url: z.string().url('Image URL is invalid'),
        path: z.string().min(1, 'Storage path is required'),
        alt: z.string().optional(),
        width: z.number().optional(),
        height: z.number().optional(),
      })
    ).min(3, 'At least 3 images are required')
     .max(10, 'Maximum of 10 images allowed'),
    totalImages: z.number().min(3, 'At least 3 images are required'),
  }).refine(data => !!data.featuredImage, {
    message: 'Featured image is required',
    path: ['featuredImage'],
  }),
});

// Business listing details schema
export const businessDetailsSchema = z.object({
  businessDetails: z.object({
    businessType: z.string().min(1, 'Business type is required'),
    entityType: z.string().min(1, 'Entity type is required'),
    establishedYear: z.number()
      .int('Year must be a whole number')
      .min(1900, 'Year must be 1900 or later')
      .max(new Date().getFullYear(), 'Year cannot be in the future'),
    registrationNumber: z.string().min(1, 'Registration number is required'),
    gstNumber: z.string().optional(),
    panNumber: z.string().optional(),
    
    // Operations section
    operations: z.object({
      employees: z.object({
        count: z.number().int('Must be a whole number').min(0, 'Cannot be negative'),
        fullTime: z.number().int('Must be a whole number').min(0, 'Cannot be negative'),
        partTime: z.number().int('Must be a whole number').min(0, 'Cannot be negative'),
      }).refine(data => data.fullTime + data.partTime === data.count, {
        message: 'Full-time and part-time employees must add up to total employee count',
        path: ['count'],
      }),
      locationType: z.string().min(1, 'Location type is required'),
      leaseInformation: z.object({
        expiryDate: z.date().optional(),
        monthlyCost: z.object({
          value: z.number().min(0, 'Cannot be negative'),
          currency: z.string().default('INR'),
          formatted: z.string().optional(),
        }).optional(),
        isTransferable: z.boolean().optional(),
      }).optional(),
      operationDescription: z.string()
        .min(100, 'Description must be at least 100 characters')
        .max(1000, 'Description must be 1000 characters or less'),
    }),
    
    // Financials section
    financials: z.object({
      annualRevenue: z.object({
        value: z.number().min(0, 'Cannot be negative'),
        currency: z.string().default('INR'),
        formatted: z.string().optional(),
      }),
      monthlyRevenue: z.object({
        value: z.number().min(0, 'Cannot be negative'),
        currency: z.string().default('INR'),
        formatted: z.string().optional(),
      }),
      profitMargin: z.object({
        percentage: z.number().min(0, 'Cannot be negative').max(100, 'Cannot exceed 100%'),
        trend: z.string().optional(),
      }),
      revenueTrend: z.string().min(1, 'Revenue trend is required'),
      inventory: z.object({
        isIncluded: z.boolean(),
        value: z.object({
          value: z.number().min(0, 'Cannot be negative'),
          currency: z.string().default('INR'),
          formatted: z.string().optional(),
        }).optional(),
        description: z.string().optional(),
      }).optional(),
      equipment: z.object({
        isIncluded: z.boolean(),
        value: z.object({
          value: z.number().min(0, 'Cannot be negative'),
          currency: z.string().default('INR'),
          formatted: z.string().optional(),
        }),
        description: z.string().optional(),
      }),
      customerConcentration: z.number()
        .min(0, 'Cannot be negative')
        .max(100, 'Cannot exceed 100%'),
    }),
    
    // Sale information section
    sale: z.object({
      askingPrice: z.object({
        value: z.number().min(0, 'Cannot be negative'),
        currency: z.string().default('INR'),
        formatted: z.string().optional(),
        priceMultiple: z.number().optional(),
        isNegotiable: z.boolean().optional(),
      }),
      reasonForSelling: z.string()
        .min(50, 'Reason must be at least 50 characters')
        .max(500, 'Reason must be 500 characters or less'),
      sellerFinancing: z.object({
        isAvailable: z.boolean(),
        details: z.string().optional(),
        downPaymentPercentage: z.number()
          .min(10, 'Down payment must be at least 10%')
          .max(100, 'Down payment cannot exceed 100%')
          .optional(),
      }).optional(),
      transitionPeriod: z.number()
        .int('Must be a whole number')
        .min(0, 'Cannot be negative')
        .max(12, 'Cannot exceed 12 months'),
      trainingIncluded: z.string()
        .min(50, 'Training details must be at least 50 characters')
        .max(500, 'Training details must be 500 characters or less'),
      assetsIncluded: z.string()
        .min(100, 'Assets list must be at least 100 characters')
        .max(1000, 'Assets list must be 1000 characters or less'),
      priceMultiple: z.number().positive('Must be positive').optional(),
    }),
  }),
});

// Franchise listing details schema
export const franchiseDetailsSchema = z.object({
  franchiseDetails: z.object({
    franchiseBrand: z.string()
      .min(3, 'Brand name must be at least 3 characters')
      .max(100, 'Brand name must be 100 characters or less'),
    franchiseType: z.string().min(1, 'Franchise type is required'),
    franchiseSince: z.number()
      .int('Year must be a whole number')
      .min(1900, 'Year must be 1900 or later')
      .max(new Date().getFullYear(), 'Year cannot be in the future'),
    brandEstablished: z.number()
      .int('Year must be a whole number')
      .min(1900, 'Year must be 1900 or later')
      .max(new Date().getFullYear(), 'Year cannot be in the future'),
    totalUnits: z.number().int('Must be a whole number').min(1, 'Must have at least 1 unit'),
    franchiseeCount: z.number().int('Must be a whole number').min(0, 'Cannot be negative'),
    companyOwnedUnits: z.number().int('Must be a whole number').min(0, 'Cannot be negative'),
    availableTerritories: z.array(z.string()).min(1, 'At least one territory is required'),
    
    // Additional sections would be defined here, following the same pattern
  }).refine(data => data.franchiseeCount + data.companyOwnedUnits === data.totalUnits, {
    message: 'Franchisee count and company-owned units must add up to total units',
    path: ['totalUnits'],
  }),
});

// Startup listing details schema
export const startupDetailsSchema = z.object({
  startupDetails: z.object({
    developmentStage: z.string().min(1, 'Development stage is required'),
    registeredName: z.string()
      .min(3, 'Registered name must be at least 3 characters')
      .max(100, 'Registered name must be 100 characters or less'),
    foundedDate: z.date(),
    launchDate: z.date().optional(),
    missionStatement: z.string()
      .min(50, 'Mission statement must be at least 50 characters')
      .max(300, 'Mission statement must be 300 characters or less'),
    problemStatement: z.string()
      .min(50, 'Problem statement must be at least 50 characters')
      .max(300, 'Problem statement must be 300 characters or less'),
    solutionDescription: z.string()
      .min(100, 'Solution description must be at least 100 characters')
      .max(500, 'Solution description must be 500 characters or less'),
    
    // Additional sections would be defined here, following the same pattern
  }),
});

// Investor listing details schema
export const investorDetailsSchema = z.object({
  investorDetails: z.object({
    investorType: z.string().min(1, 'Investor type is required'),
    yearsOfExperience: z.number()
      .int('Years must be a whole number')
      .min(0, 'Cannot be negative')
      .max(100, 'Years cannot exceed 100'),
    investmentPhilosophy: z.string()
      .min(100, 'Investment philosophy must be at least 100 characters')
      .max(500, 'Investment philosophy must be 500 characters or less'),
    backgroundSummary: z.string()
      .min(100, 'Background summary must be at least 100 characters')
      .max(500, 'Background summary must be 500 characters or less'),
    keyAchievements: z.string()
      .max(500, 'Key achievements must be 500 characters or less')
      .optional(),
    investmentTeamSize: z.number().int('Must be a whole number').min(1, 'Must be at least 1')
      .optional(),
    
    // Additional sections would be defined here, following the same pattern
  }),
});

// Digital Asset listing details schema
export const digitalAssetDetailsSchema = z.object({
  digitalAssetDetails: z.object({
    assetType: z.string().min(1, 'Asset type is required'),
    platformFramework: z.string()
      .min(2, 'Platform/framework must be at least 2 characters')
      .max(100, 'Platform/framework must be 100 characters or less'),
    nicheIndustry: z.string()
      .min(2, 'Niche/industry must be at least 2 characters')
      .max(100, 'Niche/industry must be 100 characters or less'),
    creationDate: z.date(),
    businessModel: z.string()
      .min(100, 'Business model must be at least 100 characters')
      .max(500, 'Business model must be 500 characters or less'),
    easeOfManagement: z.string().min(1, 'Ease of management is required'),
    ownerTimeRequired: z.number()
      .int('Hours must be a whole number')
      .min(0, 'Cannot be negative')
      .max(168, 'Cannot exceed 168 hours (one week)'),
    
    // Additional sections would be defined here, following the same pattern
  }),
});

// Documents schema
export const documentsSchema = z.object({
  documents: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      name: z.string(),
      description: z.string().optional(),
      url: z.string().url('Document URL is invalid'),
      path: z.string(),
      format: z.string(),
      size: z.number(),
      isPublic: z.boolean().default(false),
      uploadedAt: z.date(),
      verificationStatus: z.string().default('pending'),
    })
  ).optional(),
});

// Complete listing schema that combines all steps
export const completeListingSchema = z.object({
  // Basic info (step 1)
  ...basicInfoSchema.shape,
  
  // Media (step 2)
  ...mediaUploadSchema.shape,
  
  // Conditional schema for listing details (step 3) based on type
  // We'll use refined validations to conditionally apply the correct schema
}).refine(
  (data) => {
    if (data.type === 'business') {
      return businessDetailsSchema.safeParse(data).success;
    }
    return true;
  },
  {
    message: 'Invalid business details',
    path: ['businessDetails'],
  }
).refine(
  (data) => {
    if (data.type === 'franchise') {
      return franchiseDetailsSchema.safeParse(data).success;
    }
    return true;
  },
  {
    message: 'Invalid franchise details',
    path: ['franchiseDetails'],
  }
).refine(
  (data) => {
    if (data.type === 'startup') {
      return startupDetailsSchema.safeParse(data).success;
    }
    return true;
  },
  {
    message: 'Invalid startup details',
    path: ['startupDetails'],
  }
).refine(
  (data) => {
    if (data.type === 'investor') {
      return investorDetailsSchema.safeParse(data).success;
    }
    return true;
  },
  {
    message: 'Invalid investor details',
    path: ['investorDetails'],
  }
).refine(
  (data) => {
    if (data.type === 'digital_asset') {
      return digitalAssetDetailsSchema.safeParse(data).success;
    }
    return true;
  },
  {
    message: 'Invalid digital asset details',
    path: ['digitalAssetDetails'],
  }
);

// Schema for the review step
export const reviewSchema = z.object({
  termsAgreed: z.boolean().refine(value => value === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

// Export individual step schemas for step-by-step validation
export const stepSchemas = [
  basicInfoSchema,       // Step 1: Basic Info
  mediaUploadSchema,     // Step 2: Media Upload
  // Step 3 uses conditional schema based on listing type
  documentsSchema,       // Step 4: Documents
  reviewSchema,          // Step 5: Review & Submit
];