import React from 'react';
import PageHeader from '../../components/layout/PageHeader';

function RoleList() {
  return (
    <div className="container mx-auto py-8">
      <PageHeader title="Roles" subtitle="Manage user roles and permissions" />
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <p>Role list content will go here</p>
      </div>
    </div>
  );
}

export default RoleList;
