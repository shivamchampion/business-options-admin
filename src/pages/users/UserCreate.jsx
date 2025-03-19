import React from 'react';
import PageHeader from '../../components/layout/PageHeader';

function UserCreate() {
  return (
    <div className="container mx-auto py-8">
      <PageHeader title="Create User" subtitle="Add a new user to the system" />
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <p>User create form will go here</p>
      </div>
    </div>
  );
}

export default UserCreate;
