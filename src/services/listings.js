import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    serverTimestamp,
    Timestamp,
    getCountFromServer
  } from 'firebase/firestore';
  import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
  import { db, storage } from '../lib/firebase';
  import { COLLECTIONS, STORAGE_PATHS, LISTING_TYPES, LISTING_STATUS } from '../utils/constants';
  import { generateSlug } from '../utils/helpers';
  
  // Get all listings with pagination and filters
  export const getAllListings = async (options = {}) => {
    try {
      const {
        pageSize = 10,
        sortField = 'createdAt',
        sortDirection = 'desc',
        startAfterDoc = null,
        filters = []
      } = options;
      
      let listingsQuery = collection(db, COLLECTIONS.LISTINGS);
      
      // Apply filters
      if (filters.length > 0) {
        filters.forEach(filter => {
          if (filter.value !== undefined && filter.value !== null && filter.value !== '') {
            listingsQuery = query(listingsQuery, where(filter.field, filter.operator, filter.value));
          }
        });
      }
      
      // Apply sorting
      listingsQuery = query(listingsQuery, orderBy(sortField, sortDirection));
      
      // Apply pagination
      listingsQuery = query(listingsQuery, limit(pageSize));
      
      // Apply startAfter if provided
      if (startAfterDoc) {
        listingsQuery = query(listingsQuery, startAfter(startAfterDoc));
      }
      
      const querySnapshot = await getDocs(listingsQuery);
      
      // Get and format listings
      const listings = [];
      querySnapshot.forEach(doc => {
        listings.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      // Get the last document for pagination
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      
      return {
        success: true,
        listings,
        lastDoc,
        hasMore: listings.length === pageSize
      };
    } catch (error) {
      console.error('Get all listings error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Get total listings count
  export const getListingsCount = async (filters = []) => {
    try {
      let listingsQuery = collection(db, COLLECTIONS.LISTINGS);
      
      // Apply filters
      if (filters.length > 0) {
        filters.forEach(filter => {
          if (filter.value !== undefined && filter.value !== null && filter.value !== '') {
            listingsQuery = query(listingsQuery, where(filter.field, filter.operator, filter.value));
          }
        });
      }
      
      const snapshot = await getCountFromServer(listingsQuery);
      
      return {
        success: true,
        count: snapshot.data().count
      };
    } catch (error) {
      console.error('Get listings count error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Get listing by ID
  export const getListingById = async (listingId) => {
    try {
      const listingDoc = await getDoc(doc(db, COLLECTIONS.LISTINGS, listingId));
      
      if (!listingDoc.exists()) {
        throw new Error('Listing not found');
      }
      
      return {
        success: true,
        listing: {
          id: listingDoc.id,
          ...listingDoc.data()
        }
      };
    } catch (error) {
      console.error('Get listing by ID error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Create new listing
  export const createListing = async (listingData) => {
    try {
      // Validate listing type
      if (!Object.values(LISTING_TYPES).includes(listingData.type)) {
        throw new Error('Invalid listing type');
      }
      
      // Generate slug
      const slug = generateSlug(listingData.name);
      
      // Process and upload images
      const media = {
        galleryImages: [],
        totalImages: 0
      };
      
      if (listingData.galleryImageFiles && listingData.galleryImageFiles.length > 0) {
        // Upload gallery images
        for (const file of listingData.galleryImageFiles) {
          const imagePath = `${STORAGE_PATHS.LISTING_IMAGES}/${Date.now()}_${file.name}`;
          const imageRef = ref(storage, imagePath);
          
          await uploadBytes(imageRef, file);
          const imageUrl = await getDownloadURL(imageRef);
          
          media.galleryImages.push({
            url: imageUrl,
            path: imagePath,
            alt: listingData.name,
            width: 0, // These would be set by client-side code
            height: 0
          });
        }
        
        // Set featured image to first image if not specified
        if (!media.featuredImage && media.galleryImages.length > 0) {
          media.featuredImage = { ...media.galleryImages[0] };
        }
        
        media.totalImages = media.galleryImages.length;
      }
      
      // Prepare listing data for Firestore
      const listingDataForFirestore = {
        // Core fields
        type: listingData.type,
        name: listingData.name,
        slug,
        description: listingData.description,
        shortDescription: listingData.shortDescription || listingData.description.substring(0, 200),
        
        // Media
        media,
        
        // Location
        location: listingData.location || {
          country: 'India',
          state: '',
          city: '',
          address: '',
          pincode: '',
          coordinates: null,
          displayLocation: ''
        },
        
        // Contact info
        contactInfo: listingData.contactInfo || {
          email: '',
          phone: '',
          alternatePhone: '',
          website: '',
          contactName: '',
          preferredContactMethod: 'email',
          socialMedia: {
            facebook: { url: '', handle: '', isVerified: false },
            twitter: { url: '', handle: '', isVerified: false },
            instagram: { url: '', handle: '', isVerified: false },
            linkedin: { url: '', handle: '', isVerified: false }
          }
        },
        
        // Industries and classification
        industries: listingData.industries || [],
        tags: listingData.tags || [],
        
        // Ratings and verification
        rating: {
          average: 0,
          count: 0,
          systemRating: 0,
          ratingComponents: {
            completeness: 0,
            verification: 0,
            documentation: 0,
            engagement: 0,
            longevity: 0,
            financials: 0
          },
          distribution: {
            "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0,
            "6": 0, "7": 0, "8": 0, "9": 0, "10": 0
          }
        },
        reviewCount: 0,
        isVerified: false,
        isFeatured: false,
        
        // Subscription and status
        plan: listingData.plan || 'Free',
        status: listingData.status || LISTING_STATUS.DRAFT,
        statusHistory: [
          {
            status: listingData.status || LISTING_STATUS.DRAFT,
            reason: 'Initial creation',
            timestamp: Timestamp.now(),
            updatedBy: listingData.ownerId || ''
          }
        ],
        
        // Ownership
        ownerId: listingData.ownerId || '',
        ownerName: listingData.ownerName || '',
        
        // Documents
        documents: [],
        
        // Analytics
        analytics: {
          viewCount: 0,
          uniqueViewCount: 0,
          contactCount: 0,
          favoriteCount: 0,
          lastViewed: null,
          conversionRate: 0,
          viewsTimeline: []
        },
        
        // Timestamps
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        publishedAt: null,
        expiresAt: null,
        
        // Deletion
        isDeleted: false,
        deletedAt: null
      };
      
      // Add type-specific fields based on listing type
      switch (listingData.type) {
        case LISTING_TYPES.BUSINESS:
          listingDataForFirestore.businessDetails = listingData.businessDetails || {
            businessType: '',
            entityType: '',
            establishedYear: 0,
            registrationNumber: '',
            gstNumber: '',
            panNumber: '',
            operations: {
              employees: { count: 0, fullTime: 0, partTime: 0 },
              locationType: '',
              leaseInformation: { expiryDate: null, monthlyCost: { value: 0, currency: 'INR' }, isTransferable: false },
              operationDescription: ''
            },
            financials: {
              annualRevenue: { value: 0, currency: 'INR' },
              monthlyRevenue: { value: 0, currency: 'INR' },
              profitMargin: { percentage: 0, trend: 'Stable' },
              revenueTrend: 'Stable',
              inventory: { isIncluded: false, value: { value: 0, currency: 'INR' }, description: '' },
              equipment: { isIncluded: false, value: { value: 0, currency: 'INR' }, description: '' },
              customerConcentration: 0
            },
            sale: {
              askingPrice: { value: 0, currency: 'INR', priceMultiple: 0, isNegotiable: false },
              reasonForSelling: '',
              sellerFinancing: { isAvailable: false, details: '', downPaymentPercentage: 0 },
              transitionPeriod: 0,
              trainingIncluded: '',
              assetsIncluded: '',
              priceMultiple: 0
            }
          };
          break;
          
        case LISTING_TYPES.FRANCHISE:
          listingDataForFirestore.franchiseDetails = listingData.franchiseDetails || {
            franchiseBrand: '',
            franchiseType: '',
            franchiseSince: 0,
            brandEstablished: 0,
            totalUnits: 0,
            franchiseeCount: 0,
            companyOwnedUnits: 0,
            availableTerritories: [],
            investment: {
              franchiseFee: { value: 0, currency: 'INR' },
              royaltyFee: 0,
              royaltyStructure: '',
              marketingFee: 0,
              totalInitialInvestment: { value: 0, currency: 'INR' },
              recurringFees: ''
            },
            support: {
              initialTraining: '',
              trainingDuration: '',
              trainingLocation: '',
              ongoingSupport: '',
              fieldSupport: '',
              marketingSupport: '',
              technologySystems: '',
              siteSelection: false
            },
            performance: {
              averageUnitSales: { value: 0, currency: 'INR' },
              salesGrowth: '',
              averageBreakeven: '',
              successRate: 0,
              franchiseeRequirements: '',
              netWorthRequirement: { value: 0, currency: 'INR' },
              liquidCapitalRequired: { value: 0, currency: 'INR' }
            }
          };
          break;
          
        case LISTING_TYPES.STARTUP:
          listingDataForFirestore.startupDetails = listingData.startupDetails || {
            developmentStage: '',
            registeredName: '',
            foundedDate: null,
            launchDate: null,
            missionStatement: '',
            problemStatement: '',
            solutionDescription: '',
            team: {
              teamSize: 0,
              founders: []
            },
            product: {
              productStage: '',
              intellectualProperty: [],
              technologyStack: '',
              uniqueSellingPoints: ''
            },
            market: {
              totalUsers: 0,
              activeUsers: 0,
              revenueModel: '',
              monthlyRevenue: { value: 0, currency: 'INR' },
              growthRate: 0,
              targetMarket: '',
              marketSizeTAM: { value: 0, currency: 'INR' },
              competitiveAnalysis: ''
            },
            funding: {
              fundingStage: '',
              totalRaisedToDate: { value: 0, currency: 'INR' },
              currentRaisingAmount: { value: 0, currency: 'INR' },
              equityOffered: 0,
              preMoneyValuation: { value: 0, currency: 'INR' },
              useOfFunds: '',
              previousInvestors: '',
              burnRate: { value: 0, currency: 'INR' },
              runway: 0
            }
          };
          break;
          
        case LISTING_TYPES.INVESTOR:
          listingDataForFirestore.investorDetails = listingData.investorDetails || {
            investorType: '',
            yearsOfExperience: 0,
            investmentPhilosophy: '',
            backgroundSummary: '',
            keyAchievements: '',
            investmentTeamSize: 0,
            investment: {
              annualInvestmentTarget: { value: 0, currency: 'INR' },
              preferredRounds: [],
              leadInvestorStatus: false,
              preferredEquityStake: { min: 0, max: 0 },
              decisionTimeline: ''
            },
            focus: {
              primaryIndustries: [],
              secondaryIndustries: [],
              businessStagePreference: [],
              geographicFocus: [],
              investmentCriteria: '',
              minimumRevenue: { value: 0, currency: 'INR' },
              minimumTraction: ''
            },
            portfolio: {
              portfolioSize: 0,
              activeInvestments: 0,
              successStories: '',
              investmentProcess: '',
              postInvestmentSupport: '',
              reportingRequirements: '',
              boardInvolvement: ''
            }
          };
          break;
          
        case LISTING_TYPES.DIGITAL_ASSET:
          listingDataForFirestore.digitalAssetDetails = listingData.digitalAssetDetails || {
            assetType: '',
            platformFramework: '',
            nicheIndustry: '',
            creationDate: null,
            businessModel: '',
            easeOfManagement: '',
            ownerTimeRequired: 0,
            technical: {
              domainName: '',
              domainAuthority: 0,
              domainAge: 0,
              hostingProvider: '',
              monthlyHostingCost: { value: 0, currency: 'INR' },
              technologyStack: '',
              mobileResponsiveness: false,
              contentManagement: '',
              sslSecurity: false
            },
            traffic: {
              monthlyVisitors: 0,
              monthlyPageviews: 0,
              trafficTrend: 'Stable',
              organicTrafficPercentage: 0,
              directTrafficPercentage: 0,
              referralTrafficPercentage: 0,
              socialTrafficPercentage: 0,
              otherTrafficPercentage: 0,
              analyticsVerification: false,
              emailSubscribers: 0,
              socialMediaAccounts: ''
            },
            financials: {
              monthlyRevenue: { value: 0, currency: 'INR' },
              annualRevenue: { value: 0, currency: 'INR' },
              monthlyProfit: { value: 0, currency: 'INR' },
              annualProfit: { value: 0, currency: 'INR' },
              monthlyExpenses: { value: 0, currency: 'INR' },
              revenueBreakdown: {},
              monetizationMethods: ''
            },
            sale: {
              askingPrice: { value: 0, currency: 'INR', isNegotiable: false },
              priceMultiple: 0,
              reasonForSelling: '',
              assetsIncluded: '',
              transitionSupport: '',
              financingOptions: { isAvailable: false, details: '' }
            }
          };
          break;
      }
      
      // Save to Firestore
      const docRef = await addDoc(collection(db, COLLECTIONS.LISTINGS), listingDataForFirestore);
      
      return {
        success: true,
        listing: {
          id: docRef.id,
          ...listingDataForFirestore
        }
      };
    } catch (error) {
      console.error('Create listing error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Update listing
  export const updateListing = async (listingId, listingData) => {
    try {
      // Check if listing exists
      const listingDoc = await getDoc(doc(db, COLLECTIONS.LISTINGS, listingId));
      
      if (!listingDoc.exists()) {
        throw new Error('Listing not found');
      }
      
      const existingListing = listingDoc.data();
      
      // Process and upload new images
      let media = existingListing.media || {
        galleryImages: [],
        totalImages: 0
      };
      
      if (listingData.galleryImageFiles && listingData.galleryImageFiles.length > 0) {
        // Upload new gallery images
        for (const file of listingData.galleryImageFiles) {
          const imagePath = `${STORAGE_PATHS.LISTING_IMAGES}/${Date.now()}_${file.name}`;
          const imageRef = ref(storage, imagePath);
          
          await uploadBytes(imageRef, file);
          const imageUrl = await getDownloadURL(imageRef);
          
          media.galleryImages.push({
            url: imageUrl,
            path: imagePath,
            alt: listingData.name || existingListing.name,
            width: 0,
            height: 0
          });
        }
        
        // Update featured image if needed
        if (listingData.featuredImageIndex !== undefined && 
            media.galleryImages[listingData.featuredImageIndex]) {
          media.featuredImage = { ...media.galleryImages[listingData.featuredImageIndex] };
        } else if (!media.featuredImage && media.galleryImages.length > 0) {
          media.featuredImage = { ...media.galleryImages[0] };
        }
        
        media.totalImages = media.galleryImages.length;
      }
      
      // Remove deleted images
      if (listingData.deletedImageIndices && listingData.deletedImageIndices.length > 0) {
        // Sort indices in descending order to avoid index shifting
        const sortedIndices = [...listingData.deletedImageIndices].sort((a, b) => b - a);
        
        for (const index of sortedIndices) {
          if (index >= 0 && index < media.galleryImages.length) {
            // Delete from storage
            try {
              const imagePath = media.galleryImages[index].path;
              const imageRef = ref(storage, imagePath);
              await deleteObject(imageRef);
            } catch (error) {
              console.warn('Error deleting image from storage:', error);
            }
            
            // Remove from galleryImages
            media.galleryImages.splice(index, 1);
          }
        }
        
        // Update featured image if it was deleted
        if (!media.galleryImages.some(img => img.url === media.featuredImage?.url)) {
          media.featuredImage = media.galleryImages.length > 0 ? { ...media.galleryImages[0] } : null;
        }
        
        media.totalImages = media.galleryImages.length;
      }
      
      // Add status history if status changed
      let statusHistory = existingListing.statusHistory || [];
      if (listingData.status && listingData.status !== existingListing.status) {
        statusHistory.push({
          status: listingData.status,
          reason: listingData.statusReason || 'Status updated',
          timestamp: Timestamp.now(),
          updatedBy: listingData.updatedBy || existingListing.ownerId || ''
        });
      }
      
      // Generate slug if name changed
      let slug = existingListing.slug;
      if (listingData.name && listingData.name !== existingListing.name) {
        slug = generateSlug(listingData.name);
      }
      
      // Prepare update data
      const updateData = {
        ...listingData,
        slug,
        media,
        statusHistory,
        updatedAt: serverTimestamp()
      };
      
      // Remove fields that should not be updated
      delete updateData.galleryImageFiles;
      delete updateData.deletedImageIndices;
      delete updateData.featuredImageIndex;
      delete updateData.createdAt;
      
      // Update publishedAt if being published for the first time
      if (listingData.status === LISTING_STATUS.PUBLISHED && existingListing.status !== LISTING_STATUS.PUBLISHED) {
        updateData.publishedAt = serverTimestamp();
      }
      
      // Calculate expiry date if plan changed or being published
      if ((listingData.plan && listingData.plan !== existingListing.plan) ||
          (listingData.status === LISTING_STATUS.PUBLISHED && !existingListing.expiresAt)) {
        
        let durationDays = 30; // Default duration
        
        switch (listingData.plan || existingListing.plan) {
          case 'Free':
            durationDays = 30;
            break;
          case 'Basic':
            durationDays = 60;
            break;
          case 'Advanced':
            durationDays = 90;
            break;
          case 'Premium':
            durationDays = 120;
            break;
          case 'Platinum':
            durationDays = 365; // Effectively permanent
            break;
        }
        
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + durationDays);
        updateData.expiresAt = Timestamp.fromDate(expiryDate);
      }
      
      // Update listing in Firestore
      await updateDoc(doc(db, COLLECTIONS.LISTINGS, listingId), updateData);
      
      return {
        success: true,
        listing: {
          id: listingId,
          ...existingListing,
          ...updateData
        }
      };
    } catch (error) {
      console.error('Update listing error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Delete listing (soft delete)
  export const deleteListing = async (listingId) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.LISTINGS, listingId), {
        status: LISTING_STATUS.ARCHIVED,
        isDeleted: true,
        deletedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return {
        success: true
      };
    } catch (error) {
      console.error('Delete listing error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Update listing status
  export const updateListingStatus = async (listingId, status, reason = '') => {
    try {
      // Check if listing exists
      const listingDoc = await getDoc(doc(db, COLLECTIONS.LISTINGS, listingId));
      
      if (!listingDoc.exists()) {
        throw new Error('Listing not found');
      }
      
      const existingListing = listingDoc.data();
      
      // Add to status history
      const statusHistory = [...(existingListing.statusHistory || [])];
      statusHistory.push({
        status,
        reason,
        timestamp: Timestamp.now(),
        updatedBy: '' // Should be set by calling function
      });
      
      // Update data
      const updateData = {
        status,
        statusReason: reason,
        statusHistory,
        updatedAt: serverTimestamp()
      };
      
      // Update publishedAt if being published for the first time
      if (status === LISTING_STATUS.PUBLISHED && existingListing.status !== LISTING_STATUS.PUBLISHED) {
        updateData.publishedAt = serverTimestamp();
      }
      
      // Update listing in Firestore
      await updateDoc(doc(db, COLLECTIONS.LISTINGS, listingId), updateData);
      
      return {
        success: true
      };
    } catch (error) {
      console.error('Update listing status error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Get listings by type
  export const getListingsByType = async (type, options = {}) => {
    try {
      const {
        pageSize = 10,
        sortField = 'createdAt',
        sortDirection = 'desc',
        startAfterDoc = null,
        filters = []
      } = options;
      
      let listingsQuery = collection(db, COLLECTIONS.LISTINGS);
      
      // Query by type
      listingsQuery = query(listingsQuery, where('type', '==', type));
      
      // Apply additional filters
      if (filters.length > 0) {
        filters.forEach(filter => {
          if (filter.value !== undefined && filter.value !== null && filter.value !== '') {
            listingsQuery = query(listingsQuery, where(filter.field, filter.operator, filter.value));
          }
        });
      }
      
      // Apply sorting
      listingsQuery = query(listingsQuery, orderBy(sortField, sortDirection));
      
      // Apply pagination
      listingsQuery = query(listingsQuery, limit(pageSize));
      
      // Apply startAfter if provided
      if (startAfterDoc) {
        listingsQuery = query(listingsQuery, startAfter(startAfterDoc));
      }
      
      const querySnapshot = await getDocs(listingsQuery);
      
      // Get and format listings
      const listings = [];
      querySnapshot.forEach(doc => {
        listings.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      // Get the last document for pagination
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      
      return {
        success: true,
        listings,
        lastDoc,
        hasMore: listings.length === pageSize
      };
    } catch (error) {
      console.error('Get listings by type error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Get listings by status
  export const getListingsByStatus = async (status, options = {}) => {
    try {
      const {
        pageSize = 10,
        sortField = 'createdAt',
        sortDirection = 'desc',
        startAfterDoc = null,
        filters = []
      } = options;
      
      let listingsQuery = collection(db, COLLECTIONS.LISTINGS);
      
      // Query by status
      listingsQuery = query(listingsQuery, where('status', '==', status));
      
      // Apply additional filters
      if (filters.length > 0) {
        filters.forEach(filter => {
          if (filter.value !== undefined && filter.value !== null && filter.value !== '') {
            listingsQuery = query(listingsQuery, where(filter.field, filter.operator, filter.value));
          }
        });
      }
      
      // Apply sorting
      listingsQuery = query(listingsQuery, orderBy(sortField, sortDirection));
      
      // Apply pagination
      listingsQuery = query(listingsQuery, limit(pageSize));
      
      // Apply startAfter if provided
      if (startAfterDoc) {
        listingsQuery = query(listingsQuery, startAfter(startAfterDoc));
      }
      
      const querySnapshot = await getDocs(listingsQuery);
      
      // Get and format listings
      const listings = [];
      querySnapshot.forEach(doc => {
        listings.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      // Get the last document for pagination
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      
      return {
        success: true,
        listings,
        lastDoc,
        hasMore: listings.length === pageSize
      };
    } catch (error) {
      console.error('Get listings by status error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Get featured listings
  export const getFeaturedListings = async (options = {}) => {
    try {
      const {
        pageSize = 10,
        sortField = 'createdAt',
        sortDirection = 'desc',
        startAfterDoc = null,
        filters = []
      } = options;
      
      let listingsQuery = collection(db, COLLECTIONS.LISTINGS);
      
      // Query featured listings
      listingsQuery = query(listingsQuery, where('isFeatured', '==', true));
      
      // Only published listings
      listingsQuery = query(listingsQuery, where('status', '==', LISTING_STATUS.PUBLISHED));
      
      // Apply additional filters
      if (filters.length > 0) {
        filters.forEach(filter => {
          if (filter.value !== undefined && filter.value !== null && filter.value !== '') {
            listingsQuery = query(listingsQuery, where(filter.field, filter.operator, filter.value));
          }
        });
      }
      
      // Apply sorting
      listingsQuery = query(listingsQuery, orderBy(sortField, sortDirection));
      
      // Apply pagination
      listingsQuery = query(listingsQuery, limit(pageSize));
      
      // Apply startAfter if provided
      if (startAfterDoc) {
        listingsQuery = query(listingsQuery, startAfter(startAfterDoc));
      }
      
      const querySnapshot = await getDocs(listingsQuery);
      
      // Get and format listings
      const listings = [];
      querySnapshot.forEach(doc => {
        listings.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      // Get the last document for pagination
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      
      return {
        success: true,
        listings,
        lastDoc,
        hasMore: listings.length === pageSize
      };
    } catch (error) {
      console.error('Get featured listings error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Toggle featured status
  export const toggleFeaturedStatus = async (listingId, isFeatured, featuredUntil = null) => {
    try {
      // Generate expiry date for featured status if not provided
      let featuredExpiry = null;
      if (isFeatured) {
        if (featuredUntil) {
          featuredExpiry = featuredUntil;
        } else {
          // Default to 30 days
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 30);
          featuredExpiry = Timestamp.fromDate(expiryDate);
        }
      }
      
      await updateDoc(doc(db, COLLECTIONS.LISTINGS, listingId), {
        isFeatured,
        featuredUntil: featuredExpiry,
        updatedAt: serverTimestamp()
      });
      
      return {
        success: true
      };
    } catch (error) {
      console.error('Toggle featured status error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Get recent listings
  export const getRecentListings = async (limit = 5) => {
    try {
      const listingsQuery = query(
        collection(db, COLLECTIONS.LISTINGS),
        orderBy('createdAt', 'desc'),
        limit(limit)
      );
      
      const querySnapshot = await getDocs(listingsQuery);
      
      // Get and format listings
      const listings = [];
      querySnapshot.forEach(doc => {
        listings.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return {
        success: true,
        listings
      };
    } catch (error) {
      console.error('Get recent listings error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Get listing creation counts by period
  export const getListingCreationCounts = async (periodType = 'monthly', limit = 12) => {
    try {
      // Get all listings
      const listingsQuery = query(
        collection(db, COLLECTIONS.LISTINGS),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(listingsQuery);
      
      // Group listings by period
      const listingsByPeriod = {};
      
      querySnapshot.forEach(doc => {
        const listingData = doc.data();
        const createdAt = listingData.createdAt?.toDate();
        
        if (!createdAt) return;
        
        let periodKey;
        
        if (periodType === 'daily') {
          periodKey = createdAt.toISOString().split('T')[0]; // YYYY-MM-DD
        } else if (periodType === 'weekly') {
          // Get the Monday of the week
          const day = createdAt.getDay();
          const diff = createdAt.getDate() - day + (day === 0 ? -6 : 1);
          const monday = new Date(createdAt);
          monday.setDate(diff);
          periodKey = monday.toISOString().split('T')[0];
        } else if (periodType === 'monthly') {
          periodKey = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}`;
        } else if (periodType === 'yearly') {
          periodKey = `${createdAt.getFullYear()}`;
        }
        
        if (!listingsByPeriod[periodKey]) {
          listingsByPeriod[periodKey] = 0;
        }
        
        listingsByPeriod[periodKey]++;
      });
      
      // Convert to array and sort
      let creationCounts = Object.entries(listingsByPeriod).map(([period, count]) => ({
        period,
        count
      }));
      
      creationCounts.sort((a, b) => a.period.localeCompare(b.period));
      
      // Limit to specified number of periods
      creationCounts = creationCounts.slice(-limit);
      
      return {
        success: true,
        data: creationCounts
      };
    } catch (error) {
      console.error('Get listing creation counts error:', error);
      return {
        success: false,
        error
      };
    }
  };