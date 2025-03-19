import * as z from 'zod';

// Base Listing Schema - Common fields for all listing types
export const baseListingSchema = z.object({
  name: z.string()
    .min(3, { message: 'Listing name must be at least 3 characters' })
    .max(100, { message: 'Listing name cannot exceed 100 characters' })
    .refine(val => !/[^\w\s&-]/.test(val), {
      message: 'Name can only contain letters, numbers, spaces, hyphens and ampersands'
    }),
  
  type: z.enum(['business', 'franchise', 'startup', 'investor', 'digital_asset'], {
    required_error: 'Please select a listing type',
  }),
  
  industries: z.array(z.string())
    .min(1, { message: 'Select at least one industry' })
    .max(3, { message: 'You can select up to 3 industries' }),
  
  description: z.string()
    .min(100, { message: 'Description must be at least 100 characters' })
    .max(5000, { message: 'Description cannot exceed 5000 characters' }),
  
  status: z.enum(['draft', 'pending', 'published', 'rejected', 'archived'], {
    required_error: 'Please select a status',
  }).default('draft'),
  
  plan: z.enum(['free', 'basic', 'advanced', 'premium', 'platinum'], {
    required_error: 'Please select a plan type',
  }).default('free'),
  
  location: z.object({
    country: z.string().default('India'),
    state: z.string().min(1, { message: 'State is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    address: z.string().optional(),
    pincode: z.string().optional(),
  }),
  
  contactInfo: z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
    phone: z.string().optional(),
    alternatePhone: z.string().optional(),
    website: z.string().url().optional().or(z.literal('')),
    contactName: z.string().optional(),
    preferredContactMethod: z.enum(['email', 'phone', 'whatsapp']).optional(),
  }),
  
  media: z.object({
    featuredImage: z.object({
      url: z.string().optional(),
      path: z.string().optional(),
      alt: z.string().optional(),
    }).optional(),
    galleryImages: z.array(
      z.object({
        url: z.string(),
        path: z.string(),
        alt: z.string().optional(),
      })
    )
    .min(3, { message: 'Upload at least 3 images' })
    .max(10, { message: 'Maximum 10 images allowed' }),
  }),
});

// Business Listing Schema
export const businessSchema = baseListingSchema.extend({
  businessDetails: z.object({
    businessType: z.string().min(1, { message: 'Business type is required' }),
    entityType: z.string().min(1, { message: 'Entity type is required' }),
    establishedYear: z.number()
      .int()
      .min(1900, { message: 'Year must be 1900 or later' })
      .max(new Date().getFullYear(), { message: 'Year cannot be in the future' }),
    registrationNumber: z.string().min(1, { message: 'Registration number is required' }),
    gstNumber: z.string().optional(),
    panNumber: z.string().optional(),
    
    operations: z.object({
      employees: z.object({
        count: z.number().int().min(0, { message: 'Must be a positive number' }),
        fullTime: z.number().int().min(0, { message: 'Must be a positive number' }),
        partTime: z.number().int().min(0, { message: 'Must be a positive number' }),
      }),
      locationType: z.string().min(1, { message: 'Location type is required' }),
      leaseInformation: z.object({
        expiryDate: z.date().optional(),
        monthlyCost: z.object({
          value: z.number().min(0),
          currency: z.string().default('INR'),
        }).optional(),
        isTransferable: z.boolean().optional(),
      }).optional(),
      operationDescription: z.string()
        .min(100, { message: 'Description must be at least 100 characters' })
        .max(1000, { message: 'Description cannot exceed 1000 characters' }),
    }),
    
    financials: z.object({
      annualRevenue: z.object({
        value: z.number().min(0),
        currency: z.string().default('INR'),
      }),
      monthlyRevenue: z.object({
        value: z.number().min(0),
        currency: z.string().default('INR'),
      }),
      profitMargin: z.object({
        percentage: z.number().min(0).max(100),
        trend: z.enum(['growing', 'stable', 'declining']).optional(),
      }),
      revenueTrend: z.enum(['growing', 'stable', 'declining']),
      inventory: z.object({
        isIncluded: z.boolean(),
        value: z.object({
          value: z.number().min(0),
          currency: z.string().default('INR'),
        }).optional(),
        description: z.string().optional(),
      }).optional(),
      equipment: z.object({
        isIncluded: z.boolean(),
        value: z.object({
          value: z.number().min(0),
          currency: z.string().default('INR'),
        }),
        description: z.string(),
      }),
      customerConcentration: z.number().min(0).max(100),
    }),
    
    sale: z.object({
      askingPrice: z.object({
        value: z.number().min(0),
        currency: z.string().default('INR'),
        isNegotiable: z.boolean().optional(),
        priceMultiple: z.number().optional(),
      }),
      reasonForSelling: z.string()
        .min(50, { message: 'Reason must be at least 50 characters' })
        .max(500, { message: 'Reason cannot exceed 500 characters' }),
      sellerFinancing: z.object({
        isAvailable: z.boolean(),
        details: z.string().optional(),
        downPaymentPercentage: z.number().min(10).max(100).optional(),
      }).optional(),
      transitionPeriod: z.number().min(0).max(12),
      trainingIncluded: z.string()
        .min(50, { message: 'Description must be at least 50 characters' })
        .max(500, { message: 'Description cannot exceed 500 characters' }),
      assetsIncluded: z.string()
        .min(100, { message: 'Description must be at least 100 characters' })
        .max(1000, { message: 'Description cannot exceed 1000 characters' }),
    }),
  }),
  documents: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      name: z.string(),
      description: z.string().optional(),
      url: z.string(),
      path: z.string(),
      format: z.string(),
      size: z.number(),
      isPublic: z.boolean().default(false),
      uploadedAt: z.date().or(z.string()),
      verificationStatus: z.enum(['pending', 'verified', 'rejected']).default('pending'),
    })
  ).optional(),
});

