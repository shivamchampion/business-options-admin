import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// Initialize Firebase Storage
const storage = getStorage();

/**
 * Upload an image to Firebase Storage with progress tracking
 * 
 * @param {File} file - The image file to upload
 * @param {string} path - The storage path (e.g., 'listings')
 * @param {Function} onProgress - Progress callback function (receives percentage)
 * @returns {Promise<Object>} - Object containing the download URL and storage path
 */
export const uploadImage = async (file, path, onProgress) => {
  try {
    // Validate file is an image
    if (!file.type.includes('image/')) {
      throw new Error('File must be an image');
    }
    
    // Generate a unique filename
    const extension = file.name.split('.').pop();
    const uniqueFilename = `${uuidv4()}.${extension}`;
    const fullPath = `${path}/images/${uniqueFilename}`;
    
    // Create storage reference
    const storageRef = ref(storage, fullPath);
    
    // Upload the file with progress tracking
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    // Return a promise that resolves when the upload is complete
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Calculate and report progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) {
            onProgress(progress);
          }
        },
        (error) => {
          // Handle errors
          reject(error);
        },
        async () => {
          // Upload completed successfully
          try {
            // Get the download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            
            // Resolve with the URL and path
            resolve({
              url: downloadURL,
              path: fullPath,
            });
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

/**
 * Upload a document to Firebase Storage with progress tracking
 * 
 * @param {File} file - The document file to upload
 * @param {string} path - The storage path (e.g., 'listings/business/documents')
 * @param {Function} onProgress - Progress callback function (receives percentage)
 * @returns {Promise<Object>} - Object containing the download URL and storage path
 */
export const uploadDocument = async (file, path, onProgress) => {
  try {
    // Generate a unique filename
    const extension = file.name.split('.').pop();
    const uniqueFilename = `${uuidv4()}.${extension}`;
    const fullPath = `${path}/${uniqueFilename}`;
    
    // Create storage reference
    const storageRef = ref(storage, fullPath);
    
    // Upload the file with progress tracking
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    // Return a promise that resolves when the upload is complete
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Calculate and report progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) {
            onProgress(progress);
          }
        },
        (error) => {
          // Handle errors
          reject(error);
        },
        async () => {
          // Upload completed successfully
          try {
            // Get the download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            
            // Resolve with the URL and path
            resolve({
              url: downloadURL,
              path: fullPath,
            });
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

/**
 * Delete a file from Firebase Storage
 * 
 * @param {string} path - The full storage path of the file to delete
 * @returns {Promise<void>}
 */
export const deleteFile = async (path) => {
  try {
    if (!path) {
      throw new Error('File path is required');
    }
    
    // Create a reference to the file
    const fileRef = ref(storage, path);
    
    // Delete the file
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

/**
 * Delete an image from Firebase Storage
 * 
 * @param {string} path - The full storage path of the image
 * @returns {Promise<void>}
 */
export const deleteImage = deleteFile;

/**
 * Delete a document from Firebase Storage
 * 
 * @param {string} path - The full storage path of the document
 * @returns {Promise<void>}
 */
export const deleteDocument = deleteFile;

/**
 * Get a signed URL for a file with temporary access
 * 
 * @param {string} path - The full storage path of the file
 * @param {number} expirationMinutes - How long the URL should be valid (in minutes)
 * @returns {Promise<string>} - The signed URL
 */
export const getSignedUrl = async (path, expirationMinutes = 60) => {
  try {
    if (!path) {
      throw new Error('File path is required');
    }
    
    // Create a reference to the file
    const fileRef = ref(storage, path);
    
    // Get the signed URL
    // Note: This URL will expire after the specified time
    const url = await getDownloadURL(fileRef);
    
    return url;
  } catch (error) {
    console.error('Error getting signed URL:', error);
    throw error;
  }
};

/**
 * Get a list of all files in a directory
 * 
 * @param {string} path - The storage path to list
 * @returns {Promise<Array>} - Array of file metadata
 */
export const listFiles = async (path) => {
  try {
    if (!path) {
      throw new Error('Directory path is required');
    }
    
    // Note: Firebase Storage JS SDK doesn't provide a direct way to list files
    // This would typically be handled by a Cloud Function or backend API
    // This is a placeholder for future implementation
    
    throw new Error('listFiles is not implemented in the client-side SDK');
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
};

/**
 * Get metadata for a file
 * 
 * @param {string} path - The full storage path of the file
 * @returns {Promise<Object>} - File metadata
 */
export const getFileMetadata = async (path) => {
  try {
    if (!path) {
      throw new Error('File path is required');
    }
    
    // Firebase Storage JS SDK doesn't provide a direct way to get metadata
    // This would typically be handled by a Cloud Function or backend API
    // This is a placeholder for future implementation
    
    throw new Error('getFileMetadata is not implemented in the client-side SDK');
  } catch (error) {
    console.error('Error getting file metadata:', error);
    throw error;
  }
};