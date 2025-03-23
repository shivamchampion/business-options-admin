import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import BasicInfo from './BasicInfo';
import MediaUpload from './MediaUpload';
import { useToast } from '@/components/ui/use-toast';
import { basicInfoSchema } from '@/utils/validators';
import { saveListingDraft, createListing } from '@/services/listings';

const STEPS = [
  { id: 'basic-info', title: 'Basic Info', component: BasicInfo, schema: basicInfoSchema },
  { id: 'media-upload', title: 'Media Upload', component: MediaUpload },
  { id: 'details', title: 'Details' },
  { id: 'documents', title: 'Documents' },
  { id: 'review', title: 'Review & Submit' },
];

const ListingForm = ({ userId, onComplete, initialData = null }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialData || {});
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [draftId, setDraftId] = useState(initialData?.id || null);
  const { toast } = useToast();

  // Set up form with initial data and validation schema for current step
  const currentStepConfig = STEPS[currentStep];
  const methods = useForm({
    resolver: currentStepConfig.schema ? zodResolver(currentStepConfig.schema) : undefined,
    defaultValues: {
      ...formData,
    },
    mode: 'onChange',
  });

  const { handleSubmit, formState, reset, getValues, trigger } = methods;

  // Load saved data into form when step changes
  useEffect(() => {
    reset({ ...formData });
  }, [currentStep, reset, formData]);

  // Auto-save draft when form data changes
  const saveFormDraft = async (data, isAutoSave = false) => {
    if (isSaving) return;
    
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);
    
    try {
      const completeData = {
        ...formData,
        ...data,
        status: 'draft',
        currentStep: currentStep,
        updatedAt: new Date(),
        ownerId: userId,
      };
      
      // If we already have a draft ID, update it, otherwise create a new draft
      const result = await saveListingDraft(draftId, completeData);
      
      if (!draftId && result.id) {
        setDraftId(result.id);
      }
      
      // Update the complete form data
      setFormData(completeData);
      setSaveSuccess(true);
      
      if (!isAutoSave) {
        toast({
          title: "Draft saved",
          description: "Your listing draft has been saved",
        });
      }
      
      return result;
    } catch (error) {
      console.error('Error saving draft:', error);
      setSaveError('Failed to save draft. Please try again.');
      
      if (!isAutoSave) {
        toast({
          title: "Error saving draft",
          description: "There was a problem saving your draft",
          variant: "destructive",
        });
      }
      
      return null;
    } finally {
      setIsSaving(false);
      // Clear success message after 3 seconds
      if (saveSuccess) {
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    }
  };

  // Debounced auto-save
  useEffect(() => {
    const autoSaveTimeout = setTimeout(() => {
      if (Object.keys(formData).length > 0) {
        saveFormDraft(getValues(), true);
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(autoSaveTimeout);
  }, [formData, getValues]);

  const onSubmitStep = async (data) => {
    // Save current step data
    await saveFormDraft(data);
    
    // If validation passes, go to next step or submit
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit the entire form
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = async () => {
    try {
      setIsSaving(true);
      
      // Final submission - change status from draft to pending
      const finalData = {
        ...formData,
        status: 'pending',
        submittedAt: new Date(),
      };
      
      const listingId = await createListing(draftId, finalData);
      
      if (listingId) {
        toast({
          title: "Listing submitted",
          description: "Your listing has been submitted for review",
        });
        
        if (onComplete) {
          onComplete(listingId);
        }
      }
    } catch (error) {
      console.error('Error submitting listing:', error);
      toast({
        title: "Error submitting listing",
        description: "There was a problem submitting your listing",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      // Save current data before going back
      saveFormDraft(getValues(), true);
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = currentStepConfig.component;

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {STEPS.map((step, index) => (
            <div 
              key={step.id} 
              className={`flex flex-col items-center ${
                index <= currentStep 
                  ? 'text-primary' 
                  : 'text-gray-400'
              }`}
            >
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full
                ${index < currentStep 
                  ? 'bg-primary text-white' 
                  : index === currentStep 
                    ? 'border-2 border-primary text-primary' 
                    : 'border-2 border-gray-300 text-gray-400'
                }
              `}>
                {index < currentStep 
                  ? <CheckCircle2 className="w-5 h-5" /> 
                  : index + 1
                }
              </div>
              <span className="mt-2 text-xs text-center hidden sm:block">{step.title}</span>
            </div>
          ))}
        </div>
        <Progress value={(currentStep / (STEPS.length - 1)) * 100} className="h-2" />
      </div>

      {/* Form error message */}
      {formState.errors && Object.keys(formState.errors).length > 0 && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Please fix the highlighted errors to proceed.
          </AlertDescription>
        </Alert>
      )}

      {/* Save status messages */}
      {saveSuccess && (
        <Alert variant="success" className="mb-4">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Saved</AlertTitle>
          <AlertDescription>
            Your changes have been saved successfully.
          </AlertDescription>
        </Alert>
      )}
      
      {saveError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{saveError}</AlertDescription>
        </Alert>
      )}

      {/* Form content */}
      <Card className="p-6">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitStep)}>
            <h2 className="text-2xl font-bold mb-6">{currentStepConfig.title}</h2>
            {CurrentStepComponent && <CurrentStepComponent />}
            
            {/* Navigation buttons */}
            <div className="mt-6 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={goToPreviousStep}
                disabled={currentStep === 0 || isSaving}
              >
                Previous
              </Button>
              
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => saveFormDraft(getValues())}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Draft'
                  )}
                </Button>
                
                <Button 
                  type="submit"
                  disabled={isSaving || !formState.isValid}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : currentStep === STEPS.length - 1 ? (
                    'Submit Listing'
                  ) : (
                    'Continue'
                  )}
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};

export default ListingForm;