import { z } from 'zod';
import { VALIDATION, LISTING_TYPES } from '../../../utils/constants';
import { isValidIndianPhone, isValidYear, isValidPAN, isValidGST } from '../../../utils/validators';

// Fixed validation for number fields
const createNumberWithMinMax = (min, max, errorMsg) => {
  return z.union([
    z.number().min(min, errorMsg),
    z.string().transform(val => {
      const num = parseInt(val, 10);
      return isNaN(num) ? (min !== undefined ? min : 0) : num;
    })
  ]);
};

// Helper function for float number validation with min/max
const createFloatWithMinMax = (min, max, errorMsg) => {
  return z.union([
    z.number().min(min, errorMsg),
    z.string().transform(val => {
      const num = parseFloat(val);
      return isNaN(num) ? (min !== undefined ? min : 0) : num;
    })
  ]);
};

// Basic Information (Step 1)
export const basicInfoSchema = z.object({
  // Core fields
  name: z
    .string()
    .min(VALIDATION.LISTING_NAME_MIN, `Listing name must be at least ${VALIDATION.LISTING_NAME_MIN} characters`)
    .max(VALIDATION.LISTING_NAME_MAX, `Listing name cannot exceed ${VALIDATION.LISTING_NAME_MAX} characters`)
    .refine((val) => /^[a-zA-Z0-9\s&-]+$/.test(val), {
      message: 'Name can only contain letters, numbers, spaces, hyphens, and ampersands'
    }),
    
  type: z.enum([
    LISTING_TYPES.BUSINESS,
    LISTING_TYPES.FRANCHISE,
    LISTING_TYPES.STARTUP,
    LISTING_TYPES.INVESTOR,
    LISTING_TYPES.DIGITAL_ASSET
  ], {
    message: 'Please select a valid listing type'
  }),
  
  industries: z
    .array(z.string())
    .min(1, 'Select at least one industry')
    .max(3, 'You can select a maximum of 3 industries'),
    
  description: z
    .string()
    .min(VALIDATION.DESCRIPTION_MIN, `Description must be at least ${VALIDATION.DESCRIPTION_MIN} characters`)
    .max(VALIDATION.DESCRIPTION_MAX, `Description cannot exceed ${VALIDATION.DESCRIPTION_MAX} characters`),
    
  status: z.string().optional(),
  plan: z.string().optional(),
  
  // Location fields
  location: z.object({
    country: z.string().default('India'),
    state: z.string().min(1, 'State is required'),
    city: z.string().min(1, 'City is required'),
    address: z.string().optional(),
    pincode: z.string().optional(),
  }),
  
  // Contact fields
  contactInfo: z.object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    phone: z
      .string()
      .optional()
      .refine((val) => !val || isValidIndianPhone(val), {
        message: 'Please enter a valid phone number'
      }),
    contactName: z.string().optional(),
    alternatePhone: z.string().optional(),
    preferredContactMethod: z.string().optional(),
    website: z.string().optional(),
  }),
});

// Media Upload (Step 2)
export const mediaSchema = z.object({
  media: z
    .any()
    .optional()
    .refine((val) => val === undefined || (val?.galleryImages?.length >= VALIDATION.MIN_IMAGES), {
      message: `At least ${VALIDATION.MIN_IMAGES} images are required`
    })
    .refine((val) => val === undefined || (val?.galleryImages?.length <= VALIDATION.MAX_IMAGES), {
      message: `Maximum ${VALIDATION.MAX_IMAGES} images are allowed`
    }),
});

