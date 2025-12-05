// src/admin/SiteStats.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function SiteStats() {
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    const fetchVisits = async () => {
      const snap = await getDoc(doc(db, 'siteStats', 'visits'));
      if (snap.exists()) {
        setVisits(snap.data().count);
      }
    };
    fetchVisits();
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded mb-8">
      <h2 className="text-xl mb-2">Site Analytics</h2>
      <p>Total Homepage Visits: {visits}</p>
    </div>
  );
}
