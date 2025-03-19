import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListMinus } from 'lucide-react';
import toast from 'react-hot-toast';

import PageHeader from '../../components/layout/PageHeader';
import ListingForm from '../../components/listings/ListingForm';

const ListingCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      // const response = await createListing(formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Listing created successfully');
      // Navigate to the listing list page or the new listing detail page
      navigate('/listings');
    } catch (error) {
      console.error('Error creating listing:', error);
      toast.error('Failed to create listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle save as draft
  const handleSaveDraft = async (formData) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      // const response = await createListing({...formData, status: 'draft'});
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Draft saved successfully');
      // Navigate to the listing list page
      navigate('/listings');
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Create New Listing"
        description="Add a new listing to the Business Options Platform."
        breadcrumbs={[
          { label: 'Listings', path: '/listings' },
          { label: 'Create New Listing' }
        ]}
      />
      
      <ListingForm
        onSubmit={handleSubmit}
        onSaveDraft={handleSaveDraft}
        loading={loading}
      />
    </div>
  );
};

export default ListingCreate;