import React from 'react';
import PageHeader from '../../components/layout/PageHeader';

function LeadList() {
  return (
    <div className="container mx-auto py-8">
      <PageHeader title="Advisor Leads" subtitle="Manage business leads for advisors" />
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <p>Lead list content will go here</p>
      </div>
    </div>
  );
}

export default LeadList;
