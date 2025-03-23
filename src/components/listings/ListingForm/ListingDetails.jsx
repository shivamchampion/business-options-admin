import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import BusinessForm from '@/components/listings/business/BusinessForm';
import FranchiseForm from '@/components/listings/franchise/FranchiseForm';
import StartupForm from '@/components/listings/startup/StartupForm';
import InvestorForm from '@/components/listings/investor/InvestorForm';
import DigitalAssetForm from '@/components/listings/digital-asset/DigitalAssetForm';

const ListingDetails = () => {
  const { watch, formState: { errors } } = useFormContext();
  const listingType = watch('type');
  
  // Scroll to error if there's any in this step
  useEffect(() => {
    if (Object.keys(errors).some(key => key.includes('Details'))) {
      // Find the first error element and scroll to it
      const firstErrorKey = Object.keys(errors).find(key => key.includes('Details'));
      const errorField = document.querySelector(`[name="${firstErrorKey}"]`);
      
      if (errorField) {
        errorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorField.focus({ preventScroll: true });
      }
    }
  }, [errors]);
  
  if (!listingType) {
    return (
      <Alert variant="destructive" className="my-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Please select a listing type in the Basic Info step before proceeding.
        </AlertDescription>
      </Alert>
    );
  }
  
  // Render the appropriate form based on listing type
  const renderForm = () => {
    switch (listingType) {
      case 'business':
        return <BusinessForm />;
      case 'franchise':
        return <FranchiseForm />;
      case 'startup':
        return <StartupForm />;
      case 'investor':
        return <InvestorForm />;
      case 'digital_asset':
        return <DigitalAssetForm />;
      default:
        return (
          <Alert variant="destructive" className="my-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Invalid listing type selected. Please go back and select a valid listing type.
            </AlertDescription>
          </Alert>
        );
    }
  };
  
  return (
    <div className="space-y-6">
      {renderForm()}
    </div>
  );
};

export default ListingDetails;