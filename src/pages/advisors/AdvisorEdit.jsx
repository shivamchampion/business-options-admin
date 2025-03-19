import React from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';

function AdvisorEdit() {
  const { advisorId } = useParams();

  return (
    <div className="container mx-auto py-8">
      <PageHeader title="Edit Advisor" subtitle={`Editing advisor ID: ${advisorId}`} />
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <p>Advisor edit form will go here</p>
      </div>
    </div>
  );
}

export default AdvisorEdit;
