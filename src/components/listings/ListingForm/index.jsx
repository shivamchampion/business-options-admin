import React, { useState, useEffect } from 'react';
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

const ListingForm = ({ onSubmit, initialData = {} }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [formData, setFormData] = useState({
    ...initialData
  });

  // Set up form with React Hook Form
  const methods = useForm({
    resolver: zodResolver(baseListingSchema),
    defaultValues: initialData,
    mode: 'onChange'
  });

  const { handleSubmit, watch, formState } = methods;
  const listingType = watch('type');

  // Save form state to localStorage every time it changes
  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('listing_form_draft', JSON.stringify({
        ...formData,
        ...value
      }));
    });
    return () => subscription.unsubscribe();
  }, [watch, formData]);

  // Try to load draft from localStorage on initial render
  useEffect(() => {
    const savedDraft = localStorage.getItem('listing_form_draft');
    if (savedDraft && Object.keys(initialData).length === 0) {
      const parsedDraft = JSON.parse(savedDraft);
      methods.reset(parsedDraft);
      setFormData(parsedDraft);
    }
  }, [initialData, methods]);

  const completeStep = async (data) => {
    const updatedData = {
      ...formData,
      ...data
    };
    setFormData(updatedData);

    // If we're on the final step, submit the form
    if (currentStep === STEPS.length - 1) {
      await handleFinalSubmit(updatedData);
    } else {
      // Otherwise, move to the next step
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleFinalSubmit = async (data) => {
    localStorage.removeItem('listing_form_draft');
    await onSubmit(data);
  };

  const goToPreviousStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const saveDraft = () => {
    const currentData = methods.getValues();
    setFormData(prev => ({
      ...prev,
      ...currentData
    }));

    localStorage.setItem('listing_form_draft', JSON.stringify({
      ...formData,
      ...currentData
    }));

    return true;
  };

  const handleExit = () => {
    setShowExitDialog(true);
  };

  const confirmExit = () => {
    saveDraft();
    setShowExitDialog(false);
    // Navigate back - this would be handled by the router in a real implementation
  };

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
          <form onSubmit={methods.handleSubmit(completeStep)}>
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