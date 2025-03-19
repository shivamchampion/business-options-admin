import { useState, useCallback } from 'react';
import { 
  ref, 
  uploadBytesResumable, 
  getDownloadURL, 
  deleteObject,
  listAll,
  getMetadata 
} from 'firebase/storage';
import { storage } from '../lib/firebase';

// Custom hook for Firebase Storage operations
export const useStorage = (storagePath = '') => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [urls, setUrls] = useState([]);
  const [fileList, setFileList] = useState([]);

  // Upload a file with progress
  const uploadFile = useCallback(async (file, customPath = '', metadata = {}) => {
    if (!file) return null;
    
    setUploading(true);
    setProgress(0);
    setError(null);
    
    try {
      // Create path for the file
      const path = customPath || `${storagePath}/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, path);
      
      // Upload file with progress monitoring
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Track upload progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
          },
          (error) => {
            // Handle upload error
            setError(error);
            setUploading(false);
            reject(error);
          },
          async () => {
            // Upload completed successfully
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              const fileMetadata = await getMetadata(uploadTask.snapshot.ref);
              
              const fileData = {
                url: downloadURL,
                path,
                name: file.name,
                type: file.type,
                size: file.size,
                metadata: fileMetadata,
                uploadedAt: new Date().toISOString(),
              };
              
              setUploading(false);
              setProgress(100);
              setUrls((prevUrls) => [...prevUrls, fileData]);
              
              resolve(fileData);
            } catch (error) {
              setError(error);
              setUploading(false);
              reject(error);
            }
          }
        );
      });
    } catch (error) {
      setError(error);
      setUploading(false);
      throw error;
    }
  }, [storagePath]);

  // Upload multiple files
  const uploadFiles = useCallback(async (files, customPath = '', metadata = {}) => {
    if (!files || files.length === 0) return [];
    
    try {
      const uploadPromises = Array.from(files).map((file) => {
        return uploadFile(file, customPath ? `${customPath}/${file.name}` : '', metadata);
      });
      
      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      setError(error);
      throw error;
    }
  }, [uploadFile]);

  // Delete a file
  const deleteFile = useCallback(async (path) => {
    setError(null);
    
    try {
      const fileRef = ref(storage, path);
      await deleteObject(fileRef);
      
      // Update URLs list by removing the deleted file
      setUrls((prevUrls) => prevUrls.filter((file) => file.path !== path));
      
      return { path, deleted: true };
    } catch (error) {
      setError(error);
      throw error;
    }
  }, []);

  // Get list of files in a directory
  const getFiles = useCallback(async (path = '') => {
    setError(null);
    
    try {
      const directoryPath = path || storagePath;
      const directoryRef = ref(storage, directoryPath);
      const listResult = await listAll(directoryRef);
      
      const filesPromises = listResult.items.map(async (itemRef) => {
        try {
          const url = await getDownloadURL(itemRef);
          const metadata = await getMetadata(itemRef);
          
          return {
            url,
            path: itemRef.fullPath,
            name: itemRef.name,
            metadata,
          };
        } catch (error) {
          console.error('Error getting file details:', error);
          return null;
        }
      });
      
      const files = await Promise.all(filesPromises);
      const validFiles = files.filter(Boolean);
      
      setFileList(validFiles);
      return validFiles;
    } catch (error) {
      setError(error);
      console.error('Error getting files list:', error);
      setFileList([]);
      throw error;
    }
  }, [storagePath]);

  // Get URL for an existing file
  const getFileUrl = useCallback(async (path) => {
    setError(null);
    
    try {
      const fileRef = ref(storage, path);
      const url = await getDownloadURL(fileRef);
      
      return url;
    } catch (error) {
      setError(error);
      throw error;
    }
  }, []);

  return {
    uploading,
    progress,
    error,
    urls,
    fileList,
    uploadFile,
    uploadFiles,
    deleteFile,
    getFiles,
    getFileUrl,
  };
};