// Business Details (Step 3 - Business)
export const businessSchema = z.object({
  businessDetails: z.object({
    // Business information
    businessType: z.string().min(1, 'Business type is required'),
    entityType: z.string().min(1, 'Entity type is required'),
    establishedYear: createNumberWithMinMax(0, undefined, 'Year cannot be negative')
      .refine(val => isValidYear(val), {
        message: 'Please enter a valid year'
      }),
    registrationNumber: z.string().min(1, 'Registration number is required'),
    gstNumber: z
      .string()
      .optional()
      .refine(val => !val || isValidGST(val), {
        message: 'Please enter a valid GST number'
      }),
    panNumber: z
      .string()
      .optional()
      .refine(val => !val || isValidPAN(val), {
        message: 'Please enter a valid PAN number'
      }),
    
    // Operations
    operations: z.object({
      employees: z.object({
        count: createNumberWithMinMax(0, undefined, 'Employee count cannot be negative'),
        fullTime: createNumberWithMinMax(0, undefined, 'Full-time employee count cannot be negative'),
        partTime: createNumberWithMinMax(0, undefined, 'Part-time employee count cannot be negative'),
      }).refine(data => data.fullTime + data.partTime === data.count, {
        message: 'The sum of full-time and part-time employees must equal total employees',
        path: ['count'],
      }),
      locationType: z.string().min(1, 'Location type is required'),
      leaseInformation: z.object({
        expiryDate: z.any().optional(),
        monthlyCost: z.any().optional(),
        isTransferable: z.boolean().optional(),
      }).optional(),
      operationDescription: z
        .string()
        .min(100, 'Operation description must be at least 100 characters')
        .max(1000, 'Operation description cannot exceed 1000 characters'),
    }),
    
    // Financials
    financials: z.object({
      annualRevenue: z.object({
        value: createFloatWithMinMax(0, undefined, 'Annual revenue cannot be negative'),
        currency: z.string().default('INR'),
      }),
      monthlyRevenue: z.object({
        value: createFloatWithMinMax(0, undefined, 'Monthly revenue cannot be negative'),
        currency: z.string().default('INR'),
      }),
      profitMargin: z.object({
        percentage: createFloatWithMinMax(0, 100, 'Profit margin cannot be negative')
          .refine(val => val <= 100, {
            message: 'Profit margin cannot exceed 100%'
          }),
        trend: z.string().optional(),
      }),
      revenueTrend: z.string().min(1, 'Revenue trend is required'),
      inventory: z.object({
        isIncluded: z.boolean().optional(),
        value: z.any().optional(),
        description: z.string().optional(),
      }).optional(),
      equipment: z.object({
        isIncluded: z.boolean().optional(),
        value: z.any().optional(),
        description: z.string().optional(),
      }),
      customerConcentration: createFloatWithMinMax(0, 100, 'Customer concentration cannot be negative')
        .refine(val => val <= 100, {
          message: 'Customer concentration cannot exceed 100%'
        }),
    }),
    
    // Sale information
    sale: z.object({
      askingPrice: z.object({
        value: createFloatWithMinMax(0, undefined, 'Asking price cannot be negative'),
        currency: z.string().default('INR'),
        priceMultiple: z.number().optional(),
        isNegotiable: z.boolean().optional(),
      }),
      reasonForSelling: z
        .string()
        .min(50, 'Reason for selling must be at least 50 characters')
        .max(500, 'Reason for selling cannot exceed 500 characters'),
      sellerFinancing: z.object({
        isAvailable: z.boolean().optional(),
        details: z.string().optional(),
        downPaymentPercentage: createFloatWithMinMax(0, 100, 'Down payment percentage cannot be negative')
          .optional()
          .refine(val => !val || val <= 100, {
            message: 'Down payment percentage cannot exceed 100%'
          }),
      }),
      transitionPeriod: createNumberWithMinMax(0, 12, 'Transition period cannot be negative')
        .refine(val => val <= 12, {
          message: 'Transition period cannot exceed 12 months'
        }),
      trainingIncluded: z
        .string()
        .min(50, 'Training details must be at least 50 characters')
        .max(500, 'Training details cannot exceed 500 characters'),
      assetsIncluded: z
        .string()
        .min(100, 'Assets included must be at least 100 characters')
        .max(1000, 'Assets included cannot exceed 1000 characters'),
      priceMultiple: z.number().optional(),
    }),
  }),
});

