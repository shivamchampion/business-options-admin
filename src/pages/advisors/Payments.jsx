import React from 'react';
import PageHeader from '../../components/layout/PageHeader';

function Payments() {
  return (
    <div className="container mx-auto py-8">
      <PageHeader title="Advisor Payments" subtitle="View and manage payment history for advisors" />
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <p>Advisor payments content will go here</p>
      </div>
    </div>
  );
}

export default Payments;
