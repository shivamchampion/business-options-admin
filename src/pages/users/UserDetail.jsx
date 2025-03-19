import React from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';

function UserDetail() {
  const { userId } = useParams();

  return (
    <div className="container mx-auto py-8">
      <PageHeader title="User Details" subtitle={`Viewing user ID: ${userId}`} />
      <div className="bg-white shadow rounded-lg p-6 mt-6">
        <p>User detail content will go here</p>
      </div>
    </div>
  );
}

export default UserDetail;