// Franchise Details (Step 3 - Franchise)
export const franchiseSchema = z.object({
  franchiseDetails: z.object({
    // Basic franchise information
    franchiseBrand: z
      .string()
      .min(3, 'Brand name must be at least 3 characters')
      .max(100, 'Brand name cannot exceed 100 characters'),
    franchiseType: z.string().min(1, 'Franchise type is required'),
    franchiseSince: createNumberWithMinMax(0, undefined, 'Year cannot be negative')
      .refine(val => isValidYear(val), {
        message: 'Please enter a valid year for franchise since'
      }),
    brandEstablished: createNumberWithMinMax(0, undefined, 'Year cannot be negative')
      .refine(val => isValidYear(val), {
        message: 'Please enter a valid year for brand established'
      }),
    totalUnits: createNumberWithMinMax(0, undefined, 'Total units cannot be negative'),
    franchiseeCount: createNumberWithMinMax(0, undefined, 'Franchisee count cannot be negative'),
    companyOwnedUnits: createNumberWithMinMax(0, undefined, 'Company-owned units cannot be negative'),
    availableTerritories: z
      .array(z.string())
      .min(1, 'At least one available territory is required'),
      
    // Investment details
    investment: z.object({
      franchiseFee: z.object({
        value: createFloatWithMinMax(0, undefined, 'Franchise fee cannot be negative'),
        currency: z.string().default('INR'),
      }),
      royaltyFee: createFloatWithMinMax(0, 50, 'Royalty fee cannot be negative')
        .refine(val => val <= 50, {
          message: 'Royalty fee cannot exceed 50%'
        }),
      royaltyStructure: z
        .string()
        .min(50, 'Royalty structure must be at least 50 characters')
        .max(300, 'Royalty structure cannot exceed 300 characters'),
      marketingFee: createFloatWithMinMax(0, 20, 'Marketing fee cannot be negative')
        .refine(val => val <= 20, {
          message: 'Marketing fee cannot exceed 20%'
        }),
      totalInitialInvestment: z.object({
        value: createFloatWithMinMax(0, undefined, 'Total initial investment cannot be negative'),
        currency: z.string().default('INR'),
      }),
      recurringFees: z
        .string()
        .min(50, 'Recurring fees must be at least 50 characters')
        .max(300, 'Recurring fees cannot exceed 300 characters'),
    }),
    
    // Support & training
    support: z.object({
      initialTraining: z
        .string()
        .min(100, 'Initial training must be at least 100 characters')
        .max(500, 'Initial training cannot exceed 500 characters'),
      trainingDuration: z.string().min(1, 'Training duration is required'),
      trainingLocation: z.string().min(1, 'Training location is required'),
      ongoingSupport: z
        .string()
        .min(100, 'Ongoing support must be at least 100 characters')
        .max(500, 'Ongoing support cannot exceed 500 characters'),
      fieldSupport: z.string().min(1, 'Field support is required'),
      marketingSupport: z
        .string()
        .min(100, 'Marketing support must be at least 100 characters')
        .max(500, 'Marketing support cannot exceed 500 characters'),
      technologySystems: z
        .string()
        .min(50, 'Technology systems must be at least 50 characters')
        .max(300, 'Technology systems cannot exceed 300 characters'),
      siteSelection: z.boolean().optional(),
    }),
    
    // Performance metrics
    performance: z.object({
      averageUnitSales: z.object({
        value: createFloatWithMinMax(0, undefined, 'Average unit sales cannot be negative'),
        currency: z.string().default('INR'),
      }),
      salesGrowth: z.string().min(1, 'Sales growth is required'),
      averageBreakeven: z.string().min(1, 'Average breakeven period is required'),
      successRate: createFloatWithMinMax(0, 100, 'Success rate must be between 0% and 100%')
        .optional()
        .refine(val => !val || (val >= 0 && val <= 100), {
          message: 'Success rate must be between 0% and 100%'
        }),
      franchiseeRequirements: z
        .string()
        .min(100, 'Franchisee requirements must be at least 100 characters')
        .max(500, 'Franchisee requirements cannot exceed 500 characters'),
      netWorthRequirement: z.object({
        value: createFloatWithMinMax(0, undefined, 'Net worth requirement cannot be negative'),
        currency: z.string().default('INR'),
      }),
      liquidCapitalRequired: z.object({
        value: createFloatWithMinMax(0, undefined, 'Liquid capital required cannot be negative'),
        currency: z.string().default('INR'),
      }),
    }),
  }),
});

