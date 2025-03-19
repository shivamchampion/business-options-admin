import React from 'react';
import PageHeader from '../../components/layout/PageHeader';

function FeaturedListings() {
  return (
    <div className="container mx-auto py-8">
      <PageHeader title="Featured Listings" subtitle="Manage featured business listings" />
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <p>Featured listings content will go here</p>
      </div>
    </div>
  );
}

export default FeaturedListings;
