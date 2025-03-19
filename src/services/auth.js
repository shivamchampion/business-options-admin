import {
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    sendEmailVerification,
    updatePassword,
    updateEmail,
    reauthenticateWithCredential,
    EmailAuthProvider,
    updateProfile
  } from 'firebase/auth';
  import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
  import { auth, db } from '../lib/firebase';
  import { COLLECTIONS, USER_ROLES, USER_STATUS } from '../utils/constants';
  
  // Sign in with email and password
  export const signInWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update last login timestamp
      await updateDoc(doc(db, COLLECTIONS.USERS, user.uid), {
        lastLogin: serverTimestamp()
      });
      
      return {
        success: true,
        user
      };
    } catch (error) {
      console.error('Sign in error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Sign out user
  export const signOutUser = async () => {
    try {
      await signOut(auth);
      
      return {
        success: true
      };
    } catch (error) {
      console.error('Sign out error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Send password reset email
  export const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      
      return {
        success: true
      };
    } catch (error) {
      console.error('Password reset error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Send email verification
  export const verifyEmail = async () => {
    try {
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error('No user is currently signed in');
      }
      
      await sendEmailVerification(user);
      
      return {
        success: true
      };
    } catch (error) {
      console.error('Email verification error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Update user password
  export const changePassword = async (currentPassword, newPassword) => {
    try {
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error('No user is currently signed in');
      }
      
      // Reauthenticate user
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Update password
      await updatePassword(user, newPassword);
      
      // Update last password reset timestamp
      await updateDoc(doc(db, COLLECTIONS.USERS, user.uid), {
        lastPasswordReset: serverTimestamp()
      });
      
      return {
        success: true
      };
    } catch (error) {
      console.error('Change password error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Update user email
  export const changeEmail = async (currentPassword, newEmail) => {
    try {
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error('No user is currently signed in');
      }
      
      // Reauthenticate user
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Update email
      await updateEmail(user, newEmail);
      
      // Update email in Firestore
      await updateDoc(doc(db, COLLECTIONS.USERS, user.uid), {
        email: newEmail,
        emailVerified: false,
        updatedAt: serverTimestamp()
      });
      
      // Send verification email
      await sendEmailVerification(user);
      
      return {
        success: true
      };
    } catch (error) {
      console.error('Change email error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Update user profile
  export const updateUserProfile = async (userData) => {
    try {
      const user = auth.currentUser;
      
      if (!user) {
        throw new Error('No user is currently signed in');
      }
      
      // Update display name in Auth
      if (userData.displayName) {
        await updateProfile(user, {
          displayName: userData.displayName
        });
      }
      
      // Update profile in Firestore
      await updateDoc(doc(db, COLLECTIONS.USERS, user.uid), {
        ...userData,
        updatedAt: serverTimestamp()
      });
      
      return {
        success: true
      };
    } catch (error) {
      console.error('Update profile error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Get user profile
  export const getUserProfile = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, userId));
      
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      
      return {
        success: true,
        userData: {
          id: userDoc.id,
          ...userDoc.data()
        }
      };
    } catch (error) {
      console.error('Get user profile error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Check if user is admin
  export const isUserAdmin = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, userId));
      
      if (!userDoc.exists()) {
        return {
          success: false,
          isAdmin: false,
          error: new Error('User not found')
        };
      }
      
      const userData = userDoc.data();
      const isAdmin = userData.role === USER_ROLES.ADMIN || userData.role === USER_ROLES.SUPER_ADMIN;
      
      return {
        success: true,
        isAdmin
      };
    } catch (error) {
      console.error('Check admin status error:', error);
      return {
        success: false,
        isAdmin: false,
        error
      };
    }
  };
  
  // Check user permissions
  export const checkUserPermission = async (userId, section, action) => {
    try {
      const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, userId));
      
      if (!userDoc.exists()) {
        return {
          success: false,
          hasPermission: false,
          error: new Error('User not found')
        };
      }
      
      const userData = userDoc.data();
      
      // Super admin and admin have all permissions
      if (userData.role === USER_ROLES.SUPER_ADMIN || userData.role === USER_ROLES.ADMIN) {
        return {
          success: true,
          hasPermission: true
        };
      }
      
      // Check specific permission
      const hasPermission = userData.permissions && 
        userData.permissions[section] && 
        userData.permissions[section][action];
      
      return {
        success: true,
        hasPermission: !!hasPermission
      };
    } catch (error) {
      console.error('Check permission error:', error);
      return {
        success: false,
        hasPermission: false,
        error
      };
    }
  };
  
  // Update user status
  export const updateUserStatus = async (userId, status) => {
    try {
      const validStatuses = Object.values(USER_STATUS);
      
      if (!validStatuses.includes(status)) {
        throw new Error('Invalid status');
      }
      
      await updateDoc(doc(db, COLLECTIONS.USERS, userId), {
        status,
        updatedAt: serverTimestamp()
      });
      
      return {
        success: true
      };
    } catch (error) {
      console.error('Update user status error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Update user role
  export const updateUserRole = async (userId, role) => {
    try {
      const validRoles = Object.values(USER_ROLES);
      
      if (!validRoles.includes(role)) {
        throw new Error('Invalid role');
      }
      
      await updateDoc(doc(db, COLLECTIONS.USERS, userId), {
        role,
        updatedAt: serverTimestamp()
      });
      
      return {
        success: true
      };
    } catch (error) {
      console.error('Update user role error:', error);
      return {
        success: false,
        error
      };
    }
  };
  
  // Update user permissions
  export const updateUserPermissions = async (userId, permissions) => {
    try {
      await updateDoc(doc(db, COLLECTIONS.USERS, userId), {
        permissions,
        updatedAt: serverTimestamp()
      });
      
      return {
        success: true
      };
    } catch (error) {
      console.error('Update user permissions error:', error);
      return {
        success: false,
        error
      };
    }
  };