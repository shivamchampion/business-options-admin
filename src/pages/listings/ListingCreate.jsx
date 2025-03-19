import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Toast } from '@/components/ui/use-toast';
import ListingForm from '@/components/listings/ListingForm';

import PageHeader from '@/components/layout/PageHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { useAuth } from '@/hooks/useAuth';
import { createListing } from '@/services/listings';


const ListingCreate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Listings', path: '/listings' },
    { label: 'Create Listing', path: '/listings/create' },
  ];

  const handleSubmit = async (formData) => {
    try {
      // Add owner information
      const listingData = {
        ...formData,
        ownerId: user.uid,
        ownerName: user.displayName,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'pending', // New listings start as pending for review
        analytics: {
          viewCount: 0,
          uniqueViewCount: 0,
          contactCount: 0,
          favoriteCount: 0,
        },
      };

      // Create the listing
      const listingId = await createListing(listingData);

      Toast({
        title: "Listing Created",
        description: "Your listing has been submitted for review.",
        variant: "success",
      });

      // Redirect to the listing detail view
      navigate(`/listings/${listingId}`);
    } catch (error) {
      console.error('Error creating listing:', error);
      Toast({
        title: "Error",
        description: "Failed to create listing. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
    
      <Helmet>
        <title>Create Listing | Business Options Platform</title>
      </Helmet>
      
      <PageHeader>
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-2xl font-semibold text-gray-900">Create New Listing</h1>
        <p className="mt-2 text-gray-600">
          Create a new listing for a business, franchise, startup, investor, or digital asset.
        </p>
      </PageHeader>

      <div className="p-6 bg-white rounded-lg shadow-sm">
        <ListingForm onSubmit={handleSubmit} />
      </div>
</>
  );
};

export default ListingCreate;