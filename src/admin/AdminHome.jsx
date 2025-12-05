// src/admin/AdminHome.jsx
import React from 'react';
import AwardUpload from '../upload/AwardUpload';
import Awards from '../upload/Awards';

export default function AdminHome() {
  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Admin Home Dashboard</h2>
      <AwardUpload />
      <Awards isAdmin={true} />
    </div>
  );
}
