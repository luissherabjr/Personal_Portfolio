import React from 'react';
import { Link } from 'react-router-dom';

export default function Admin() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
      <ul className="space-y-2">
        <li>
          <Link to="/home" className="text-blue-500 underline">
            Manage Home Awards
          </Link>
        </li>
        <li>
          <Link to="/projects" className="text-blue-500 underline">
            Manage Projects
          </Link>
        </li>
      </ul>
    </div>
  );
}
