// src/admin/AdminProjects.jsx
import React from 'react';
import ProjectUpload from '../upload/ProjectsUpload.jsx';
import ProjectFiles from '../upload/ProjectFiles.jsx';

export default function AdminProjects() {
  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Manage Projects
      </h2>
      <ProjectUpload />
      <ProjectFiles isAdmin={true} />
    </div>
  );
}