// Franchise Listing Schema
export const franchiseSchema = baseListingSchema.extend({
  franchiseDetails: z.object({
    franchiseBrand: z.string()
      .min(3, { message: 'Brand name must be at least 3 characters' })
      .max(100, { message: 'Brand name cannot exceed 100 characters' }),
    franchiseType: z.string().min(1, { message: 'Franchise type is required' }),
    franchiseSince: z.number()
      .int()
      .min(1900, { message: 'Year must be 1900 or later' })
      .max(new Date().getFullYear(), { message: 'Year cannot be in the future' }),
    brandEstablished: z.number()
      .int()
      .min(1900, { message: 'Year must be 1900 or later' }),
    totalUnits: z.number().int().min(1, { message: 'Must have at least 1 unit' }),
    franchiseeCount: z.number().int().min(0),
    companyOwnedUnits: z.number().int().min(0),
    availableTerritories: z.array(z.string()).min(1, { message: 'At least one territory is required' }),
    
    investment: z.object({
      franchiseFee: z.object({
        value: z.number().min(0),
        currency: z.string().default('INR'),
      }),
      royaltyFee: z.number().min(0).max(50),
      royaltyStructure: z.string()
        .min(50, { message: 'Description must be at least 50 characters' })
        .max(300, { message: 'Description cannot exceed 300 characters' }),
      marketingFee: z.number().min(0).max(20),
      totalInitialInvestment: z.object({
        value: z.number().min(0),
        currency: z.string().default('INR'),
      }),
      recurringFees: z.string()
        .min(50, { message: 'Description must be at least 50 characters' })
        .max(300, { message: 'Description cannot exceed 300 characters' }),
    }),
    
    support: z.object({
      initialTraining: z.string()
        .min(100, { message: 'Description must be at least 100 characters' })
        .max(500, { message: 'Description cannot exceed 500 characters' }),
      trainingDuration: z.string().min(1, { message: 'Duration is required' }),
      trainingLocation: z.string().min(1, { message: 'Location is required' }),
      ongoingSupport: z.string()
        .min(100, { message: 'Description must be at least 100 characters' })
        .max(500, { message: 'Description cannot exceed 500 characters' }),
      fieldSupport: z.string().min(1, { message: 'Field support details are required' }),
      marketingSupport: z.string()
        .min(100, { message: 'Description must be at least 100 characters' })
        .max(500, { message: 'Description cannot exceed 500 characters' }),
      technologySystems: z.string()
        .min(50, { message: 'Description must be at least 50 characters' })
        .max(300, { message: 'Description cannot exceed 300 characters' }),
      siteSelection: z.boolean(),
    }),
    
    performance: z.object({
      averageUnitSales: z.object({
        value: z.number().min(0),
        currency: z.string().default('INR'),
      }),
      salesGrowth: z.string().min(1, { message: 'Sales growth information is required' }),
      averageBreakeven: z.string().min(1, { message: 'Breakeven information is required' }),
      successRate: z.number().min(0).max(100).optional(),
      franchiseeRequirements: z.string()
        .min(100, { message: 'Description must be at least 100 characters' })
        .max(500, { message: 'Description cannot exceed 500 characters' }),
      netWorthRequirement: z.object({
        value: z.number().min(0),
        currency: z.string().default('INR'),
      }),
      liquidCapitalRequired: z.object({
        value: z.number().min(0),
        currency: z.string().default('INR'),
      }),
    }),
  }),
  documents: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      name: z.string(),
      description: z.string().optional(),
      url: z.string(),
      path: z.string(),
      format: z.string(),
      size: z.number(),
      isPublic: z.boolean().default(false),
      uploadedAt: z.date().or(z.string()),
      verificationStatus: z.enum(['pending', 'verified', 'rejected']).default('pending'),
    })
  ).optional(),
});

