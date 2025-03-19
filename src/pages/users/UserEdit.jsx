import React from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';

function UserEdit() {
  const { userId } = useParams();

  return (
    <div className="container mx-auto py-8">
      <PageHeader title="Edit User" subtitle={`Editing user ID: ${userId}`} />
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <p>User edit form will go here</p>
      </div>
    </div>
  );
}

export default UserEdit;
