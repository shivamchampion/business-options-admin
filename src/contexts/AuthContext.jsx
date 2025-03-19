import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// Create the auth context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userPermissions, setUserPermissions] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Set up auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Fetch user role and permissions from Firestore
          const userDoc = await getDoc(doc(db, 'Users', user.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            
            // Set user role
            setUserRole(userData.role || 'user');
            
            // Set user permissions
            if (userData.permissions) {
              setUserPermissions(userData.permissions);
            } else {
              // Set default permissions based on role
              setDefaultPermissions(userData.role);
            }
            
            console.log(`User found with role: ${userData.role}`);
          } else {
            // User document doesn't exist, set default role and permissions
            setUserRole('user');
            setDefaultPermissions('user');
            console.warn(`User document not found for uid: ${user.uid}`);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUserRole('user');
          setDefaultPermissions('user');
        }
      } else {
        setUserRole(null);
        setUserPermissions({});
      }
      
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);
  
  // Set default permissions based on role
  const setDefaultPermissions = (role) => {
    switch(role) {
      case 'super_admin':
        setUserPermissions({
          users: { view: true, create: true, edit: true, delete: true },
          listings: { view: true, create: true, edit: true, delete: true, approve: true },
          content: { view: true, create: true, edit: true, delete: true },
          settings: { view: true, edit: true },
          analytics: { view: true },
          advisors: { view: true, create: true, edit: true, delete: true },
          instapply: { view: true, process: true, delete: true }
        });
        break;
      case 'admin':
        setUserPermissions({
          users: { view: true, create: true, edit: true, delete: false },
          listings: { view: true, create: true, edit: true, delete: true, approve: true },
          content: { view: true, create: true, edit: true, delete: true },
          settings: { view: true, edit: false },
          analytics: { view: true },
          advisors: { view: true, create: true, edit: true, delete: false },
          instapply: { view: true, process: true, delete: false }
        });
        break;
      case 'moderator':
        setUserPermissions({
          users: { view: true, create: false, edit: false, delete: false },
          listings: { view: true, create: false, edit: true, delete: false, approve: true },
          content: { view: true, create: true, edit: true, delete: false },
          settings: { view: false, edit: false },
          analytics: { view: false },
          advisors: { view: false, create: false, edit: false, delete: false },
          instapply: { view: true, process: true, delete: false }
        });
        break;
      case 'advisor':
        setUserPermissions({
          users: { view: false, create: false, edit: false, delete: false },
          listings: { view: true, create: false, edit: false, delete: false, approve: false },
          content: { view: true, create: false, edit: false, delete: false },
          settings: { view: false, edit: false },
          analytics: { view: false },
          advisors: { view: true, create: false, edit: false, delete: false },
          instapply: { view: true, process: false, delete: false }
        });
        break;
      default:
        setUserPermissions({
          users: { view: false, create: false, edit: false, delete: false },
          listings: { view: false, create: false, edit: false, delete: false, approve: false },
          content: { view: false, create: false, edit: false, delete: false },
          settings: { view: false, edit: false },
          analytics: { view: false },
          advisors: { view: false, create: false, edit: false, delete: false },
          instapply: { view: false, process: false, delete: false }
        });
        break;
    }
  };
  
  // Check if user has a specific permission
  const hasPermission = (section, action) => {
    if (!currentUser) return false;
    
    // Super admin has all permissions
    if (userRole === 'super_admin') return true;
    
    // Check if the permission exists and is granted
    return (userPermissions[section] && userPermissions[section][action] === true);
  };
  
  // Check if user is an admin
  const isAdmin = () => {
    return userRole === 'admin' || userRole === 'super_admin';
  };
  
 // Login function
 const login = async (email, password) => {
    try {
      // First authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Then check if user has admin panel access in Firestore
      try {
        // Check for user document in the Users collection
        const userDoc = await getDoc(doc(db, 'Users', userCredential.user.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          
          if (!['super_admin', 'admin', 'moderator', 'advisor'].includes(userData.role)) {
            // Regular users don't have admin panel access
            await signOut(auth);
            throw new Error('You do not have access to the admin panel');
          }
          
          // If we get here, both authentication and role check passed
          return userCredential;
        } else {
          // User document doesn't exist - sign out and throw error
          console.error('User document not found for UID:', userCredential.user.uid);
          await signOut(auth);
          throw new Error('User profile not found in database. Please contact an administrator.');
        }
      } catch (error) {
        // If Firestore check fails, sign out and rethrow the error
        await signOut(auth);
        throw error;
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Provide user-friendly error messages
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        throw new Error('Invalid email or password');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many failed login attempts. Please try again later');
      } else if (error.code === 'auth/user-disabled') {
        throw new Error('This account has been disabled. Please contact support');
      } else {
        throw error;
      }
    }
  };
  
  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };
  
  const value = {
    currentUser,
    userRole,
    userPermissions,
    loading,
    hasPermission,
    isAdmin,
    login,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};