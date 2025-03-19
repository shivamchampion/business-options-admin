import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Toast } from '@/components/ui/use-toast';
import ListingForm from '@/components/listings/ListingForm';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import PageHeader from '@/components/layout/PageHeader';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { useAuth } from '@/hooks/useAuth';
import { createListing } from '@/services/listings';

const ListingCreate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Listings', path: '/listings' },
    { label: 'Create Listing', path: '/listings/create' },
  ];

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      
      // Add owner information and metadata
      const listingData = {
        ...formData,
        ownerId: user?.uid || 'unknown',
        ownerName: user?.displayName || 'Unknown User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'pending', // New listings start as pending for review
        analytics: {
          viewCount: 0,
          uniqueViewCount: 0,
          contactCount: 0,
          favoriteCount: 0,
        },
      };

      // In a real app, this would call your API
      console.log('Submitting listing data:', listingData);
      
      // For demonstration purposes - simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response
      const listingId = 'listing-' + Math.floor(Math.random() * 1000);

      toast({
        title: "Listing Created Successfully!",
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Listing | Business Options Platform</title>
      </Helmet>
      
      <PageHeader
        title="Create New Listing"
        description="Create a new listing for a business, franchise, startup, investor, or digital asset."
        breadcrumbs={breadcrumbItems}
      />

      {isSubmitting ? (
        <div className="p-12 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Submitting your listing...</p>
        </div>
      ) : (
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <ListingForm onSubmit={handleSubmit} />
        </div>
      )}
    </>
  );
};

export default ListingCreate;