import React from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';

function LeadDetail() {
  const { leadId } = useParams();

  return (
    <div className="container mx-auto py-8">
      <PageHeader title="Lead Details" subtitle={`Viewing lead ID: ${leadId}`} />
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <p>Lead detail content will go here</p>
      </div>
    </div>
  );
}

export default LeadDetail;
