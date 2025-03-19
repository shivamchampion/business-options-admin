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
  import { db } from '../lib/firebase';
  import { COLLECTIONS, APPLICATION_STATUS } from '../utils/constants';
  
  // Get all applications with pagination and filters
  export const getAllApplications = async (options = {}) => {
    try {
      const {
        pageSize = 10,
        sortField = 'createdAt',
        sortDirection = 'desc',
        startAfterDoc = null,
        filters = []
      } = options;
      
      let applicationsQuery = collection(db, COLLECTIONS.INSTA_APPLY);
      
      // Apply filters
      if (filters.length > 0) {
        filters.forEach(filter => {
          if (filter.value !== undefined && filter.value !== null && filter.value !== '') {
            applicationsQuery = query(applicationsQuery, where(filter.field, filter.operator, filter.value));
          }
        });
      }
      
      // Apply sorting
      applicationsQuery = query(applicationsQuery, orderBy(sortField, sortDirection));
      
      // Apply pagination
      applicationsQuery = query(applicationsQuery, limit(pageSize));
      
      // Apply startAfter if provided
      if (startAfterDoc) {
        applicationsQuery = query(applicationsQuery, startAfter(startAfterDoc));
      }
      
      const querySnapshot = await getDocs(applicationsQuery);
      
      // Get and format applications
      const applications = [];
      querySnapshot.forEach(doc => {
        applications.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      // Get the last document for pagination
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      
      return {
        success: true,
        applications,
        lastDoc,
        hasMore: applications.length === pageSize
      };
    } catch (error) {
      console.error('Get all applications error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Get total applications count
  export const getApplicationsCount = async (filters = []) => {
    try {
      let applicationsQuery = collection(db, COLLECTIONS.INSTA_APPLY);
      
      // Apply filters
      if (filters.length > 0) {
        filters.forEach(filter => {
          if (filter.value !== undefined && filter.value !== null && filter.value !== '') {
            applicationsQuery = query(applicationsQuery, where(filter.field, filter.operator, filter.value));
          }
        });
      }
      
      const snapshot = await getCountFromServer(applicationsQuery);
      
      return {
        success: true,
        count: snapshot.data().count
      };
    } catch (error) {
      console.error('Get applications count error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Get application by ID
  export const getApplicationById = async (applicationId) => {
    try {
      const applicationDoc = await getDoc(doc(db, COLLECTIONS.INSTA_APPLY, applicationId));
      
      if (!applicationDoc.exists()) {
        throw new Error('Application not found');
      }
      
      return {
        success: true,
        application: {
          id: applicationDoc.id,
          ...applicationDoc.data()
        }
      };
    } catch (error) {
      console.error('Get application by ID error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Create new application
  export const createApplication = async (applicationData) => {
    try {
      // Check if listing exists (if listingId is provided)
      if (applicationData.listingId) {
        const listingDoc = await getDoc(doc(db, COLLECTIONS.LISTINGS, applicationData.listingId));
        
        if (!listingDoc.exists()) {
          throw new Error('Referenced listing not found');
        }
        
        // Add listing info
        const listingData = listingDoc.data();
        applicationData.listingName = listingData.name;
        applicationData.listingType = listingData.type;
      }
      
      // Prepare application data for Firestore
      const applicationDataForFirestore = {
        // Applicant Information
        applicantName: applicationData.applicantName,
        email: applicationData.email,
        phone: applicationData.phone,
        
        // Listing Interest
        listingId: applicationData.listingId || null,
        listingName: applicationData.listingName || null,
        listingType: applicationData.listingType || null,
        
        // Additional Information
        message: applicationData.message || '',
        preferredContactMethod: applicationData.preferredContactMethod || 'Email',
        preferredContactTime: applicationData.preferredContactTime || '',
        investmentCapacity: applicationData.investmentCapacity || '',
        urgency: applicationData.urgency || 'Within week',
        
        // Source Tracking
        source: applicationData.source || 'Website',
        utmParams: applicationData.utmParams || {
          utmSource: '',
          utmMedium: '',
          utmCampaign: '',
          utmTerm: '',
          utmContent: ''
        },
        device: applicationData.device || 'Unknown',
        
        // Processing Status
        status: APPLICATION_STATUS.NEW,
        assignedTo: null,
        notes: '',
        
        // Follow-up
        followUpDate: null,
        followUpBy: null,
        followUpStatus: 'pending',
        
        // Conversion Data
        isConverted: false,
        convertedToUserId: null,
        convertedToLeadId: null,
        
        // Communication History
        communications: [],
        
        // Timestamps
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        contactedAt: null,
        convertedAt: null,
        closedAt: null,
        
        // Deletion
        isDeleted: false,
        deletedAt: null
      };
      
      // Save to Firestore
      const docRef = await addDoc(collection(db, COLLECTIONS.INSTA_APPLY), applicationDataForFirestore);
      
      return {
        success: true,
        application: {
          id: docRef.id,
          ...applicationDataForFirestore
        }
      };
    } catch (error) {
      console.error('Create application error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Update application
  export const updateApplication = async (applicationId, applicationData) => {
    try {
      // Check if application exists
      const applicationDoc = await getDoc(doc(db, COLLECTIONS.INSTA_APPLY, applicationId));
      
      if (!applicationDoc.exists()) {
        throw new Error('Application not found');
      }
      
      const existingApplication = applicationDoc.data();
      
      // Prepare update data
      const updateData = {
        ...applicationData,
        updatedAt: serverTimestamp()
      };
      
      // Handle status changes
      if (applicationData.status && applicationData.status !== existingApplication.status) {
        // Update status-specific timestamps
        if (applicationData.status === APPLICATION_STATUS.CONTACTED && !existingApplication.contactedAt) {
          updateData.contactedAt = serverTimestamp();
        } else if (applicationData.status === APPLICATION_STATUS.CONVERTED && !existingApplication.convertedAt) {
          updateData.convertedAt = serverTimestamp();
          updateData.isConverted = true;
        } else if (applicationData.status === APPLICATION_STATUS.CLOSED && !existingApplication.closedAt) {
          updateData.closedAt = serverTimestamp();
        }
      }
      
      // Handle communications
      if (applicationData.newCommunication) {
        const communications = [...(existingApplication.communications || [])];
        
        communications.push({
          type: applicationData.newCommunication.type,
          timestamp: Timestamp.now(),
          by: applicationData.newCommunication.by || '',
          notes: applicationData.newCommunication.notes || '',
          attachments: applicationData.newCommunication.attachments || []
        });
        
        updateData.communications = communications;
        delete updateData.newCommunication;
      }
      
      // Update application in Firestore
      await updateDoc(doc(db, COLLECTIONS.INSTA_APPLY, applicationId), updateData);
      
      return {
        success: true,
        application: {
          id: applicationId,
          ...existingApplication,
          ...updateData
        }
      };
    } catch (error) {
      console.error('Update application error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Delete application (soft delete)
  export const deleteApplication = async (applicationId) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.INSTA_APPLY, applicationId), {
        isDeleted: true,
        deletedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return {
        success: true
      };
    } catch (error) {
      console.error('Delete application error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Update application status
  export const updateApplicationStatus = async (applicationId, status, notes = '') => {
    try {
      // Check if application exists
      const applicationDoc = await getDoc(doc(db, COLLECTIONS.INSTA_APPLY, applicationId));
      
      if (!applicationDoc.exists()) {
        throw new Error('Application not found');
      }
      
      const existingApplication = applicationDoc.data();
      
      // Prepare update data
      const updateData = {
        status,
        updatedAt: serverTimestamp()
      };
      
      // Add notes if provided
      if (notes) {
        updateData.notes = existingApplication.notes
          ? `${existingApplication.notes}\n\n${notes}`
          : notes;
      }
      
      // Update status-specific timestamps
      if (status === APPLICATION_STATUS.CONTACTED && !existingApplication.contactedAt) {
        updateData.contactedAt = serverTimestamp();
      } else if (status === APPLICATION_STATUS.CONVERTED && !existingApplication.convertedAt) {
        updateData.convertedAt = serverTimestamp();
        updateData.isConverted = true;
      } else if (status === APPLICATION_STATUS.CLOSED && !existingApplication.closedAt) {
        updateData.closedAt = serverTimestamp();
      }
      
      // Update application in Firestore
      await updateDoc(doc(db, COLLECTIONS.INSTA_APPLY, applicationId), updateData);
      
      return {
        success: true
      };
    } catch (error) {
      console.error('Update application status error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Assign application to user
  export const assignApplication = async (applicationId, userId, userName) => {
    try {
      // Check if application exists
      const applicationDoc = await getDoc(doc(db, COLLECTIONS.INSTA_APPLY, applicationId));
      
      if (!applicationDoc.exists()) {
        throw new Error('Application not found');
      }
      
      // Check if user exists
      if (userId) {
        const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, userId));
        
        if (!userDoc.exists()) {
          throw new Error('User not found');
        }
      }
      
      // Update application
      await updateDoc(doc(db, COLLECTIONS.INSTA_APPLY, applicationId), {
        assignedTo: userId,
        assignedToName: userName || '',
        updatedAt: serverTimestamp()
      });
      
      return {
        success: true
      };
    } catch (error) {
      console.error('Assign application error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Schedule follow-up
  export const scheduleFollowUp = async (applicationId, followUpData) => {
    try {
      // Check if application exists
      const applicationDoc = await getDoc(doc(db, COLLECTIONS.INSTA_APPLY, applicationId));
      
      if (!applicationDoc.exists()) {
        throw new Error('Application not found');
      }
      
      // Update application
      await updateDoc(doc(db, COLLECTIONS.INSTA_APPLY, applicationId), {
        followUpDate: Timestamp.fromDate(new Date(followUpData.date)),
        followUpBy: followUpData.userId || null,
        followUpStatus: 'pending',
        updatedAt: serverTimestamp()
      });
      
      return {
        success: true
      };
    } catch (error) {
      console.error('Schedule follow-up error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Add communication record
  export const addCommunication = async (applicationId, communicationData) => {
    try {
      // Check if application exists
      const applicationDoc = await getDoc(doc(db, COLLECTIONS.INSTA_APPLY, applicationId));
      
      if (!applicationDoc.exists()) {
        throw new Error('Application not found');
      }
      
      const existingApplication = applicationDoc.data();
      
      // Add to communications array
      const communications = [...(existingApplication.communications || [])];
      
      communications.push({
        type: communicationData.type,
        timestamp: Timestamp.now(),
        by: communicationData.by || '',
        notes: communicationData.notes || '',
        attachments: communicationData.attachments || []
      });
      
      // Update contactedAt if this is the first communication
      const contactedAt = existingApplication.contactedAt || 
        (existingApplication.communications?.length === 0 ? serverTimestamp() : existingApplication.contactedAt);
      
      // Update application
      await updateDoc(doc(db, COLLECTIONS.INSTA_APPLY, applicationId), {
        communications,
        contactedAt,
        status: existingApplication.status === APPLICATION_STATUS.NEW ? 
          APPLICATION_STATUS.CONTACTED : existingApplication.status,
        updatedAt: serverTimestamp()
      });
      
      return {
        success: true
      };
    } catch (error) {
      console.error('Add communication error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Convert to lead
  export const convertToLead = async (applicationId, leadData) => {
    try {
      // Check if application exists
      const applicationDoc = await getDoc(doc(db, COLLECTIONS.INSTA_APPLY, applicationId));
      
      if (!applicationDoc.exists()) {
        throw new Error('Application not found');
      }
      
      const applicationData = applicationDoc.data();
      
      // Create lead
      const leadDocRef = await addDoc(collection(db, COLLECTIONS.LEADS), {
        // Client Information
        clientName: applicationData.applicantName,
        email: applicationData.email,
        phone: applicationData.phone,
        company: leadData.company || '',
        
        // Source Information
        sourceType: 'insta_apply',
        advisorId: leadData.advisorId || null,
        instaApplyId: applicationId,
        
        // Interest Details
        interestType: applicationData.listingType || '',
        specificListingId: applicationData.listingId || null,
        investmentRange: leadData.investmentRange || {
          min: 0,
          max: 0
        },
        requirements: applicationData.message || '',
        timeline: applicationData.urgency || '',
        
        // Status Information
        status: 'new',
        statusHistory: [
          {
            status: 'new',
            timestamp: Timestamp.now(),
            updatedBy: leadData.createdBy || '',
            notes: 'Converted from Insta Apply application'
          }
        ],
        
        // Assignment
        assignedTo: leadData.assignedTo || applicationData.assignedTo || null,
        
        // Value Information
        estimatedValue: leadData.estimatedValue || 0,
        actualValue: 0,
        commissionRate: leadData.commissionRate || 0,
        estimatedCommission: leadData.estimatedCommission || 0,
        actualCommission: 0,
        
        // Communication & Notes
        interactions: applicationData.communications || [],
        notes: applicationData.notes || '',
        
        // Conversion Details
        isConverted: false,
        
        // Commission Processing
        commissionStatus: 'pending',
        
        // Timestamps
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        firstContactedAt: applicationData.contactedAt || null,
        lastContactedAt: applicationData.contactedAt || null,
        
        // Deletion
        isDeleted: false,
        deletedAt: null
      });
      
      // Update application
      await updateDoc(doc(db, COLLECTIONS.INSTA_APPLY, applicationId), {
        status: APPLICATION_STATUS.CONVERTED,
        isConverted: true,
        convertedToLeadId: leadDocRef.id,
        convertedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return {
        success: true,
        leadId: leadDocRef.id
      };
    } catch (error) {
      console.error('Convert to lead error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Convert to user
  export const convertToUser = async (applicationId, userData) => {
    try {
      // Not implemented - would require auth logic to create user
      // This would normally call createUser function from users service
      
      return {
        success: false,
        error: new Error('Convert to user functionality not implemented')
      };
    } catch (error) {
      console.error('Convert to user error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Get applications by status
  export const getApplicationsByStatus = async (status, options = {}) => {
    try {
      const {
        pageSize = 10,
        sortField = 'createdAt',
        sortDirection = 'desc',
        startAfterDoc = null
      } = options;
      
      let applicationsQuery = collection(db, COLLECTIONS.INSTA_APPLY);
      
      // Query by status
      applicationsQuery = query(applicationsQuery, where('status', '==', status));
      
      // Only get non-deleted applications
      applicationsQuery = query(applicationsQuery, where('isDeleted', '==', false));
      
      // Apply sorting
      applicationsQuery = query(applicationsQuery, orderBy(sortField, sortDirection));
      
      // Apply pagination
      applicationsQuery = query(applicationsQuery, limit(pageSize));
      
      // Apply startAfter if provided
      if (startAfterDoc) {
        applicationsQuery = query(applicationsQuery, startAfter(startAfterDoc));
      }
      
      const querySnapshot = await getDocs(applicationsQuery);
      
      // Get and format applications
      const applications = [];
      querySnapshot.forEach(doc => {
        applications.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      // Get the last document for pagination
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      
      return {
        success: true,
        applications,
        lastDoc,
        hasMore: applications.length === pageSize
      };
    } catch (error) {
      console.error('Get applications by status error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Get new applications count
  export const getNewApplicationsCount = async () => {
    try {
      const applicationsQuery = query(
        collection(db, COLLECTIONS.INSTA_APPLY),
        where('status', '==', APPLICATION_STATUS.NEW),
        where('isDeleted', '==', false)
      );
      
      const snapshot = await getCountFromServer(applicationsQuery);
      
      return {
        success: true,
        count: snapshot.data().count
      };
    } catch (error) {
      console.error('Get new applications count error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Get application statistics
  export const getApplicationStatistics = async () => {
    try {
      // Get counts by status
      const newQuery = query(
        collection(db, COLLECTIONS.INSTA_APPLY),
        where('status', '==', APPLICATION_STATUS.NEW),
        where('isDeleted', '==', false)
      );
      
      const contactedQuery = query(
        collection(db, COLLECTIONS.INSTA_APPLY),
        where('status', '==', APPLICATION_STATUS.CONTACTED),
        where('isDeleted', '==', false)
      );
      
      const convertedQuery = query(
        collection(db, COLLECTIONS.INSTA_APPLY),
        where('status', '==', APPLICATION_STATUS.CONVERTED),
        where('isDeleted', '==', false)
      );
      
      const closedQuery = query(
        collection(db, COLLECTIONS.INSTA_APPLY),
        where('status', '==', APPLICATION_STATUS.CLOSED),
        where('isDeleted', '==', false)
      );
      
      const [newSnapshot, contactedSnapshot, convertedSnapshot, closedSnapshot] = await Promise.all([
        getCountFromServer(newQuery),
        getCountFromServer(contactedQuery),
        getCountFromServer(convertedQuery),
        getCountFromServer(closedQuery)
      ]);
      
      const statusCounts = {
        new: newSnapshot.data().count,
        contacted: contactedSnapshot.data().count,
        converted: convertedSnapshot.data().count,
        closed: closedSnapshot.data().count,
        total: newSnapshot.data().count + contactedSnapshot.data().count + 
          convertedSnapshot.data().count + closedSnapshot.data().count
      };
      
      // Get conversion rate
      const conversionRate = statusCounts.total > 0 ? 
        (statusCounts.converted / statusCounts.total) * 100 : 0;
      
      return {
        success: true,
        statistics: {
          statusCounts,
          conversionRate: Math.round(conversionRate * 100) / 100 // Round to 2 decimal places
        }
      };
    } catch (error) {
      console.error('Get application statistics error:', error);
      return {
        success: false,
        error
      };
    }
  };