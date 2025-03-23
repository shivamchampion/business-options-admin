import React, { useCallback, useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { X, Upload, Image as ImageIcon, Loader2, AlertCircle, Info, Star, StarIcon } from 'lucide-react';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { uploadListingImage, deleteListingImage } from '@/services/storage';
import { Skeleton } from '@/components/ui/skeleton';

// File size limit: 5MB in bytes
const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
const MIN_IMAGES = 3;
const MAX_IMAGES = 10;
const MIN_WIDTH = 800;
const MIN_HEIGHT = 600;

const MediaUpload = () => {
  const { control, setValue, watch, formState: { errors } } = useFormContext();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  
  // Watch for media values from form state
  const formMedia = watch('media') || {};
  const galleryImages = formMedia.galleryImages || [];
  const featuredImage = formMedia.featuredImage || null;
  
  // Check if we have the minimum required images
  const hasMinimumImages = galleryImages.length >= MIN_IMAGES;
  
  // Handle file drop
  const onDrop = useCallback(async (acceptedFiles) => {
    // Reset error state
    setUploadError(null);
    
    // Validate number of images
    if (galleryImages.length + acceptedFiles.length > MAX_IMAGES) {
      setUploadError(`You can upload a maximum of ${MAX_IMAGES} images. Please remove some images before uploading more.`);
      return;
    }
    
    // Process each file
    for (const file of acceptedFiles) {
      // Check file size
      if (file.size > FILE_SIZE_LIMIT) {
        setUploadError(`File ${file.name} exceeds the 5MB size limit.`);
        continue;
      }
      
      // Validate image dimensions
      setIsValidating(true);
      try {
        const dimensions = await getImageDimensions(file);
        if (dimensions.width < MIN_WIDTH || dimensions.height < MIN_HEIGHT) {
          setUploadError(`Image ${file.name} is too small. Minimum dimensions are ${MIN_WIDTH}x${MIN_HEIGHT}px.`);
          setIsValidating(false);
          continue;
        }
      } catch (error) {
        setUploadError(`Failed to validate image dimensions for ${file.name}.`);
        setIsValidating(false);
        continue;
      }
      setIsValidating(false);
      
      // Begin upload
      setIsUploading(true);
      setUploadProgress(0);
      
      try {
        // Upload to Firebase Storage
        const imageData = await uploadListingImage(file, (progress) => {
          setUploadProgress(progress);
        });
        
        // Update form state with new image
        const newImages = [...galleryImages, imageData];
        setValue('media.galleryImages', newImages);
        setValue('media.totalImages', newImages.length);
        
        // If this is the first image, set it as the featured image
        if (newImages.length === 1 || !featuredImage) {
          setValue('media.featuredImage', imageData);
        }
      } catch (error) {
        console.error('Upload error:', error);
        setUploadError(`Failed to upload ${file.name}: ${error.message}`);
      } finally {
        setIsUploading(false);
      }
    }
  }, [galleryImages, featuredImage, setValue]);
  
  // Configure dropzone
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    disabled: isUploading || isValidating,
    maxSize: FILE_SIZE_LIMIT,
    multiple: true,
  });
  
  // Helper function to get image dimensions
  const getImageDimensions = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      img.src = URL.createObjectURL(file);
    });
  };
  
  // Handle removing an image
  const handleRemoveImage = async (index) => {
    // Don't allow removing if it would result in less than minimum images
    if (galleryImages.length <= MIN_IMAGES) {
      setUploadError(`You must have at least ${MIN_IMAGES} images.`);
      return;
    }
    
    const imageToRemove = galleryImages[index];
    
    try {
      // Remove from Firebase Storage
      await deleteListingImage(imageToRemove.path);
      
      // Update form state
      const newImages = galleryImages.filter((_, i) => i !== index);
      setValue('media.galleryImages', newImages);
      setValue('media.totalImages', newImages.length);
      
      // If removed image was featured, set first available image as featured
      if (featuredImage && featuredImage.url === imageToRemove.url) {
        setValue('media.featuredImage', newImages.length > 0 ? newImages[0] : null);
      }
    } catch (error) {
      console.error('Delete error:', error);
      setUploadError(`Failed to delete image: ${error.message}`);
    }
  };
  
  // Set an image as the featured image
  const setAsFeatured = (index) => {
    setValue('media.featuredImage', galleryImages[index]);
  };
  
  return (
    <div className="space-y-8">
      {/* Image Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Image Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-2 mt-1">
                <ImageIcon className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Image Formats</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  JPEG or PNG files only
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-2 mt-1">
                <ImageIcon className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Size Limits</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Maximum 5MB per image
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-2 mt-1">
                <ImageIcon className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Dimensions</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Minimum 800x600 pixels
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-2 mt-1">
                <ImageIcon className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Quantity</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {MIN_IMAGES} to {MAX_IMAGES} images required
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-2 mt-1">
                <ImageIcon className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Featured Image</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Select one image as your main display image
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-2 mt-1">
                <ImageIcon className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Quality</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Clear, high-quality images perform better
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">Upload Images</CardTitle>
            <div className="text-sm text-muted-foreground">
              {galleryImages.length}/{MAX_IMAGES} images
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <FormField
            control={control}
            name="media.galleryImages"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Gallery Images</FormLabel>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>Upload at least {MIN_IMAGES} high-quality images to showcase your listing. Clear, professional images increase engagement.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                {/* Error messages */}
                {uploadError && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{uploadError}</AlertDescription>
                  </Alert>
                )}
                
                <FormControl>
                  <div 
                    {...getRootProps()} 
                    className={`
                      border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
                      ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'}
                      ${isUploading || isValidating ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary hover:bg-primary/5'}
                    `}
                  >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="rounded-full bg-primary/10 p-3">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                      
                      {isUploading ? (
                        <div className="space-y-2 w-full max-w-xs mx-auto">
                          <p className="text-sm font-medium">Uploading...</p>
                          <Progress value={uploadProgress} className="h-2 w-full" />
                          <p className="text-xs text-muted-foreground">{uploadProgress}% complete</p>
                        </div>
                      ) : isValidating ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <p className="text-sm font-medium">Validating image dimensions...</p>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Drag & drop images here</p>
                            <p className="text-xs text-muted-foreground">Or click to browse from your device</p>
                          </div>
                          
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={open}
                            disabled={isUploading || galleryImages.length >= MAX_IMAGES}
                          >
                            Select Images
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </FormControl>
                
                <div className="flex justify-between mt-2">
                  <FormDescription>
                    Upload {MIN_IMAGES}-{MAX_IMAGES} images in JPEG or PNG format.
                  </FormDescription>
                  <div className={`text-sm ${hasMinimumImages ? 'text-green-600' : 'text-amber-600'}`}>
                    {hasMinimumImages ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Minimum requirement met
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        At least {MIN_IMAGES} images required
                      </span>
                    )}
                  </div>
                </div>
                
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
      
      {/* Image Gallery */}
      {galleryImages.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">Image Gallery</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span>= Featured Image</span>
                      <Info className="h-4 w-4 ml-1 text-muted-foreground cursor-help" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p>The featured image will be the main image displayed in search results and listing previews.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div 
                  key={index} 
                  className="relative group rounded-lg overflow-hidden border border-gray-200"
                >
                  <div className="aspect-video w-full relative bg-gray-100">
                    <img
                      src={image.url}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                    
                    {/* Featured badge */}
                    {featuredImage && featuredImage.url === image.url && (
                      <div className="absolute top-2 left-2 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        Featured
                      </div>
                    )}
                  </div>
                  
                  {/* Image controls */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    {/* Set as featured button */}
                    {(!featuredImage || featuredImage.url !== image.url) && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              size="icon"
                              variant="outline"
                              className="bg-white/90 hover:bg-white"
                              onClick={() => setAsFeatured(index)}
                            >
                              <Star className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Set as featured image</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    
                    {/* Remove button */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="bg-red-500/90 hover:bg-red-500"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Remove image</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              ))}
              
              {/* Empty slots */}
              {Array.from({ length: Math.max(0, MIN_IMAGES - galleryImages.length) }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="aspect-video border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-4 bg-gray-50"
                >
                  <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 text-center">Required image</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Help section at the bottom */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-blue-800 mb-1">Image Tips</h4>
          <p className="text-sm text-blue-700">
            Listings with high-quality, well-lit images receive up to 3x more views. Ensure your images clearly show your offering 
            from multiple angles. The first image you upload will automatically be set as your featured image, but you can change this 
            by hovering over any image and clicking the star icon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MediaUpload;