// Startup Listing Schema
export const startupSchema = baseListingSchema.extend({
  startupDetails: z.object({
    developmentStage: z.string().min(1, { message: 'Development stage is required' }),
    registeredName: z.string()
      .min(3, { message: 'Registered name must be at least 3 characters' })
      .max(100, { message: 'Registered name cannot exceed 100 characters' }),
    foundedDate: z.date().or(z.string()),
    launchDate: z.date().or(z.string()).optional(),
    missionStatement: z.string()
      .min(50, { message: 'Mission statement must be at least 50 characters' })
      .max(300, { message: 'Mission statement cannot exceed 300 characters' }),
    problemStatement: z.string()
      .min(50, { message: 'Problem statement must be at least 50 characters' })
      .max(300, { message: 'Problem statement cannot exceed 300 characters' }),
    solutionDescription: z.string()
      .min(100, { message: 'Solution description must be at least 100 characters' })
      .max(500, { message: 'Solution description cannot exceed 500 characters' }),
    
    team: z.object({
      size: z.number().int().min(1),
      founders: z.array(z.object({
        name: z.string().min(2).max(100),
        role: z.string().min(2).max(100),
        experience: z.string().min(50).max(300),
        linkedin: z.string().url().optional().or(z.literal('')),
      })).min(1).max(10),
    }),
    
    product: z.object({
      stage: z.string().min(1, { message: 'Product stage is required' }),
      intellectualProperty: z.array(z.string()).optional(),
      technologyStack: z.string().max(300).optional(),
      uniqueSellingPoints: z.string()
        .min(100, { message: 'USP must be at least 100 characters' })
        .max(500, { message: 'USP cannot exceed 500 characters' }),
    }),
    
    market: z.object({
      targetMarket: z.string()
        .min(50, { message: 'Description must be at least 50 characters' })
        .max(300, { message: 'Description cannot exceed 300 characters' }),
      marketSize: z.object({
        value: z.number().min(0),
        currency: z.string().default('INR'),
      }),
      competitiveAnalysis: z.string()
        .min(100, { message: 'Analysis must be at least 100 characters' })
        .max(500, { message: 'Analysis cannot exceed 500 characters' }),
    }),
    
    traction: z.object({
      totalUsers: z.number().int().min(0).optional(),
      activeUsers: z.number().int().min(0).optional(),
      revenueModel: z.string()
        .min(50, { message: 'Description must be at least 50 characters' })
        .max(300, { message: 'Description cannot exceed 300 characters' }),
      monthlyRevenue: z.object({
        value: z.number().min(0),
        currency: z.string().default('INR'),
      }).optional(),
      growthRate: z.number().min(0).max(1000).optional(),
    }),
    
    funding: z.object({
      fundingStage: z.string().min(1, { message: 'Funding stage is required' }),
      totalRaised: z.object({
        value: z.number().min(0),
        currency: z.string().default('INR'),
      }).optional(),
      currentRaisingAmount: z.object({
        value: z.number().min(0),
        currency: z.string().default('INR'),
      }),
      equityOffered: z.number().min(0).max(100),
      preMoneyValuation: z.object({
        value: z.number().min(0),
        currency: z.string().default('INR'),
      }),
      useOfFunds: z.string()
        .min(100, { message: 'Description must be at least 100 characters' })
        .max(500, { message: 'Description cannot exceed 500 characters' }),
      previousInvestors: z.string().max(300).optional(),
      burnRate: z.object({
        value: z.number().min(0),
        currency: z.string().default('INR'),
      }).optional(),
      runway: z.number().min(0).max(60).optional(),
    }),
  }),
  documents: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      name: z.string(),
      description: z.string().optional(),
      url: z.string(),
      path: z.string(),
      format: z.string(),
      size: z.number(),
      isPublic: z.boolean().default(false),
      uploadedAt: z.date().or(z.string()),
      verificationStatus: z.enum(['pending', 'verified', 'rejected']).default('pending'),
    })
  ).optional(),
});

// Investor Listing Schema
export const investorSchema = baseListingSchema.extend({
  investorDetails: z.object({
    investorType: z.string().min(1, { message: 'Investor type is required' }),
    yearsOfExperience: z.number().int().min(0).max(100),
    investmentPhilosophy: z.string()
      .min(100, { message: 'Description must be at least 100 characters' })
      .max(500, { message: 'Description cannot exceed 500 characters' }),
    backgroundSummary: z.string()
      .min(100, { message: 'Summary must be at least 100 characters' })
      .max(500, { message: 'Summary cannot exceed 500 characters' }),
    keyAchievements: z.string().max(500).optional(),
    investmentTeamSize: z.number().int().min(1).optional(),
    
    investment: z.object({
      annualInvestmentTarget: z.object({
        value: z.number().min(0),
        currency: z.string().default('INR'),
      }).optional(),
      preferredRounds: z.array(z.string()).min(1, { message: 'At least one preferred round is required' }),
      leadInvestorStatus: z.boolean(),
      preferredEquityStake: z.object({
        min: z.number().min(0).max(100),
        max: z.number().min(0).max(100),
      }).optional(),
      decisionTimeline: z.string().min(1, { message: 'Decision timeline is required' }),
    }),
    
    focus: z.object({
      primaryIndustries: z.array(z.string()).min(1).max(5),
      secondaryIndustries: z.array(z.string()).optional(),
      businessStagePreference: z.array(z.string()).min(1),
      geographicFocus: z.array(z.string()).min(1),
      investmentCriteria: z.string()
        .min(100, { message: 'Criteria must be at least 100 characters' })
        .max(500, { message: 'Criteria cannot exceed 500 characters' }),
      minimumRevenue: z.object({
        value: z.number().min(0),
        currency: z.string().default('INR'),
      }).optional(),
      minimumTraction: z.string().max(300).optional(),
    }),
    
    portfolio: z.object({
      portfolioSize: z.number().int().min(0).optional(),
      activeInvestments: z.number().int().min(0).optional(),
      successStories: z.string().max(500).optional(),
      investmentProcess: z.string()
        .min(100, { message: 'Description must be at least 100 characters' })
        .max(500, { message: 'Description cannot exceed 500 characters' }),
      postInvestmentSupport: z.string()
        .min(100, { message: 'Description must be at least 100 characters' })
        .max(500, { message: 'Description cannot exceed 500 characters' }),
      reportingRequirements: z.string().max(300).optional(),
      boardInvolvement: z.string().optional(),
    }),
  }),
  documents: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      name: z.string(),
      description: z.string().optional(),
      url: z.string(),
      path: z.string(),
      format: z.string(),
      size: z.number(),
      isPublic: z.boolean().default(false),
      uploadedAt: z.date().or(z.string()),
      verificationStatus: z.enum(['pending', 'verified', 'rejected']).default('pending'),
    })
  ).optional(),
});