// Startup Details (Step 3 - Startup)
export const startupSchema = z.object({
  startupDetails: z.object({
    // Basic startup information
    developmentStage: z.string().min(1, 'Development stage is required'),
    registeredName: z
      .string()
      .min(3, 'Registered name must be at least 3 characters')
      .max(100, 'Registered name cannot exceed 100 characters'),
    foundedDate: z.any().refine(val => val !== null, {
      message: 'Founded date is required'
    }),
    launchDate: z.any().optional(),
    missionStatement: z
      .string()
      .min(50, 'Mission statement must be at least 50 characters')
      .max(300, 'Mission statement cannot exceed 300 characters'),
    problemStatement: z
      .string()
      .min(50, 'Problem statement must be at least 50 characters')
      .max(300, 'Problem statement cannot exceed 300 characters'),
    solutionDescription: z
      .string()
      .min(100, 'Solution description must be at least 100 characters')
      .max(500, 'Solution description cannot exceed 500 characters'),
      
    // Team & product
    team: z.object({
      teamSize: createNumberWithMinMax(1, undefined, 'Team size must be at least 1'),
      founders: z.array(z.any()).optional(),
    }),
    product: z.object({
      productStage: z.string().min(1, 'Product stage is required'),
      intellectualProperty: z.array(z.string()).optional(),
      technologyStack: z.string().optional(),
      uniqueSellingPoints: z
        .string()
        .min(100, 'Unique selling points must be at least 100 characters')
        .max(500, 'Unique selling points cannot exceed 500 characters'),
    }),
    
    // Market & traction
    market: z.object({
      totalUsers: createNumberWithMinMax(0, undefined, 'Total users cannot be negative').optional(),
      activeUsers: createNumberWithMinMax(0, undefined, 'Active users cannot be negative').optional(),
      revenueModel: z
        .string()
        .min(50, 'Revenue model must be at least 50 characters')
        .max(300, 'Revenue model cannot exceed 300 characters'),
      monthlyRevenue: z.object({
        value: createFloatWithMinMax(0, undefined, 'Monthly revenue cannot be negative').optional(),
        currency: z.string().default('INR'),
      }).optional(),
      growthRate: createFloatWithMinMax(0, undefined, 'Growth rate cannot be negative').optional(),
      targetMarket: z
        .string()
        .min(50, 'Target market must be at least 50 characters')
        .max(300, 'Target market cannot exceed 300 characters'),
      marketSizeTAM: z.object({
        value: createFloatWithMinMax(0, undefined, 'Market size cannot be negative'),
        currency: z.string().default('INR'),
      }),
      competitiveAnalysis: z
        .string()
        .min(100, 'Competitive analysis must be at least 100 characters')
        .max(500, 'Competitive analysis cannot exceed 500 characters'),
    }),
    
    // Funding information
    funding: z.object({
      fundingStage: z.string().min(1, 'Funding stage is required'),
      totalRaisedToDate: z.object({
        value: createFloatWithMinMax(0, undefined, 'Total raised cannot be negative').optional(),
        currency: z.string().default('INR'),
      }).optional(),
      currentRaisingAmount: z.object({
        value: createFloatWithMinMax(0, undefined, 'Current raising amount cannot be negative'),
        currency: z.string().default('INR'),
      }),
      equityOffered: createFloatWithMinMax(0, 100, 'Equity offered cannot be negative')
        .refine(val => val <= 100, {
          message: 'Equity offered cannot exceed 100%'
        }),
      preMoneyValuation: z.object({
        value: createFloatWithMinMax(0, undefined, 'Pre-money valuation cannot be negative'),
        currency: z.string().default('INR'),
      }),
      useOfFunds: z
        .string()
        .min(100, 'Use of funds must be at least 100 characters')
        .max(500, 'Use of funds cannot exceed 500 characters'),
      previousInvestors: z.string().optional(),
      burnRate: z.object({
        value: createFloatWithMinMax(0, undefined, 'Burn rate cannot be negative').optional(),
        currency: z.string().default('INR'),
      }).optional(),
      runway: createNumberWithMinMax(0, undefined, 'Runway cannot be negative').optional(),
    }),
  }),
});

