import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy, limit, startAfter, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * Constants for Firestore collections
 */
const LISTINGS_COLLECTION = 'Listings';

/**
 * Create a new listing
 * @param {Object} listingData - The listing data to create
 * @returns {Promise<string>} - The ID of the created listing
 */
export const createListing = async (listingData) => {
  try {
    // Add created and updated timestamps
    const dataWithTimestamps = {
      ...listingData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      // Initialize additional fields
      isDeleted: false,
      analytics: {
        viewCount: 0,
        uniqueViewCount: 0,
        contactCount: 0,
        favoriteCount: 0,
      },
      statusHistory: [
        {
          status: listingData.status || 'pending',
          reason: 'Initial submission',
          timestamp: serverTimestamp(),
          updatedBy: listingData.ownerId,
        },
      ],
    };

    // Create a document with auto-generated ID
    const docRef = await addDoc(collection(db, LISTINGS_COLLECTION), dataWithTimestamps);
    
    // Update the document with its ID
    await updateDoc(docRef, { id: docRef.id });
    
    return docRef.id;
  } catch (error) {
    console.error('Error creating listing:', error);
    throw error;
  }
};

/**
 * Get a listing by ID
 * @param {string} id - The listing ID
 * @returns {Promise<Object|null>} - The listing data or null if not found
 */