// Digital Asset Listing Schema
export const digitalAssetSchema = baseListingSchema.extend({
  digitalAssetDetails: z.object({
    assetType: z.string().min(1, { message: 'Asset type is required' }),
    platformFramework: z.string()
      .min(2, { message: 'Platform must be at least 2 characters' })
      .max(100, { message: 'Platform cannot exceed 100 characters' }),
    nicheIndustry: z.string()
      .min(2, { message: 'Niche must be at least 2 characters' })
      .max(100, { message: 'Niche cannot exceed 100 characters' }),
    creationDate: z.date().or(z.string()),
    businessModel: z.string()
      .min(100, { message: 'Description must be at least 100 characters' })
      .max(500, { message: 'Description cannot exceed 500 characters' }),
    easeOfManagement: z.enum(['passive', 'semi-passive', 'active']),
    ownerTimeRequired: z.number().min(0).max(168),
    
    technical: z.object({
      domainName: z.string().min(1, { message: 'Domain name is required' }),
      domainAuthority: z.number().min(0).max(100).optional(),
      domainAge: z.number().min(0).max(30).optional(),
      hostingProvider: z.string().min(2).max(100),
      monthlyHostingCost: z.object({
        value: z.number().min(0),
        currency: z.string().default('INR'),
      }),
      technologyStack: z.string()
        .min(50, { message: 'Description must be at least 50 characters' })
        .max(300, { message: 'Description cannot exceed 300 characters' }),
      mobileResponsiveness: z.boolean(),
      contentManagement: z.string().min(2).max(100),
      sslSecurity: z.boolean(),
    }),
    
    traffic: z.object({
      monthlyVisitors: z.number().int().min(0),
      monthlyPageviews: z.number().int().min(0),
      trafficTrend: z.enum(['growing', 'stable', 'declining']),
      organicTrafficPercentage: z.number().min(0).max(100),
      directTrafficPercentage: z.number().min(0).max(100),
      referralTrafficPercentage: z.number().min(0).max(100),
      socialTrafficPercentage: z.number().min(0).max(100),
      otherTrafficPercentage: z.number().min(0).max(100),
      analyticsVerification: z.boolean(),
      emailSubscribers: z.number().int().min(0).optional(),
      socialMediaAccounts: z.string().max(300).optional(),
    }).refine(
      (data) => {
        const total = 
          data.organicTrafficPercentage +
          data.directTrafficPercentage +
          data.referralTrafficPercentage +
          data.socialTrafficPercentage +
          data.otherTrafficPercentage;
        return Math.abs(total - 100) < 0.1; // Allow small rounding errors
      },
      {
        message: "Traffic percentage sources must total 100%",
        path: ["trafficSources"]
      }
    ),
    
    financials: z.object({
      monthlyRevenue: z.object({
        value: z.number().min(0),
        currency: z.string().default('INR'),
      }),
      annualRevenue: z.object({
        value: z.number().min(0),
        currency: z.string().default('INR'),
      }),
      monthlyProfit: z.object({
        value: z.number().min(0),
        currency: z.string().default('INR'),
      }),
      revenueSources: z.object({
        adsPercentage: z.number().min(0).max(100).optional(),
        affiliatePercentage: z.number().min(0).max(100).optional(),
        productPercentage: z.number().min(0).max(100).optional(),
        subscriptionPercentage: z.number().min(0).max(100).optional(),
        servicesPercentage: z.number().min(0).max(100).optional(),
        otherPercentage: z.number().min(0).max(100).optional(),
      }).refine(
        (data) => {
          const total = 
            (data.adsPercentage || 0) +
            (data.affiliatePercentage || 0) +
            (data.productPercentage || 0) +
            (data.subscriptionPercentage || 0) +
            (data.servicesPercentage || 0) +
            (data.otherPercentage || 0);
          return Math.abs(total - 100) < 0.1 || total === 0; // Allow small rounding errors or all zeros
        },
        {
          message: "Revenue percentage sources must total 100%",
          path: ["revenueSources"]
        }
      ),
      monthlyExpenses: z.object({
        value: z.number().min(0),
        currency: z.string().default('INR'),
      }),
      expenseBreakdown: z.string().max(300).optional(),
      revenueGrowth: z.number().min(-100).optional(),
      monetizationDetails: z.string()
        .min(100, { message: 'Description must be at least 100 characters' })
        .max(500, { message: 'Description cannot exceed 500 characters' }),
    }),
    
    sale: z.object({
      askingPrice: z.object({
        value: z.number().min(0),
        currency: z.string().default('INR'),
        priceMultiple: z.number().optional(),
        isNegotiable: z.boolean().optional(),
      }),
      reasonForSelling: z.string()
        .min(50, { message: 'Reason must be at least 50 characters' })
        .max(500, { message: 'Reason cannot exceed 500 characters' }),
      assetsIncluded: z.string()
        .min(100, { message: 'Description must be at least 100 characters' })
        .max(1000, { message: 'Description cannot exceed 1000 characters' }),
      trainingSupport: z.string()
        .min(50, { message: 'Description must be at least 50 characters' })
        .max(500, { message: 'Description cannot exceed 500 characters' }),
      transferMethod: z.string().min(1, { message: 'Transfer method is required' }),
      sellerFinancing: z.object({
        isAvailable: z.boolean(),
        details: z.string().optional(),
        downPaymentPercentage: z.number().min(10).max(100).optional(),
      }).optional(),
    }),
  }),
  documents: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      name: z.string(),
      description: z.string().optional(),
      url: z.string(),
      path: z.string(),
      format: z.string(),
      size: z.number(),
      isPublic: z.boolean().default(false),
      uploadedAt: z.date().or(z.string()),
      verificationStatus: z.enum(['pending', 'verified', 'rejected']).default('pending'),
    })
  ).optional(),
});

// Function to get the appropriate schema based on listing type
export const getListingSchema = (type) => {
  switch (type) {
    case 'business':
      return businessSchema;
    case 'franchise':
      return franchiseSchema;
    case 'startup':
      return startupSchema;
    case 'investor':
      return investorSchema;
    case 'digital_asset':
      return digitalAssetSchema;
    default:
      return baseListingSchema;
  }
};