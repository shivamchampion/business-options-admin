import React from 'react';
import PageHeader from '../../components/layout/PageHeader';

function NewApplications() {
  return (
    <div className="container mx-auto py-8">
      <PageHeader title="New Applications" subtitle="Review recently submitted applications" />
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <p>New applications content will go here</p>
      </div>
    </div>
  );
}

export default NewApplications;
