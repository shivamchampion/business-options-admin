import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

// Your web app's Firebase configuration
// For a real app, these values would be injected from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);

// Set region for Firebase Functions (optional)
// connectFunctionsEmulator(functions, "localhost", 5001); // Uncomment for local development

/**
 * Helper function to get a timestamp value for Firestore
 * @returns {Date} - Current date object
 */
const timestamp = () => new Date();

/**
 * Helper function to handle Firebase authentication errors
 * @param {Error} error - Firebase auth error
 * @returns {string} - User-friendly error message
 */
const handleAuthError = (error) => {
  const errorCode = error.code;
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password is too weak. It should be at least 6 characters.';
    case 'auth/invalid-email':
      return 'Invalid email address format.';
    case 'auth/too-many-requests':
      return 'Too many unsuccessful login attempts. Please try again later.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/operation-not-allowed':
      return 'Operation not allowed.';
    case 'auth/requires-recent-login':
      return 'Please sign in again to complete this action.';
    default:
      return error.message || 'An unknown error occurred.';
  }
};

export { app, auth, db, storage, functions, timestamp, handleAuthError };