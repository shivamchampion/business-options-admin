import React from 'react';
import PageHeader from '../../components/layout/PageHeader';

function RoleCreate() {
  return (
    <div className="container mx-auto py-8">
      <PageHeader title="Create Role" subtitle="Add a new role to the system" />
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <p>Role creation form will go here</p>
      </div>
    </div>
  );
}

export default RoleCreate;
