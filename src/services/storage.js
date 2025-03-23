import { storage } from '@/lib/firebase';
import { 
  ref, 
  uploadBytesResumable, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

/**
 * Upload a listing image to Firebase Storage
 * @param {File} file - The image file to upload
 * @param {Function} progressCallback - Optional callback for upload progress (0-100)
 * @returns {Promise<Object>} - The uploaded image data (url, path, etc.)
 */
export const uploadListingImage = async (file, progressCallback = null) => {
  try {
    // Generate a unique path for the image
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `listings/images/${fileName}`;
    
    // Create storage reference
    const storageRef = ref(storage, filePath);
    
    // Upload the file with progress monitoring
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Calculate and report progress if callback provided
          if (progressCallback) {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            progressCallback(progress);
          }
        },
        (error) => {
          // Handle errors
          console.error('Upload error:', error);
          reject(error);
        },
        async () => {
          // Upload completed successfully
          try {
            // Get download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            
            // Create image metadata
            const imageData = {
              url: downloadURL,
              path: filePath,
              alt: file.name.split('.')[0], // Use filename without extension as alt text
              contentType: file.type,
              size: file.size,
              uploadedAt: new Date().toISOString(),
            };
            
            // Get image dimensions if possible
            try {
              const dimensions = await getImageDimensions(file);
              imageData.width = dimensions.width;
              imageData.height = dimensions.height;
            } catch (err) {
              console.warn('Could not get image dimensions:', err);
            }
            
            resolve(imageData);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error in uploadListingImage:', error);
    throw error;
  }
};

/**
 * Delete a listing image from Firebase Storage
 * @param {string} filePath - The storage path to delete
 * @returns {Promise<void>}
 */
export const deleteListingImage = async (filePath) => {
  try {
    const storageRef = ref(storage, filePath);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

/**
 * Upload a listing document to Firebase Storage
 * @param {File} file - The document file to upload
 * @param {string} type - Document type/category
 * @param {string} description - Optional document description
 * @param {boolean} isPublic - Whether the document is publicly accessible
 * @param {Function} progressCallback - Optional callback for upload progress (0-100)
 * @returns {Promise<Object>} - The uploaded document data
 */
export const uploadListingDocument = async (
  file, 
  type, 
  description = '', 
  isPublic = false,
  progressCallback = null
) => {
  try {
    // Generate a unique path for the document
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `listings/documents/${type}/${fileName}`;
    
    // Create storage reference
    const storageRef = ref(storage, filePath);
    
    // Upload the file with progress monitoring
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Calculate and report progress if callback provided
          if (progressCallback) {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            progressCallback(progress);
          }
        },
        (error) => {
          // Handle errors
          console.error('Upload error:', error);
          reject(error);
        },
        async () => {
          // Upload completed successfully
          try {
            // Get download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            
            // Create document metadata
            const documentData = {
              id: uuidv4(),
              type: type,
              name: file.name,
              description: description,
              url: downloadURL,
              path: filePath,
              format: fileExtension.toUpperCase(),
              size: file.size,
              isPublic: isPublic,
              uploadedAt: new Date().toISOString(),
              verificationStatus: 'pending'
            };
            
            resolve(documentData);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error in uploadListingDocument:', error);
    throw error;
  }
};

/**
 * Delete a listing document from Firebase Storage
 * @param {string} filePath - The storage path to delete
 * @returns {Promise<void>}
 */
export const deleteListingDocument = async (filePath) => {
  try {
    const storageRef = ref(storage, filePath);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

/**
 * Helper function to get image dimensions
 * @param {File} file - The image file
 * @returns {Promise<Object>} - The image dimensions {width, height}
 */
const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
      URL.revokeObjectURL(img.src); // Clean up
    };
    img.onerror = () => {
      reject(new Error('Failed to load image'));
      URL.revokeObjectURL(img.src); // Clean up
    };
    img.src = URL.createObjectURL(file);
  });
};