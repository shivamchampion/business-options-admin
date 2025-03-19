import React from 'react';
import { useFormContext } from 'react-hook-form';
import BusinessForm from '../business/BusinessForm';
import FranchiseForm from '../franchise/FranchiseForm';
import StartupForm from '../startup/StartupForm';
import InvestorForm from '../investor/InvestorForm';
import DigitalAssetForm from '../digital-asset/DigitalAssetForm';

const ListingDetails = ({ listingType }) => {
  const { formState } = useFormContext();
  
  if (!listingType) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-medium text-gray-600">Please select a listing type in the Basic Info step</h2>
        <p className="mt-2 text-gray-500">The details form will be customized based on your selection.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="text-lg font-semibold">Step 3: {getListingTypeLabel(listingType)} Details</div>
      <p className="text-gray-600">
        Please provide specific information about your {getListingTypeLabel(listingType).toLowerCase()}.
      </p>
      
      {renderForm(listingType)}
    </div>
  );
};

const renderForm = (listingType) => {
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
      return null;
  }
};

const getListingTypeLabel = (type) => {
  switch (type) {
    case 'business':
      return 'Business';
    case 'franchise':
      return 'Franchise';
    case 'startup':
      return 'Startup';
    case 'investor':
      return 'Investor';
    case 'digital_asset':
      return 'Digital Asset';
    default:
      return 'Listing';
  }
};

export default ListingDetails;