// Investor Details (Step 3 - Investor)
export const investorSchema = z.object({
  investorDetails: z.object({
    // Basic investor information
    investorType: z.string().min(1, 'Investor type is required'),
    yearsOfExperience: createNumberWithMinMax(0, 100, 'Years of experience cannot be negative')
      .refine(val => val <= 100, {
        message: 'Years of experience cannot exceed 100'
      }),
    investmentPhilosophy: z
      .string()
      .min(100, 'Investment philosophy must be at least 100 characters')
      .max(500, 'Investment philosophy cannot exceed 500 characters'),
    backgroundSummary: z
      .string()
      .min(100, 'Background summary must be at least 100 characters')
      .max(500, 'Background summary cannot exceed 500 characters'),
    keyAchievements: z
      .string()
      .max(500, 'Key achievements cannot exceed 500 characters')
      .optional(),
    investmentTeamSize: createNumberWithMinMax(0, undefined, 'Investment team size cannot be negative').optional(),
      
    // Investment capacity
    investment: z.object({
      annualInvestmentTarget: z.object({
        value: createFloatWithMinMax(0, undefined, 'Annual investment target cannot be negative').optional(),
        currency: z.string().default('INR'),
      }).optional(),
      preferredRounds: z.array(z.string()).min(1, 'At least one preferred round is required'),
      leadInvestorStatus: z.boolean().optional(),
      preferredEquityStake: z.object({
        min: createFloatWithMinMax(0, 100, 'Minimum equity stake cannot be negative')
          .optional()
          .refine(val => !val || val <= 100, {
            message: 'Minimum equity stake cannot exceed 100%'
          }),
        max: createFloatWithMinMax(0, 100, 'Maximum equity stake cannot be negative')
          .optional()
          .refine(val => !val || val <= 100, {
            message: 'Maximum equity stake cannot exceed 100%'
          }),
      }).optional(),
      decisionTimeline: z.string().min(1, 'Decision timeline is required'),
    }),
    
    // Investment focus
    focus: z.object({
      primaryIndustries: z.array(z.string()).min(1, 'At least one primary industry is required'),
      secondaryIndustries: z.array(z.string()).optional(),
      businessStagePreference: z.array(z.string()).min(1, 'At least one business stage preference is required'),
      geographicFocus: z.array(z.string()).min(1, 'At least one geographic focus is required'),
      investmentCriteria: z
        .string()
        .min(100, 'Investment criteria must be at least 100 characters')
        .max(500, 'Investment criteria cannot exceed 500 characters'),
      minimumRevenue: z.object({
        value: createFloatWithMinMax(0, undefined, 'Minimum revenue cannot be negative').optional(),
        currency: z.string().default('INR'),
      }).optional(),
      minimumTraction: z.string().optional(),
    }),
    
    // Portfolio & process
    portfolio: z.object({
      portfolioSize: createNumberWithMinMax(0, undefined, 'Portfolio size cannot be negative').optional(),
      activeInvestments: createNumberWithMinMax(0, undefined, 'Active investments cannot be negative').optional(),
      successStories: z
        .string()
        .max(500, 'Success stories cannot exceed 500 characters')
        .optional(),
      investmentProcess: z
        .string()
        .min(100, 'Investment process must be at least 100 characters')
        .max(500, 'Investment process cannot exceed 500 characters'),
      postInvestmentSupport: z
        .string()
        .min(100, 'Post-investment support must be at least 100 characters')
        .max(500, 'Post-investment support cannot exceed 500 characters'),
      reportingRequirements: z
        .string()
        .max(300, 'Reporting requirements cannot exceed 300 characters')
        .optional(),
      boardInvolvement: z.string().optional(),
    }),
  }),
});

