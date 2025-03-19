import React from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';

function AdvisorDetail() {
  const { advisorId } = useParams();

  return (
    <div className="container mx-auto py-8">
      <PageHeader title="Advisor Details" subtitle={`Viewing advisor ID: ${advisorId}`} />
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <p>Advisor detail content will go here</p>
      </div>
    </div>
  );
}

export default AdvisorDetail;
