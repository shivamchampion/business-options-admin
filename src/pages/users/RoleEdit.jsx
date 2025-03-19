import React from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';

function RoleEdit() {
  const { roleId } = useParams();

  return (
    <div className="container mx-auto py-8">
      <PageHeader title="Edit Role" subtitle={`Editing role ID: ${roleId}`} />
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <p>Role edit form will go here</p>
      </div>
    </div>
  );
}

export default RoleEdit;
