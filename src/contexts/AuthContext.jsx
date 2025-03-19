import React, { createContext, useState, useEffect } from 'react';
// Uncomment when Firebase is set up
// import { auth, firestore } from '../lib/firebase';
// import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';

// Create the auth context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userPermissions, setUserPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // For development, we'll set a mock user to bypass the login
  // Remove this in production
  useEffect(() => {
    // Mock authentication for development purposes
    const mockUser = {
      uid: 'mock-uid-123',
      email: 'admin@example.com',
      displayName: 'Admin User',
      photoURL: 'https://via.placeholder.com/150',
    };
    
    setCurrentUser(mockUser);
    setUserRole('admin');
    setUserPermissions([
      'view_dashboard',
      'manage_users',
      'manage_listings',
      'manage_content',
      'view_analytics'
    ]);
    setLoading(false);
    
    // Uncomment when Firebase is set up
    /*
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Fetch user role and permissions from Firestore
          const userDoc = await getDoc(doc(firestore, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.role || 'user');
            setUserPermissions(userData.permissions || []);
          } else {
            setUserRole('user');
            setUserPermissions([]);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUserRole('user');
          setUserPermissions([]);
        }
      } else {
        setUserRole(null);
        setUserPermissions([]);
      }
      
      setLoading(false);
    });
    
    return unsubscribe;
    */
  }, []);
  
  // Check if user has a specific permission
  const hasPermission = (section, action) => {
    if (!currentUser) return false;
    if (userRole === 'super_admin' || userRole === 'admin') return true;
    
    // Check for the specific permission format
    const permissionString = `${section}_${action}`;
    return userPermissions.includes(permissionString);
  };
  
  // Check if user is an admin
  const isAdmin = () => {
    return userRole === 'admin' || userRole === 'super_admin';
  };
  
  // Login function
  const login = async (email, password) => {
    // Uncomment when Firebase is set up
    // return signInWithEmailAndPassword(auth, email, password);
    
    // Mock login for development
    console.log('Mock login with:', email, password);
    return Promise.resolve({ user: currentUser });
  };
  
  // Logout function
  const logout = async () => {
    // Uncomment when Firebase is set up
    // return signOut(auth);
    
    // Mock logout for development
    console.log('Mock logout');
    return Promise.resolve();
  };
  
  const value = {
    currentUser,
    userRole,
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