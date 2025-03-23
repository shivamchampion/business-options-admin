import { db } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  addDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp, 
  getDoc 
} from 'firebase/firestore';

/**
 * Save a listing draft to Firestore
 * @param {string} draftId - Existing draft ID if updating, null if creating new
 * @param {object} draftData - The draft data to save
 * @returns {Promise<object>} - The saved draft with ID
 */
export const saveListingDraft = async (draftId, draftData) => {
  try {
    // Add timestamps
    const timestampedData = {
      ...draftData,
      updatedAt: serverTimestamp(),
    };

    if (!draftId) {
      // Create new draft
      timestampedData.createdAt = serverTimestamp();
      timestampedData.status = 'draft';
      
      const docRef = await addDoc(collection(db, 'listings'), timestampedData);
      return { 
        id: docRef.id,
        ...draftData, 
        createdAt: new Date(),
        updatedAt: new Date()
      };
    } else {
      // Update existing draft
      const docRef = doc(db, 'listings', draftId);
      await updateDoc(docRef, timestampedData);
      
      // Get the updated document
      const updatedDoc = await getDoc(docRef);
      return { 
        id: draftId,
        ...updatedDoc.data(),
      };
    }
  } catch (error) {
    console.error('Error saving listing draft:', error);
    throw error;
  }
};

/**
 * Create a new listing from a draft (changes status from draft to pending)
 * @param {string} draftId - The draft ID to convert
 * @param {object} listingData - Final listing data with all required fields
 * @returns {Promise<string>} - The listing ID
 */
export const createListing = async (draftId, listingData) => {
  try {
    // Add submission timestamps and set status to pending
    const timestampedData = {
      ...listingData,
      status: 'pending',
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    if (!draftId) {
      // If no draft exists, create a new document
      timestampedData.createdAt = serverTimestamp();
      
      const docRef = await addDoc(collection(db, 'listings'), timestampedData);
      return docRef.id;
    } else {
      // Update the existing draft to change its status
      const docRef = doc(db, 'listings', draftId);
      await updateDoc(docRef, timestampedData);
      return draftId;
    }
  } catch (error) {
    console.error('Error creating listing:', error);
    throw error;
  }
};

/**
 * Fetch a listing by ID
 * @param {string} listingId - The listing ID to fetch
 * @returns {Promise<object>} - The listing data
 */
export const fetchListing = async (listingId) => {
  try {
    const docRef = doc(db, 'listings', listingId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      throw new Error('Listing not found');
    }
  } catch (error) {
    console.error('Error fetching listing:', error);
    throw error;
  }
};

/**
 * Update an existing listing
 * @param {string} listingId - The listing ID to update
 * @param {object} listingData - The updated listing data
 * @returns {Promise<void>}
 */
export const updateListing = async (listingId, listingData) => {
  try {
    // Add timestamp
    const timestampedData = {
      ...listingData,
      updatedAt: serverTimestamp(),
    };
    
    const docRef = doc(db, 'listings', listingId);
    await updateDoc(docRef, timestampedData);
  } catch (error) {
    console.error('Error updating listing:', error);
    throw error;
  }
};

/**
 * Submit a listing for review (changes status from draft to pending)
 * @param {string} listingId - The listing ID to submit
 * @returns {Promise<void>}
 */
export const submitListingForReview = async (listingId) => {
  try {
    const docRef = doc(db, 'listings', listingId);
    await updateDoc(docRef, {
      status: 'pending',
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error submitting listing for review:', error);
    throw error;
  }
};

/**
 * Delete a listing (set isDeleted flag)
 * @param {string} listingId - The listing ID to delete
 * @returns {Promise<void>}
 */
export const deleteListing = async (listingId) => {
  try {
    const docRef = doc(db, 'listings', listingId);
    await updateDoc(docRef, {
      isDeleted: true,
      deletedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error deleting listing:', error);
    throw error;
  }
};

/**
 * Check if a user has permission to edit a listing
 * @param {string} listingId - The listing ID to check
 * @param {string} userId - The user ID to check
 * @returns {Promise<boolean>} - Whether the user has permission
 */
export const checkListingEditPermission = async (listingId, userId) => {
  try {
    const listing = await fetchListing(listingId);
    
    // Check if user is the owner
    if (listing.ownerId === userId) {
      return true;
    }
    
    // In a real app, you would also check if the user has admin permissions
    // This would involve checking the user's role and permissions
    
    return false;
  } catch (error) {
    console.error('Error checking listing edit permission:', error);
    return false;
  }
};