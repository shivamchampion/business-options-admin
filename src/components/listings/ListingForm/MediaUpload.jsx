import React, { useState, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { 
  Image, 
  UploadCloud, 
  X, 
  Star, 
  AlertTriangle, 
  Info,
  Move
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { VALIDATION } from '../../../utils/constants';
import { formatFileSize } from '../../../utils/formatters';

const MediaUpload = ({ images = [], setImages }) => {
  const { formState: { errors } } = useFormContext();
  const [featuredImageIndex, setFeaturedImageIndex] = useState(0);
  const [uploadErrors, setUploadErrors] = useState([]);
  
  // Validate image dimensions
  const validateImageDimensions = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const valid = 
          img.width >= VALIDATION.MIN_IMAGE_WIDTH && 
          img.height >= VALIDATION.MIN_IMAGE_HEIGHT;
        resolve(valid);
      };
      img.onerror = () => {
        resolve(false);
      };
      img.src = URL.createObjectURL(file);
    });
  };
  
  // Handle file drop
  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    const errors = [];
    
    // Handle rejected files
    if (rejectedFiles && rejectedFiles.length > 0) {
      rejectedFiles.forEach(rejected => {
        const error = {
          file: rejected.file.name,
          errors: rejected.errors.map(err => err.message)
        };
        errors.push(error);
      });
    }
    
    // Validate dimensions for accepted files
    const validatedFiles = [];
    for (const file of acceptedFiles) {
      const dimensionsValid = await validateImageDimensions(file);
      if (dimensionsValid) {
        validatedFiles.push(file);
      } else {
        errors.push({
          file: file.name,
          errors: [`Image must be at least ${VALIDATION.MIN_IMAGE_WIDTH}x${VALIDATION.MIN_IMAGE_HEIGHT}px`]
        });
      }
    }
    
    // Update error state
    setUploadErrors(errors);
    
    // Check if adding these images would exceed the maximum
    if (images.length + validatedFiles.length > VALIDATION.MAX_IMAGES) {
      alert(`You can upload a maximum of ${VALIDATION.MAX_IMAGES} images.`);
      return;
    }
    
    // Add valid images to state
    setImages(prevImages => [...prevImages, ...validatedFiles]);
  }, [images, setImages]);
  
  // Configure dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxSize: VALIDATION.MAX_IMAGE_SIZE,
    multiple: true,
    maxFiles: VALIDATION.MAX_IMAGES,
  });
  
  // Remove image
  const removeImage = (index) => {
    setImages(prevImages => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      
      // If removing the featured image, set the first image as featured
      if (index === featuredImageIndex) {
        setFeaturedImageIndex(0);
      } 
      // If removing an image before the featured one, adjust the index
      else if (index < featuredImageIndex) {
        setFeaturedImageIndex(featuredImageIndex - 1);
      }
      
      return newImages;
    });
  };
  
  // Set featured image
  const setFeaturedImage = (index) => {
    setFeaturedImageIndex(index);
  };
  
  // Move image in array (for reordering)
  const moveImage = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= images.length) return;
    
    setImages(prevImages => {
      const newImages = [...prevImages];
      const [movedImage] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, movedImage);
      
      // Adjust featured image index if necessary
      if (fromIndex === featuredImageIndex) {
        setFeaturedImageIndex(toIndex);
      } else if (
        (fromIndex < featuredImageIndex && toIndex >= featuredImageIndex) ||
        (fromIndex > featuredImageIndex && toIndex <= featuredImageIndex)
      ) {
        // Featured image index needs to shift
        setFeaturedImageIndex(
          featuredImageIndex + (fromIndex < featuredImageIndex ? -1 : 1)
        );
      }
      
      return newImages;
    });
  };
  
  // Get image preview URL
  const getImagePreviewUrl = (image) => {
    if (typeof image === 'string') {
      return image;
    } else if (image.url) {
      return image.url;
    } else if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    return '';
  };
  
  return (
    <div className="space-y-6">
      <div className="form-section">
        <h2 className="form-section-title">Media Upload</h2>
        <p className="text-gray text-sm mb-6">
          Upload high-quality images for your listing. Images should clearly show your offering and help attract potential buyers.
        </p>
        
        {/* Image requirements */}
        <div className="bg-light-blue bg-opacity-70 rounded-md p-4 border border-brand-blue border-opacity-20 mb-6">
          <div className="flex items-start">
            <Info size={20} className="text-brand-blue flex-shrink-0 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-dark-gray mb-1">Image requirements</h3>
              <ul className="text-sm text-gray space-y-1 list-disc list-inside">
                <li>Upload at least {VALIDATION.MIN_IMAGES} and up to {VALIDATION.MAX_IMAGES} images</li>
                <li>JPEG or PNG format only</li>
                <li>Maximum file size: {formatFileSize(VALIDATION.MAX_IMAGE_SIZE)}</li>
                <li>Minimum resolution: {VALIDATION.MIN_IMAGE_WIDTH}x{VALIDATION.MIN_IMAGE_HEIGHT}px</li>
                <li>The first image will be your featured image by default</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Error summary if validation fails */}
        {errors.media && (
          <div className="bg-error bg-opacity-10 text-error text-sm p-4 rounded-md mb-6">
            <div className="flex items-start">
              <AlertTriangle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
              <p>{errors.media.message}</p>
            </div>
          </div>
        )}
        
        {/* Upload errors */}
        {uploadErrors.length > 0 && (
          <div className="bg-error bg-opacity-10 text-error text-sm p-4 rounded-md mb-6">
            <div className="flex items-start">
              <AlertTriangle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Some files couldn't be uploaded:</p>
                <ul className="list-disc list-inside">
                  {uploadErrors.map((error, index) => (
                    <li key={index}>
                      <span className="font-medium">{error.file}</span>: {error.errors.join(', ')}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Dropzone area */}
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors mb-6 ${
            isDragActive ? 'border-brand-blue bg-light-blue bg-opacity-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <UploadCloud 
            size={48} 
            className={`mx-auto mb-3 ${isDragActive ? 'text-brand-blue' : 'text-gray-400'}`} 
          />
          
          {isDragActive ? (
            <p className="text-md font-medium text-brand-blue">Drop your images here</p>
          ) : (
            <>
              <p className="text-md font-medium text-dark-gray mb-2">
                Drag and drop images here, or click to select files
              </p>
              <p className="text-sm text-gray">
                {images.length === 0 
                  ? `Upload at least ${VALIDATION.MIN_IMAGES} images to continue.` 
                  : `${images.length} of ${VALIDATION.MAX_IMAGES} images uploaded.`}
              </p>
            </>
          )}
        </div>
        
        {/* Image preview grid */}
        {images.length > 0 && (
          <div>
            <h3 className="text-md font-medium text-dark-gray mb-3">
              Uploaded Images ({images.length}/{VALIDATION.MAX_IMAGES})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div 
                  key={index} 
                  className={`relative rounded-md overflow-hidden border-2 ${
                    index === featuredImageIndex 
                      ? 'border-warning' 
                      : 'border-gray-200'
                  }`}
                >
                  {/* Image */}
                  <div className="aspect-video bg-gray-100 relative">
                    <img
                      src={getImagePreviewUrl(image)}
                      alt={`Listing image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Featured badge */}
                    {index === featuredImageIndex && (
                      <div className="absolute top-2 left-2 bg-warning text-white text-xs py-1 px-2 rounded-md font-medium flex items-center">
                        <Star size={12} className="mr-1" />
                        Featured
                      </div>
                    )}
                  </div>
                  
                  {/* Control buttons */}
                  <div className="p-2 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray truncate flex-1">
                        {image instanceof File ? image.name : `Image ${index + 1}`}
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        {/* Move left */}
                        <button
                          type="button"
                          onClick={() => moveImage(index, index - 1)}
                          disabled={index === 0}
                          className={`p-1 rounded-md text-gray hover:text-dark-gray hover:bg-gray-100 ${
                            index === 0 ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          title="Move left"
                        >
                          <Move size={14} className="rotate-90" />
                        </button>
                        
                        {/* Move right */}
                        <button
                          type="button"
                          onClick={() => moveImage(index, index + 1)}
                          disabled={index === images.length - 1}
                          className={`p-1 rounded-md text-gray hover:text-dark-gray hover:bg-gray-100 ${
                            index === images.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          title="Move right"
                        >
                          <Move size={14} className="-rotate-90" />
                        </button>
                        
                        {/* Set as featured */}
                        {index !== featuredImageIndex && (
                          <button
                            type="button"
                            onClick={() => setFeaturedImage(index)}
                            className="p-1 rounded-md text-gray hover:text-warning hover:bg-gray-100"
                            title="Set as featured image"
                          >
                            <Star size={14} />
                          </button>
                        )}
                        
                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="p-1 rounded-md text-gray hover:text-error hover:bg-gray-100"
                          title="Remove image"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Placeholder for more images */}
              {images.length < VALIDATION.MAX_IMAGES && (
                <div 
                  {...getRootProps()} 
                  className="aspect-video rounded-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400"
                >
                  <input {...getInputProps()} />
                  <Image size={24} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray">Add more</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaUpload;