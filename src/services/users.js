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
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
  import { db, auth, storage } from '../lib/firebase';
  import { COLLECTIONS, STORAGE_PATHS, USER_ROLES, USER_STATUS } from '../utils/constants';
  
  // Get all users with pagination
  export const getAllUsers = async (options = {}) => {
    try {
      const {
        pageSize = 10,
        sortField = 'createdAt',
        sortDirection = 'desc',
        startAfterDoc = null,
        filters = []
      } = options;
      
      let usersQuery = collection(db, COLLECTIONS.USERS);
      
      // Apply filters
      if (filters.length > 0) {
        filters.forEach(filter => {
          if (filter.value !== undefined && filter.value !== null && filter.value !== '') {
            usersQuery = query(usersQuery, where(filter.field, filter.operator, filter.value));
          }
        });
      }
      
      // Apply sorting
      usersQuery = query(usersQuery, orderBy(sortField, sortDirection));
      
      // Apply pagination
      usersQuery = query(usersQuery, limit(pageSize));
      
      // Apply startAfter if provided
      if (startAfterDoc) {
        usersQuery = query(usersQuery, startAfter(startAfterDoc));
      }
      
      const querySnapshot = await getDocs(usersQuery);
      
      // Get and format users
      const users = [];
      querySnapshot.forEach(doc => {
        users.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      // Get the last document for pagination
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      
      return {
        success: true,
        users,
        lastDoc,
        hasMore: users.length === pageSize
      };
    } catch (error) {
      console.error('Get all users error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Get total users count
  export const getUsersCount = async (filters = []) => {
    try {
      let usersQuery = collection(db, COLLECTIONS.USERS);
      
      // Apply filters
      if (filters.length > 0) {
        filters.forEach(filter => {
          if (filter.value !== undefined && filter.value !== null && filter.value !== '') {
            usersQuery = query(usersQuery, where(filter.field, filter.operator, filter.value));
          }
        });
      }
      
      const snapshot = await getCountFromServer(usersQuery);
      
      return {
        success: true,
        count: snapshot.data().count
      };
    } catch (error) {
      console.error('Get users count error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Get user by ID
  export const getUserById = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, userId));
      
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      
      return {
        success: true,
        user: {
          id: userDoc.id,
          ...userDoc.data()
        }
      };
    } catch (error) {
      console.error('Get user by ID error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Create new user
  export const createUser = async (userData) => {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      
      const user = userCredential.user;
      
      // Upload profile image if provided
      let profileImage = null;
      if (userData.profileImageFile) {
        const imagePath = `${STORAGE_PATHS.PROFILE_IMAGES}/${user.uid}_${Date.now()}`;
        const imageRef = ref(storage, imagePath);
        
        await uploadBytes(imageRef, userData.profileImageFile);
        const imageUrl = await getDownloadURL(imageRef);
        
        profileImage = {
          url: imageUrl,
          path: imagePath,
          uploadedAt: Timestamp.now()
        };
      }
      
      // Prepare user data for Firestore
      const userDataForFirestore = {
        uid: user.uid,
        email: userData.email,
        emailVerified: user.emailVerified,
        displayName: userData.displayName || '',
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        phoneNumber: userData.phoneNumber || '',
        phoneVerified: false,
        role: userData.role || USER_ROLES.USER,
        status: userData.status || USER_STATUS.ACTIVE,
        profileImage,
        
        // Location details
        location: userData.location || {
          address: '',
          city: '',
          state: '',
          pincode: '',
          country: 'India',
          coordinates: null
        },
        
        // Business information
        companyInfo: userData.companyInfo || {
          companyName: '',
          role: '',
          gstNumber: '',
          panNumber: '',
          registrationNumber: '',
          websiteUrl: '',
          socialProfiles: {
            linkedin: '',
            facebook: '',
            twitter: '',
            instagram: ''
          }
        },
        
        // Permissions
        permissions: userData.permissions || {},
        
        // Additional fields
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        lastLogin: Timestamp.now(),
        isAdmin: userData.role === USER_ROLES.ADMIN || userData.role === USER_ROLES.SUPER_ADMIN,
        
        // Verification status
        verification: {
          isIdentityVerified: false,
          isCompanyVerified: false,
          isAddressVerified: false
        },
        
        // Subscription details
        currentPlan: userData.currentPlan || {
          name: 'Free',
          type: 'Free',
          startDate: Timestamp.now(),
          endDate: null,
          isAutoRenew: false,
          status: 'active'
        },
        
        // Preferences
        preferences: userData.preferences || {
          notifications: {
            email: {
              isEnabled: true,
              marketing: true,
              transactional: true,
              listingAlerts: true
            },
            push: {
              isEnabled: true,
              messages: true,
              listingInquiries: true
            }
          },
          isDarkModeEnabled: false,
          language: 'en'
        }
      };
      
      // Save user data to Firestore
      await setDoc(doc(db, COLLECTIONS.USERS, user.uid), userDataForFirestore);
      
      return {
        success: true,
        user: {
          id: user.uid,
          ...userDataForFirestore
        }
      };
    } catch (error) {
      console.error('Create user error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Update user
  export const updateUser = async (userId, userData) => {
    try {
      // Check if user exists
      const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, userId));
      
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      
      const existingUserData = userDoc.data();
      
      // Upload profile image if provided
      let profileImage = existingUserData.profileImage;
      if (userData.profileImageFile) {
        // Delete old image if exists
        if (existingUserData.profileImage?.path) {
          try {
            const oldImageRef = ref(storage, existingUserData.profileImage.path);
            await deleteObject(oldImageRef);
          } catch (error) {
            console.warn('Error deleting old profile image:', error);
          }
        }
        
        // Upload new image
        const imagePath = `${STORAGE_PATHS.PROFILE_IMAGES}/${userId}_${Date.now()}`;
        const imageRef = ref(storage, imagePath);
        
        await uploadBytes(imageRef, userData.profileImageFile);
        const imageUrl = await getDownloadURL(imageRef);
        
        profileImage = {
          url: imageUrl,
          path: imagePath,
          uploadedAt: Timestamp.now()
        };
      }
      
      // Prepare updated user data
      const updatedUserData = {
        ...userData,
        profileImage,
        updatedAt: serverTimestamp(),
        isAdmin: userData.role === USER_ROLES.ADMIN || userData.role === USER_ROLES.SUPER_ADMIN
      };
      
      // Remove fields that should not be updated
      delete updatedUserData.email; // Email can't be updated directly
      delete updatedUserData.uid;
      delete updatedUserData.createdAt;
      delete updatedUserData.profileImageFile;
      
      // Update user in Firestore
      await updateDoc(doc(db, COLLECTIONS.USERS, userId), updatedUserData);
      
      return {
        success: true,
        user: {
          id: userId,
          ...existingUserData,
          ...updatedUserData
        }
      };
    } catch (error) {
      console.error('Update user error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Delete user (soft delete)
  export const deleteUser = async (userId) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.USERS, userId), {
        status: USER_STATUS.DISABLED,
        isDeleted: true,
        deletedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return {
        success: true
      };
    } catch (error) {
      console.error('Delete user error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Get user roles and permissions
  export const getUserRoles = async () => {
    try {
      // Query for roles collection if it exists, otherwise return predefined roles
      const rolesQuery = collection(db, 'Roles');
      const querySnapshot = await getDocs(rolesQuery);
      
      // Get roles from Firestore if they exist
      if (!querySnapshot.empty) {
        const roles = [];
        querySnapshot.forEach(doc => {
          roles.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        return {
          success: true,
          roles
        };
      }
      
      // Otherwise return predefined roles
      const predefinedRoles = [
        {
          id: USER_ROLES.SUPER_ADMIN,
          name: 'Super Admin',
          description: 'Full access to all platform features',
          permissions: {}
        },
        {
          id: USER_ROLES.ADMIN,
          name: 'Admin',
          description: 'Comprehensive management capabilities with limited system configurations',
          permissions: {}
        },
        {
          id: USER_ROLES.MODERATOR,
          name: 'Moderator',
          description: 'Content review, approval, and limited user management',
          permissions: {}
        },
        {
          id: USER_ROLES.ADVISOR,
          name: 'Advisor',
          description: 'Lead management, commission tracking, and limited access',
          permissions: {}
        },
        {
          id: USER_ROLES.USER,
          name: 'User',
          description: 'Regular user with access to platform features',
          permissions: {}
        }
      ];
      
      return {
        success: true,
        roles: predefinedRoles
      };
    } catch (error) {
      console.error('Get user roles error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Get users by role
  export const getUsersByRole = async (role, options = {}) => {
    try {
      const {
        pageSize = 10,
        startAfterDoc = null
      } = options;
      
      let usersQuery = collection(db, COLLECTIONS.USERS);
      
      // Query by role
      usersQuery = query(usersQuery, where('role', '==', role));
      
      // Apply pagination
      usersQuery = query(usersQuery, orderBy('createdAt', 'desc'), limit(pageSize));
      
      // Apply startAfter if provided
      if (startAfterDoc) {
        usersQuery = query(usersQuery, startAfter(startAfterDoc));
      }
      
      const querySnapshot = await getDocs(usersQuery);
      
      // Get and format users
      const users = [];
      querySnapshot.forEach(doc => {
        users.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      // Get the last document for pagination
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      
      return {
        success: true,
        users,
        lastDoc,
        hasMore: users.length === pageSize
      };
    } catch (error) {
      console.error('Get users by role error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Get recent users
  export const getRecentUsers = async (limit = 5) => {
    try {
      const usersQuery = query(
        collection(db, COLLECTIONS.USERS),
        orderBy('createdAt', 'desc'),
        limit(limit)
      );
      
      const querySnapshot = await getDocs(usersQuery);
      
      // Get and format users
      const users = [];
      querySnapshot.forEach(doc => {
        users.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return {
        success: true,
        users
      };
    } catch (error) {
      console.error('Get recent users error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Get user registration counts by period
  export const getUserRegistrationCounts = async (periodType = 'monthly', limit = 12) => {
    try {
      // Get all users
      const usersQuery = query(
        collection(db, COLLECTIONS.USERS),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(usersQuery);
      
      // Group users by period
      const usersByPeriod = {};
      
      querySnapshot.forEach(doc => {
        const userData = doc.data();
        const createdAt = userData.createdAt?.toDate();
        
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
        
        if (!usersByPeriod[periodKey]) {
          usersByPeriod[periodKey] = 0;
        }
        
        usersByPeriod[periodKey]++;
      });
      
      // Convert to array and sort
      let registrationCounts = Object.entries(usersByPeriod).map(([period, count]) => ({
        period,
        count
      }));
      
      registrationCounts.sort((a, b) => a.period.localeCompare(b.period));
      
      // Limit to specified number of periods
      registrationCounts = registrationCounts.slice(-limit);
      
      return {
        success: true,
        data: registrationCounts
      };
    } catch (error) {
      console.error('Get user registration counts error:', error);
      return {
        success: false,
        error
      };
    }
  };