// Digital Asset Details (Step 3 - Digital Asset)
export const digitalAssetSchema = z.object({
  digitalAssetDetails: z.object({
    // Basic digital asset information
    assetType: z.string().min(1, 'Asset type is required'),
    platformFramework: z
      .string()
      .min(2, 'Platform/framework must be at least 2 characters')
      .max(100, 'Platform/framework cannot exceed 100 characters'),
    nicheIndustry: z
      .string()
      .min(2, 'Niche/industry must be at least 2 characters')
      .max(100, 'Niche/industry cannot exceed 100 characters'),
    creationDate: z.any().refine(val => val !== null, {
      message: 'Creation date is required'
    }),
    businessModel: z
      .string()
      .min(100, 'Business model must be at least 100 characters')
      .max(500, 'Business model cannot exceed 500 characters'),
    easeOfManagement: z.string().min(1, 'Ease of management is required'),
    ownerTimeRequired: createNumberWithMinMax(0, 168, 'Owner time required cannot be negative')
      .refine(val => val <= 168, {
        message: 'Owner time required cannot exceed 168 hours per week'
      }),
      
    // Technical details
    technical: z.object({
      domainName: z.string().min(1, 'Domain name is required'),
      domainAuthority: createNumberWithMinMax(0, 100, 'Domain authority cannot be negative')
        .optional()
        .refine(val => !val || val <= 100, {
          message: 'Domain authority cannot exceed 100'
        }),
      domainAge: createNumberWithMinMax(0, 30, 'Domain age cannot be negative')
        .optional()
        .refine(val => !val || val <= 30, {
          message: 'Domain age cannot exceed 30 years'
        }),
      hostingProvider: z.string().min(1, 'Hosting provider is required'),
      monthlyHostingCost: z.object({
        value: createFloatWithMinMax(0, undefined, 'Monthly hosting cost cannot be negative'),
        currency: z.string().default('INR'),
      }),
      technologyStack: z.string().min(1, 'Technology stack is required'),
      mobileResponsiveness: z.boolean().optional(),
      contentManagement: z.string().min(1, 'Content management is required'),
      sslSecurity: z.boolean().optional(),
    }),
    
    // Traffic & analytics
    traffic: z.object({
      monthlyVisitors: createNumberWithMinMax(0, undefined, 'Monthly visitors cannot be negative'),
      monthlyPageviews: createNumberWithMinMax(0, undefined, 'Monthly pageviews cannot be negative'),
      trafficTrend: z.string().min(1, 'Traffic trend is required'),
      organicTrafficPercentage: createFloatWithMinMax(0, 100, 'Organic traffic percentage cannot be negative')
        .refine(val => val <= 100, {
          message: 'Organic traffic percentage cannot exceed 100%'
        }),
      directTrafficPercentage: createFloatWithMinMax(0, 100, 'Direct traffic percentage cannot be negative')
        .refine(val => val <= 100, {
          message: 'Direct traffic percentage cannot exceed 100%'
        }),
      referralTrafficPercentage: createFloatWithMinMax(0, 100, 'Referral traffic percentage cannot be negative')
        .refine(val => val <= 100, {
          message: 'Referral traffic percentage cannot exceed 100%'
        }),
      socialTrafficPercentage: createFloatWithMinMax(0, 100, 'Social traffic percentage cannot be negative')
        .refine(val => val <= 100, {
          message: 'Social traffic percentage cannot exceed 100%'
        }),
      otherTrafficPercentage: createFloatWithMinMax(0, 100, 'Other traffic percentage cannot be negative')
        .refine(val => val <= 100, {
          message: 'Other traffic percentage cannot exceed 100%'
        }),
      analyticsVerification: z.boolean().optional(),
      emailSubscribers: createNumberWithMinMax(0, undefined, 'Email subscribers cannot be negative')
        .optional(),
      socialMediaAccounts: z.string().optional(),
    }).refine(data => {
      const sum = (data.organicTrafficPercentage || 0) +
                 (data.directTrafficPercentage || 0) +
                 (data.referralTrafficPercentage || 0) +
                 (data.socialTrafficPercentage || 0) +
                 (data.otherTrafficPercentage || 0);
      return Math.abs(sum - 100) < 0.1; // Allow tiny floating point differences
    }, {
      message: 'Traffic percentages must total 100%',
      path: ['organicTrafficPercentage'],
    }),
    
    // Financials & sale
    financials: z.object({
      monthlyRevenue: z.object({
        value: createFloatWithMinMax(0, undefined, 'Monthly revenue cannot be negative'),
        currency: z.string().default('INR'),
      }),
      annualRevenue: z.object({
        value: createFloatWithMinMax(0, undefined, 'Annual revenue cannot be negative'),
        currency: z.string().default('INR'),
      }),
      monthlyProfit: z.object({
        value: createFloatWithMinMax(0, undefined, 'Monthly profit cannot be negative'),
        currency: z.string().default('INR'),
      }),
      annualProfit: z.object({
        value: createFloatWithMinMax(0, undefined, 'Annual profit cannot be negative'),
        currency: z.string().default('INR'),
      }),
      monthlyExpenses: z.object({
        value: createFloatWithMinMax(0, undefined, 'Monthly expenses cannot be negative'),
        currency: z.string().default('INR'),
      }),
      revenueBreakdown: z.any().optional(),
      monetizationMethods: z.string().min(1, 'Monetization methods are required'),
    }),
    
    sale: z.object({
      askingPrice: z.object({
        value: createFloatWithMinMax(0, undefined, 'Asking price cannot be negative'),
        currency: z.string().default('INR'),
        isNegotiable: z.boolean().optional(),
      }),
      priceMultiple: createFloatWithMinMax(0, undefined, 'Price multiple cannot be negative').optional(),
      reasonForSelling: z
        .string()
        .min(50, 'Reason for selling must be at least 50 characters')
        .max(500, 'Reason for selling cannot exceed 500 characters'),
      assetsIncluded: z
        .string()
        .min(100, 'Assets included must be at least 100 characters')
        .max(500, 'Assets included cannot exceed 500 characters'),
      transitionSupport: z
        .string()
        .min(50, 'Transition support must be at least 50 characters')
        .max(500, 'Transition support cannot exceed 500 characters'),
      financingOptions: z.object({
        isAvailable: z.boolean().optional(),
        details: z.string().optional(),
      }).optional(),
    }),
  }),
});

// Documents (Step 4)
export const documentsSchema = z.object({
  documents: z.array(z.any()).optional(),
});

// Dynamic schema based on listing type
export const getListingSchema = (listingType) => {
  const commonSchema = z.object({
    ...basicInfoSchema.shape,
    ...mediaSchema.shape,
  });
  
  switch (listingType) {
    case LISTING_TYPES.BUSINESS:
      return commonSchema.merge(businessSchema);
    case LISTING_TYPES.FRANCHISE:
      return commonSchema.merge(franchiseSchema);
    case LISTING_TYPES.STARTUP:
      return commonSchema.merge(startupSchema);
    case LISTING_TYPES.INVESTOR:
      return commonSchema.merge(investorSchema);
    case LISTING_TYPES.DIGITAL_ASSET:
      return commonSchema.merge(digitalAssetSchema);
    default:
      return commonSchema.merge(businessSchema);
  }
};