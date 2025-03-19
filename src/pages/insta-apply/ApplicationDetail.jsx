import React from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';

function ApplicationDetail() {
  const { applicationId } = useParams();

  return (
    <div className="container mx-auto py-8">
      <PageHeader title="Application Details" subtitle={`Viewing application ID: ${applicationId}`} />
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <p>Application detail content will go here</p>
      </div>
    </div>
  );
}

export default ApplicationDetail;
