import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, ArrowLeft, ArrowRight, FileCheck, AlertTriangle } from 'lucide-react';
import { z } from 'zod';

// Multi-step form components
import BasicInfo from './BasicInfo';
import MediaUpload from './MediaUpload';
import ListingDetails from './ListingDetails';
import Documents from './Documents';
import ReviewSubmit from './ReviewSubmit';

// Common components
import LoadingSpinner from '../../common/LoadingSpinner';
import ConfirmationDialog from '../../common/ConfirmationDialog';

// Validation schemas
import { 
  basicInfoSchema, 
  mediaSchema, 
  businessSchema, 
  franchiseSchema, 
  startupSchema, 
  investorSchema, 
  digitalAssetSchema, 
  documentsSchema 
} from './validation';

const ListingForm = ({
  initialData = null,
  isEdit = false,
  onSubmit,
  onSaveDraft,
  loading = false,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [listingType, setListingType] = useState(initialData?.type || 'business');
  const [images, setImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const navigate = useNavigate();
  
  // Get proper schema based on listing type for step 3
  const getDetailsSchema = () => {
    switch (listingType) {
      case 'business':
        return businessSchema;
      case 'franchise':
        return franchiseSchema;
      case 'startup':
        return startupSchema;
      case 'investor':
        return investorSchema;
      case 'digital_asset':
        return digitalAssetSchema;
      default:
        return businessSchema;
    }
  };
  
  // Create form validation schema based on current step
  const getValidationSchema = () => {
    switch (currentStep) {
      case 1:
        return basicInfoSchema;
      case 2:
        return mediaSchema;
      case 3:
        return getDetailsSchema();
      case 4:
        return documentsSchema;
      case 5:
        // Review step doesn't need additional validation
        return z.object({});
      default:
        return basicInfoSchema;
    }
  };
  
  // Set up react-hook-form with zod validation
  const methods = useForm({
    resolver: zodResolver(getValidationSchema()),
    defaultValues: initialData || {
      name: '',
      type: 'business',
      industries: [],
      description: '',
      status: 'draft',
      plan: 'Free',
      location: {
        country: 'India',
        state: '',
        city: '',
      },
      contactInfo: {
        email: '',
        phone: '',
      },
    },
    mode: 'onChange',
  });
  
  const { handleSubmit, watch, setValue, formState: { errors, isDirty } } = methods;
  
  // Watch for listing type changes
  const watchedListingType = watch('type');
  
  useEffect(() => {
    if (watchedListingType !== listingType) {
      setListingType(watchedListingType);
    }
  }, [watchedListingType, listingType]);
  
  // Set up media files initial state if editing
  useEffect(() => {
    if (isEdit && initialData?.media?.galleryImages) {
      setImages(initialData.media.galleryImages);
    }
    
    if (isEdit && initialData?.documents) {
      setDocuments(initialData.documents);
    }
  }, [isEdit, initialData]);
  
  // Handle step navigation
  const handleNextStep = async () => {
    const isValid = await methods.trigger();
    
    if (isValid) {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 5));
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
    window.scrollTo(0, 0);
  };
  
  const jumpToStep = (step) => {
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };
  
  // Handle save as draft
  const handleSaveDraft = () => {
    const currentData = methods.getValues();
    onSaveDraft({
      ...currentData,
      status: 'draft',
      galleryImageFiles: images.filter(img => img instanceof File),
      documentFiles: documents.filter(doc => doc instanceof File),
    });
  };
  
  // Handle form submission
  const handleFormSubmit = (data) => {
    // Combine form data with files
    const formData = {
      ...data,
      galleryImageFiles: images.filter(img => img instanceof File),
      documentFiles: documents.filter(doc => doc instanceof File),
    };
    
    onSubmit(formData);
  };
  
  // Handle cancel and back to listings
  const handleCancel = () => {
    if (isDirty) {
      setShowUnsavedDialog(true);
    } else {
      navigate('/listings');
    }
  };
  
  // Render stepper
  const renderStepper = () => {
    const steps = [
      { number: 1, label: 'Basic Info' },
      { number: 2, label: 'Media' },
      { number: 3, label: 'Details' },
      { number: 4, label: 'Documents' },
      { number: 5, label: 'Review' },
    ];
    
    return (
      <div className="stepper mb-8">
        {steps.map((step) => (
          <div 
            key={step.number} 
            className={`step ${
              currentStep === step.number 
                ? 'step-active' 
                : currentStep > step.number 
                  ? 'step-completed' 
                  : ''
            }`}
            onClick={() => currentStep > step.number && jumpToStep(step.number)}
          >
            <div className="step-line"></div>
            <div className="step-circle">
              {currentStep > step.number ? (
                <FileCheck size={16} />
              ) : (
                step.number
              )}
            </div>
            <div className="step-label">{step.label}</div>
          </div>
        ))}
      </div>
    );
  };
  
  // Render current step form
  const renderCurrentStepForm = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfo />;
      case 2:
        return <MediaUpload images={images} setImages={setImages} />;
      case 3:
        return <ListingDetails listingType={listingType} />;
      case 4:
        return <Documents documents={documents} setDocuments={setDocuments} listingType={listingType} />;
      case 5:
        return <ReviewSubmit listingType={listingType} images={images} documents={documents} />;
      default:
        return <BasicInfo />;
    }
  };
  
  // Render validation errors summary
  const renderErrorsSummary = () => {
    if (Object.keys(errors).length === 0) return null;
    
    return (
      <div className="bg-error bg-opacity-10 text-error text-sm p-4 rounded-md mb-6">
        <div className="flex items-start">
          <AlertTriangle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium mb-2">Please fix the following errors:</p>
            <ul className="list-disc list-inside">
              {Object.entries(errors).map(([field, error]) => (
                <li key={field} className="mb-1">
                  {error.message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Stepper */}
        {renderStepper()}
        
        {/* Validation errors summary */}
        {renderErrorsSummary()}
        
        {/* Current step form */}
        {renderCurrentStepForm()}
        
        {/* Form actions */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
                onClick={handlePrevStep}
                disabled={loading}
              >
                <ArrowLeft size={16} className="mr-2" />
                Previous
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
            
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-brand-blue text-brand-blue rounded-md shadow-sm text-sm font-medium bg-white hover:bg-light-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
              onClick={handleSaveDraft}
              disabled={loading}
            >
              <Save size={16} className="mr-2" />
              Save as Draft
            </button>
            
            {currentStep < 5 ? (
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-medium-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
                onClick={handleNextStep}
                disabled={loading}
              >
                Next
                <ArrowRight size={16} className="ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-brand-blue hover:bg-medium-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="small" />
                    <span className="ml-2">Submitting...</span>
                  </>
                ) : (
                  <>
                    <FileCheck size={18} className="mr-2" />
                    {isEdit ? 'Update Listing' : 'Submit Listing'}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
      
      {/* Unsaved changes dialog */}
      <ConfirmationDialog
        isOpen={showUnsavedDialog}
        onClose={() => setShowUnsavedDialog(false)}
        onConfirm={() => navigate('/listings')}
        title="Discard unsaved changes?"
        message="You have unsaved changes. Are you sure you want to leave this page? Your changes will be lost."
        confirmText="Discard Changes"
        cancelText="Continue Editing"
        variant="warning"
        destructive={true}
      />
    </FormProvider>
  );
};

export default ListingForm;