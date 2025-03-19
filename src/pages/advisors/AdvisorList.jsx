import React from 'react';
import PageHeader from '../../components/layout/PageHeader';

function AdvisorList() {
  return (
    <div className="container mx-auto py-8">
      <PageHeader title="Advisors" subtitle="Manage business advisors" />
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <p>Advisor list content will go here</p>
      </div>
    </div>
  );
}

export default AdvisorList;
