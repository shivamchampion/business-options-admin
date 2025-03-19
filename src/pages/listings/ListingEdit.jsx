import React from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';

function ListingEdit() {
  const { listingId } = useParams();

  return (
    <div className="container mx-auto py-8">
      <PageHeader title="Edit Listing" subtitle={`Editing listing ID: ${listingId}`} />
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <p>Listing edit form will go here</p>
      </div>
    </div>
  );
}

export default ListingEdit;
