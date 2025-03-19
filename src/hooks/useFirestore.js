import { useState, useEffect, useCallback } from 'react';
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
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

// Custom hook for Firestore operations
export const useFirestore = (collectionName) => {
  const [documents, setDocuments] = useState([]);
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // Get a single document
  const getDocument = useCallback(async (docId) => {
    setLoading(true);
    setError(null);
    
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setDocument({ id: docSnap.id, ...docSnap.data() });
      } else {
        setDocument(null);
        setError(new Error('Document not found'));
      }
    } catch (err) {
      console.error('Error getting document:', err);
      setError(err);
      setDocument(null);
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  // Get documents with filters
  const getDocuments = useCallback(async (options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const {
        filters = [],
        sort = null,
        limitCount = 10,
        startAfterDoc = null
      } = options;
      
      let q = collection(db, collectionName);
      
      // Apply filters
      if (filters.length > 0) {
        filters.forEach((filter) => {
          q = query(q, where(filter.field, filter.operator, filter.value));
        });
      }
      
      // Apply sorting
      if (sort) {
        q = query(q, orderBy(sort.field, sort.direction || 'asc'));
      }
      
      // Apply pagination
      q = query(q, limit(limitCount));
      
      if (startAfterDoc) {
        q = query(q, startAfter(startAfterDoc));
      }
      
      const querySnapshot = await getDocs(q);
      const docs = [];
      
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      
      setDocuments(docs);
      
      // Set last document for pagination
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastDoc(lastVisible);
      
      // Check if there are more documents
      setHasMore(querySnapshot.docs.length === limitCount);
    } catch (err) {
      console.error('Error getting documents:', err);
      setError(err);
      setDocuments([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  // Get more documents (pagination)
  const getMoreDocuments = useCallback(async (options = {}) => {
    if (!lastDoc || !hasMore) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const {
        filters = [],
        sort = null,
        limitCount = 10
      } = options;
      
      let q = collection(db, collectionName);
      
      // Apply filters
      if (filters.length > 0) {
        filters.forEach((filter) => {
          q = query(q, where(filter.field, filter.operator, filter.value));
        });
      }
      
      // Apply sorting
      if (sort) {
        q = query(q, orderBy(sort.field, sort.direction || 'asc'));
      }
      
      // Apply pagination
      q = query(q, limit(limitCount), startAfter(lastDoc));
      
      const querySnapshot = await getDocs(q);
      const newDocs = [];
      
      querySnapshot.forEach((doc) => {
        newDocs.push({ id: doc.id, ...doc.data() });
      });
      
      setDocuments((prevDocs) => [...prevDocs, ...newDocs]);
      
      // Set last document for pagination
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastDoc(lastVisible);
      
      // Check if there are more documents
      setHasMore(querySnapshot.docs.length === limitCount);
    } catch (err) {
      console.error('Error getting more documents:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [collectionName, lastDoc, hasMore]);

  // Add a document
  const addDocument = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      // Add timestamps
      const dataWithTimestamps = {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, collectionName), dataWithTimestamps);
      return { id: docRef.id, ...dataWithTimestamps };
    } catch (err) {
      console.error('Error adding document:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  // Update a document
  const updateDocument = useCallback(async (docId, data) => {
    setLoading(true);
    setError(null);
    
    try {
      // Add updated timestamp
      const dataWithTimestamp = {
        ...data,
        updatedAt: serverTimestamp()
      };
      
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, dataWithTimestamp);
      
      // Return updated data
      return { id: docId, ...dataWithTimestamp };
    } catch (err) {
      console.error('Error updating document:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  // Delete a document
  const deleteDocument = useCallback(async (docId) => {
    setLoading(true);
    setError(null);
    
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
      
      // Return success
      return { id: docId, deleted: true };
    } catch (err) {
      console.error('Error deleting document:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  // Listen to real-time updates
  const subscribeToCollection = useCallback((options = {}, callback) => {
    const {
      filters = [],
      sort = null,
      limitCount = 10
    } = options;
    
    let q = collection(db, collectionName);
    
    // Apply filters
    if (filters.length > 0) {
      filters.forEach((filter) => {
        q = query(q, where(filter.field, filter.operator, filter.value));
      });
    }
    
    // Apply sorting
    if (sort) {
      q = query(q, orderBy(sort.field, sort.direction || 'asc'));
    }
    
    // Apply limit
    if (limitCount > 0) {
      q = query(q, limit(limitCount));
    }
    
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });
        
        setDocuments(docs);
        
        if (callback) {
          callback(docs);
        }
      },
      (err) => {
        console.error('Error subscribing to collection:', err);
        setError(err);
      }
    );
    
    return unsubscribe;
  }, [collectionName]);

  // Listen to a single document
  const subscribeToDocument = useCallback((docId, callback) => {
    const docRef = doc(db, collectionName, docId);
    
    const unsubscribe = onSnapshot(docRef, 
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const docData = { id: docSnapshot.id, ...docSnapshot.data() };
          setDocument(docData);
          
          if (callback) {
            callback(docData);
          }
        } else {
          setDocument(null);
          setError(new Error('Document not found'));
          
          if (callback) {
            callback(null);
          }
        }
      },
      (err) => {
        console.error('Error subscribing to document:', err);
        setError(err);
      }
    );
    
    return unsubscribe;
  }, [collectionName]);

  return {
    documents,
    document,
    loading,
    error,
    hasMore,
    lastDoc,
    getDocument,
    getDocuments,
    getMoreDocuments,
    addDocument,
    updateDocument,
    deleteDocument,
    subscribeToCollection,
    subscribeToDocument,
  };
};