export const getListingById = async (id) => {
  try {
    const docRef = doc(db, LISTINGS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error getting listing with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Update a listing
 * @param {string} id - The listing ID
 * @param {Object} listingData - The listing data to update
 * @returns {Promise<void>}
 */
export const updateListing = async (id, listingData) => {
  try {
    const docRef = doc(db, LISTINGS_COLLECTION, id);
    
    // Add updated timestamp
    const dataWithTimestamp = {
      ...listingData,
      updatedAt: serverTimestamp(),
    };
    
    await updateDoc(docRef, dataWithTimestamp);
  } catch (error) {
    console.error(`Error updating listing with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a listing (soft delete)
 * @param {string} id - The listing ID
 * @returns {Promise<void>}
 */
export const deleteListing = async (id) => {
  try {
    const docRef = doc(db, LISTINGS_COLLECTION, id);
    
    // Soft delete by setting isDeleted flag
    await updateDoc(docRef, {
      isDeleted: true,
      deletedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(`Error deleting listing with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Get all listings with pagination and filtering
 * @param {Object} options - Query options
 * @param {string} options.type - Filter by listing type
 * @param {string} options.status - Filter by status
 * @param {boolean} options.featured - Filter by featured status
 * @param {string} options.owner - Filter by owner ID
 * @param {string} options.sortBy - Sort field
 * @param {string} options.sortDirection - Sort direction ('asc' or 'desc')
 * @param {number} options.limit - Number of records to fetch
 * @param {Object} options.startAfterDoc - Last document from previous batch
 * @returns {Promise<{listings: Array, lastDoc: Object}>} - Listings and last document for pagination
 */
export const getListings = async (options = {}) => {
  try {
    const {
      type,
      status,
      featured,
      owner,
      sortBy = 'createdAt',
      sortDirection = 'desc',
      limit: limitCount = 10,
      startAfterDoc,
    } = options;
    
    let q = collection(db, LISTINGS_COLLECTION);
    
    // Build the query with filters
    const filters = [];
    
    // Only include non-deleted listings by default
    filters.push(where('isDeleted', '==', false));
    
    if (type) {
      filters.push(where('type', '==', type));
    }
    
    if (status) {
      filters.push(where('status', '==', status));
    }
    
    if (featured !== undefined) {
      filters.push(where('isFeatured', '==', featured));
    }
    
    if (owner) {
      filters.push(where('ownerId', '==', owner));
    }
    
    // Apply filters and sorting
    q = query(
      collection(db, LISTINGS_COLLECTION),
      ...filters,
      orderBy(sortBy, sortDirection)
    );
    
    // Apply pagination
    q = query(q, limit(limitCount));
    
    // Apply cursor for pagination if provided
    if (startAfterDoc) {
      q = query(q, startAfter(startAfterDoc));
    }
    
    // Execute the query
    const querySnapshot = await getDocs(q);
    
    // Extract the data
    const listings = [];
    let lastDoc = null;
    
    querySnapshot.forEach((doc) => {
      listings.push({
        id: doc.id,
        ...doc.data(),
      });
      lastDoc = doc;
    });
    
    return {
      listings,
      lastDoc,
    };
  } catch (error) {
    console.error('Error getting listings:', error);
    throw error;
  }
};

/**
 * Update listing status
 * @param {string} id - The listing ID
 * @param {string} status - The new status
 * @param {string} reason - The reason for the status change
 * @param {string} updatedBy - ID of the user making the change
 * @returns {Promise<void>}
 */
export const updateListingStatus = async (id, status, reason, updatedBy) => {
  try {
    const docRef = doc(db, LISTINGS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error(`Listing with ID ${id} not found`);
    }
    
    const currentData = docSnap.data();
    const statusHistory = currentData.statusHistory || [];
    
    // Add new status history entry
    statusHistory.push({
      status,
      reason,
      timestamp: serverTimestamp(),
      updatedBy,
    });
    
    // Update the document
    await updateDoc(docRef, {
      status,
      statusHistory,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(`Error updating status for listing with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Toggle featured status of a listing
 * @param {string} id - The listing ID
 * @param {boolean} featured - The featured status
 * @param {Date|null} featuredUntil - End date for featured status (null for permanent)
 * @returns {Promise<void>}
 */
export const toggleListingFeatured = async (id, featured, featuredUntil = null) => {
  try {
    const docRef = doc(db, LISTINGS_COLLECTION, id);
    
    await updateDoc(docRef, {
      isFeatured: featured,
      featuredUntil: featuredUntil,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(`Error toggling featured status for listing with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Get featured listings
 * @param {number} limit - Number of records to fetch
 * @returns {Promise<Array>} - Featured listings
 */
export const getFeaturedListings = async (limit = 10) => {
  try {
    const now = new Date();
    
    // Get listings that are featured with no end date or with an end date in the future
    const q1 = query(
      collection(db, LISTINGS_COLLECTION),
      where('isDeleted', '==', false),
      where('status', '==', 'published'),
      where('isFeatured', '==', true),
      where('featuredUntil', '==', null),
      orderBy('createdAt', 'desc'),
      limit(limit)
    );
    
    const q2 = query(
      collection(db, LISTINGS_COLLECTION),
      where('isDeleted', '==', false),
      where('status', '==', 'published'),
      where('isFeatured', '==', true),
      where('featuredUntil', '>=', now),
      orderBy('featuredUntil'),
      limit(limit)
    );
    
    // Execute the queries
    const [snapshot1, snapshot2] = await Promise.all([
      getDocs(q1),
      getDocs(q2),
    ]);
    
    // Combine and deduplicate the results
    const listingsMap = new Map();
    
    [...snapshot1.docs, ...snapshot2.docs].forEach((doc) => {
      if (!listingsMap.has(doc.id)) {
        listingsMap.set(doc.id, {
          id: doc.id,
          ...doc.data(),
        });
      }
    });
    
    return Array.from(listingsMap.values()).slice(0, limit);
  } catch (error) {
    console.error('Error getting featured listings:', error);
    throw error;
  }
};

/**
 * Update listing analytics
 * @param {string} id - The listing ID
 * @param {string} metricType - The type of metric to update (view, contact, favorite)
 * @param {boolean} unique - Whether this is a unique user action
 * @returns {Promise<void>}
 */
export const updateListingAnalytics = async (id, metricType, unique = false) => {
  try {
    const docRef = doc(db, LISTINGS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error(`Listing with ID ${id} not found`);
    }
    
    const currentData = docSnap.data();
    const analytics = currentData.analytics || {
      viewCount: 0,
      uniqueViewCount: 0,
      contactCount: 0,
      favoriteCount: 0,
      viewsTimeline: [],
    };
    
    // Update the appropriate metric
    switch (metricType) {
      case 'view':
        analytics.viewCount = (analytics.viewCount || 0) + 1;
        if (unique) {
          analytics.uniqueViewCount = (analytics.uniqueViewCount || 0) + 1;
        }
        // Update the timeline
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const timelineEntry = analytics.viewsTimeline?.find(
          (entry) => new Date(entry.date.seconds * 1000).setHours(0, 0, 0, 0) === today.getTime()
        );
        
        if (timelineEntry) {
          timelineEntry.count += 1;
        } else {
          analytics.viewsTimeline = [
            ...(analytics.viewsTimeline || []),
            { date: serverTimestamp(), count: 1 },
          ];
        }
        break;
      case 'contact':
        analytics.contactCount = (analytics.contactCount || 0) + 1;
        break;
      case 'favorite':
        analytics.favoriteCount = (analytics.favoriteCount || 0) + 1;
        break;
      default:
        throw new Error(`Invalid metric type: ${metricType}`);
    }
    
    // Update the document
    await updateDoc(docRef, {
      analytics,
      updatedAt: serverTimestamp(),
      ...(metricType === 'view' ? { lastViewed: serverTimestamp() } : {}),
    });
  } catch (error) {
    console.error(`Error updating analytics for listing with ID ${id}:`, error);
    throw error;
  }
};