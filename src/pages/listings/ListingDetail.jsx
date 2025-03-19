import React from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';

function ListingDetail() {
  const { listingId } = useParams();

  return (
    <div className="container mx-auto py-8">
      <PageHeader title="Listing Details" subtitle={`Viewing listing ID: ${listingId}`} />
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <p>Listing detail content will go here</p>
      </div>
    </div>
  );
}

export default ListingDetail;
