import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useDropzone } from 'react-dropzone';
import { Toast } from '@/components/ui/use-toast';
import { uploadImage, deleteImage } from '@/services/storage';
import { v4 as uuidv4 } from 'uuid';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MIN_IMAGES = 3;
const MAX_IMAGES = 10;

const MediaUpload = () => {
  const { control, setValue, watch } = useFormContext();
  
  const galleryImages = watch('media.galleryImages') || [];
  const featuredImage = watch('media.featuredImage');
  
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [draggedIndex, setDraggedIndex] = useState(null);
  
  const onDrop = async (acceptedFiles, rejectedFiles) => {
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach(file => {
        if (file.errors.some(e => e.code === 'file-too-large')) {
          Toast({
            title: "File too large",
            description: `${file.file.name} exceeds the 5MB limit.`,
            variant: "destructive",
          });
        } else if (file.errors.some(e => e.code === 'file-invalid-type')) {
          Toast({
            title: "Invalid file type",
            description: `${file.file.name} is not a valid image file.`,
            variant: "destructive",
          });
        }
      });
    }
    
    // Check if adding new files would exceed the maximum
    if (galleryImages.length + acceptedFiles.length > MAX_IMAGES) {
      Toast({
        title: "Too many images",
        description: `You can upload a maximum of ${MAX_IMAGES} images.`,
        variant: "destructive",
      });
      
      // Only accept files up to the maximum
      acceptedFiles = acceptedFiles.slice(0, MAX_IMAGES - galleryImages.length);
    }
    
    if (acceptedFiles.length === 0) return;
    
    setUploading(true);
    const newProgress = { ...uploadProgress };
    const newImages = [...galleryImages];
    
    for (let i = 0; i < acceptedFiles.length; i++) {
      const file = acceptedFiles[i];
      const id = uuidv4();
      newProgress[id] = 0;
      
      setUploadProgress(newProgress);
      
      try {
        // Upload to Firebase Storage
        const { url, path } = await uploadImage(
          file,
          'listings',
          (progress) => {
            setUploadProgress(prev => ({
              ...prev,
              [id]: progress
            }));
          }
        );
        
        // Add to form state
        newImages.push({
          id,
          url,
          path,
          alt: file.name,
        });
        
        // If this is the first image, set it as featured
        if (newImages.length === 1 || !featuredImage) {
          setValue('media.featuredImage', {
            url,
            path,
            alt: file.name,
          }, { shouldValidate: true });
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        Toast({
          title: "Upload failed",
          description: `Failed to upload ${file.name}.`,
          variant: "destructive",
        });
      }
      
      // Remove from progress tracking
      delete newProgress[id];
    }
    
    setValue('media.galleryImages', newImages, { shouldValidate: true });
    setUploadProgress(newProgress);
    setUploading(false);
  };
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
    },
    maxSize: MAX_FILE_SIZE,
    disabled: uploading || galleryImages.length >= MAX_IMAGES,
  });
  
  const handleRemoveImage = async (index) => {
    const imageToRemove = galleryImages[index];
    const newImages = [...galleryImages];
    newImages.splice(index, 1);
    
    try {
      // Delete from storage
      await deleteImage(imageToRemove.path);
      
      // Update form state
      setValue('media.galleryImages', newImages, { shouldValidate: true });
      
      // If the removed image was the featured image, set a new one
      if (featuredImage && featuredImage.path === imageToRemove.path) {
        setValue('media.featuredImage', newImages.length > 0 ? newImages[0] : null, { shouldValidate: true });
      }
      
      Toast({
        title: "Image removed",
        variant: "success",
      });
    } catch (error) {
      console.error('Error removing image:', error);
      Toast({
        title: "Removal failed",
        description: "Could not delete the image. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleSetFeatured = (index) => {
    setValue('media.featuredImage', galleryImages[index], { shouldValidate: true });
    
    Toast({
      title: "Featured image updated",
      variant: "success",
    });
  };
  
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    // Make the ghost image transparent
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);
  };
  
  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === index) return;
    
    const newImages = [...galleryImages];
    const draggedImage = newImages[draggedIndex];
    
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedImage);
    
    setValue('media.galleryImages', newImages, { shouldValidate: true });
    setDraggedIndex(index);
  };
  
  const handleDragEnd = () => {
    setDraggedIndex(null);
  };
  
  return (
    <div className="space-y-8">
      <div className="text-lg font-semibold">Step 2: Media Upload</div>
      <p className="text-gray-600">
        Upload images for your listing. Add at least 3 high-quality images to showcase your offering.
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Upload Images</CardTitle>
          <CardDescription>
            Add photos that highlight the key features of your listing. First image will be used as the featured image.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertTitle>Image Requirements</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 mt-2 text-sm">
                <li>Minimum 3, maximum 10 images</li>
                <li>File types: JPEG, PNG or WebP</li>
                <li>Maximum 5MB per image</li>
                <li>Minimum resolution: 800x600 pixels</li>
                <li>Recommended aspect ratio: 4:3 or 16:9</li>
              </ul>
            </AlertDescription>
          </Alert>
          
          <FormField
            control={control}
            name="media.galleryImages"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Gallery Images</FormLabel>
                
                {/* Upload Area */}
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-colors
                    ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}
                    ${uploading || galleryImages.length >= MAX_IMAGES ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div className="text-lg font-medium">Drag and drop images here</div>
                    <div className="text-sm text-gray-500">or click to browse files</div>
                  </div>
                </div>
                
                {/* Status Information */}
                <div className="mt-2 flex items-center justify-between">
                  <FormDescription>
                    {galleryImages.length} of {MAX_IMAGES} images uploaded
                  </FormDescription>
                  
                  {galleryImages.length < MIN_IMAGES && (
                    <div className="text-sm text-red-500">
                      At least {MIN_IMAGES} images are required
                    </div>
                  )}
                </div>
                
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Upload Progress */}
          {Object.keys(uploadProgress).length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium">Uploading images...</div>
              {Object.entries(uploadProgress).map(([id, progress]) => (
                <div key={id} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Uploading image...</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              ))}
            </div>
          )}
          
          {/* Image Gallery */}
          {galleryImages.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Uploaded Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryImages.map((image, index) => (
                  <div 
                    key={image.id || index}
                    className={`relative group border rounded-md overflow-hidden
                      ${featuredImage && featuredImage.path === image.path ? 'ring-2 ring-blue-500' : ''}
                      ${draggedIndex === index ? 'opacity-50' : 'opacity-100'}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                  >
                    <img 
                      src={image.url} 
                      alt={image.alt || `Image ${index + 1}`}
                      className="w-full h-40 object-cover"
                    />
                    
                    {/* Badge for featured image */}
                    {featuredImage && featuredImage.path === image.path && (
                      <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs py-1 px-2 rounded-full">
                        Featured
                      </div>
                    )}
                    
                    {/* Image Actions */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-2">
                        {/* Set as Featured */}
                        {(!featuredImage || featuredImage.path !== image.path) && (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleSetFeatured(index)}
                          >
                            Set Featured
                          </Button>
                        )}
                        
                        {/* Remove */}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRemoveImage(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                    
                    {/* Drag Handle */}
                    <div className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full w-6 h-6 flex items-center justify-center cursor-move">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>Drag and drop images to reorder. Set one image as featured.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Image Descriptions</CardTitle>
          <CardDescription>
            Add descriptions to help potential buyers understand what they're seeing.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {galleryImages.map((image, index) => (
            <FormField
              key={image.id || index}
              control={control}
              name={`media.galleryImages.${index}.alt`}
              render={({ field }) => (
                <FormItem className="flex items-center space-x-4">
                  <img 
                    src={image.url} 
                    alt={image.alt || `Image ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-grow">
                    <FormLabel>Image {index + 1} Description {index === 0 ? "(Featured)" : ""}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Describe what this image shows" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaUpload;