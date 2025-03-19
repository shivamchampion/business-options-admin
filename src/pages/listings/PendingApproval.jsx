import React from 'react';
import PageHeader from '../../components/layout/PageHeader';

function PendingApproval() {
  return (
    <div className="container mx-auto py-8">
      <PageHeader title="Pending Approval" subtitle="Review listings awaiting approval" />
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <p>Pending approval listings content will go here</p>
      </div>
    </div>
  );
}

export default PendingApproval;
