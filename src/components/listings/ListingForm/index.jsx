import React, { useState, useEffect, useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import BasicInfo from './BasicInfo';
import MediaUpload from './MediaUpload';
import ListingDetails from './ListingDetails';
import Documents from './Documents';
import ReviewSubmit from './ReviewSubmit';
import { baseListingSchema } from '@/lib/validators';

const STEPS = [
  { id: 'basic-info', label: 'Basic Info' },
  { id: 'media-upload', label: 'Media' },
  { id: 'details', label: 'Details' },
  { id: 'documents', label: 'Documents' },
  { id: 'review', label: 'Review & Submit' }
];

const DRAFT_STORAGE_KEY = 'listing_form_draft';

const ListingForm = ({ onSubmit, initialData = {} }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const initialLoadCompleted = useRef(false);

  // Set up form with React Hook Form
  const methods = useForm({
    resolver: zodResolver(baseListingSchema),
    defaultValues: {},
    mode: 'onChange'
  });

  const { handleSubmit, reset, formState, watch } = methods;
  const listingType = watch('type');

  // Load saved draft or initial data exactly once when component mounts
  useEffect(() => {
    if (initialLoadCompleted.current) {
      return;
    }

    // Try to load draft from localStorage
    const loadFormData = () => {
      try {
        // Priority: 1. Initial data from props, 2. Saved draft
        let dataToLoad = { ...initialData };
        
        // Only check localStorage if initial data is empty
        if (Object.keys(initialData).length === 0) {
          const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
          if (savedDraft) {
            const parsedDraft = JSON.parse(savedDraft);
            dataToLoad = parsedDraft;
          }
        }
        
        // Update state and reset form
        setFormData(dataToLoad);
        reset(dataToLoad);
        
        initialLoadCompleted.current = true;
      } catch (error) {
        console.error('Error loading form data:', error);
        
        // Fallback to initial data or empty object
        const fallbackData = Object.keys(initialData).length > 0 ? initialData : {};
        setFormData(fallbackData);
        reset(fallbackData);
        
        // Clear corrupted localStorage
        localStorage.removeItem(DRAFT_STORAGE_KEY);
        initialLoadCompleted.current = true;
      }
    };

    loadFormData();
  }, []); // Empty dependency array - run only once

  // Function to manually save draft
  const saveDraft = () => {
    try {
      const currentValues = methods.getValues();
      const dataToSave = {
        ...formData,
        ...currentValues
      };
      
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(dataToSave));
      setFormData(dataToSave);
      return true;
    } catch (error) {
      console.error('Error saving draft:', error);
      return false;
    }
  };

  // Handle step completion
  const completeStep = (data) => {
    const updatedData = {
      ...formData,
      ...data
    };
    
    // Update form data state
    setFormData(updatedData);
    
    // Save draft to localStorage
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(updatedData));

    // If we're on the final step, submit the form
    if (currentStep === STEPS.length - 1) {
      handleFinalSubmit(updatedData);
    } else {
      // Otherwise, move to the next step
      setCurrentStep(prev => prev + 1);
    }
  };

  // Handle final submission
  const handleFinalSubmit = async (data) => {
    try {
      // Clear draft since we're done with the form
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      
      // Call onSubmit prop with final data
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting form:', error);
      // You might want to show an error toast here
    }
  };

  // Go to previous step
  const goToPreviousStep = () => {
    // Save current state before going back
    saveDraft();
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  // Handle exit
  const handleExit = () => {
    setShowExitDialog(true);
  };

  // Confirm exit
  const confirmExit = () => {
    saveDraft();
    setShowExitDialog(false);
    // Navigate back - this would be handled by the router in a real implementation
  };

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfo />;
      case 1:
        return <MediaUpload />;
      case 2:
        return <ListingDetails listingType={listingType} />;
      case 3:
        return <Documents listingType={listingType} />;
      case 4:
        return <ReviewSubmit formData={formData} />;
      default:
        return <BasicInfo />;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col space-y-8">
        {/* Progress Indicator */}
        <div className="w-full">
          <div className="flex justify-between mb-2">
            {STEPS.map((step, index) => (
              <div 
                key={step.id}
                className={`flex flex-col items-center w-1/5 ${index < currentStep ? 'text-blue-600' : index === currentStep ? 'text-blue-600' : 'text-gray-400'}`}
              >
                <div 
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 mb-2
                    ${index < currentStep 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : index === currentStep 
                        ? 'border-blue-600 text-blue-600' 
                        : 'border-gray-300 text-gray-400'}`}
                >
                  {index < currentStep ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="text-sm font-medium">{step.label}</span>
              </div>
            ))}
          </div>
          <div className="relative h-2 w-full bg-gray-200 rounded">
            <div 
              className="absolute top-0 left-0 h-2 bg-blue-600 rounded transition-all duration-300"
              style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <Card className="p-6">
          <form onSubmit={handleSubmit(completeStep)}>
            {renderStep()}

            {/* Action Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <div>
                {currentStep > 0 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={goToPreviousStep}
                  >
                    Previous
                  </Button>
                )}
              </div>
              <div className="flex space-x-4">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => saveDraft() && handleExit()}
                >
                  Save Draft
                </Button>
                <Button 
                  type="submit" 
                  disabled={!formState.isValid}
                >
                  {currentStep === STEPS.length - 1 ? 'Submit Listing' : 'Next'}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>

      {/* Exit Confirmation Dialog */}
      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent>
          <DialogTitle>Save Draft and Exit?</DialogTitle>
          <DialogDescription>
            Your progress has been saved as a draft. You can return and continue editing at any time.
          </DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExitDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmExit}>
              Exit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};

export default ListingForm;