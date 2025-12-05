import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Awards({ isAdmin }) {
  const [awards, setAwards] = useState([]);
  const [flipped, setFlipped] = useState({}); // Track flip states

  const fetchAwards = async () => {
    const snapshot = await getDocs(collection(db, 'awards'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAwards(data);
  };

  useEffect(() => { fetchAwards(); }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'awards', id));
    fetchAwards();
  };

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return '';
    const date = timestamp.toDate();
    return date.toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  const toggleFlip = (id) => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="px-4 py-4 text-white bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen ">
      <h3 className="text-3xl font-bold mb-8 text-center">Awards & Certifications</h3>

      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] max-w-6xl mx-auto">
        {awards.map((award) => (
          <div
            key={award.id}
            className="relative w-full h-80 perspective cursor-pointer"
            onClick={() => toggleFlip(award.id)}
          >
            <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${flipped[award.id] ? 'rotate-y-180' : ''}`}>
              
              {/* Front */}
              <div className="absolute w-full h-full backface-hidden bg-gray-900 overflow-hidden shadow-xl rounded-lg p-4 flex flex-col justify-between items-center text-center">
                <img
                  src={award.imageUrl}
                  alt={award.title}
                  className="w-40 h-40 object-cover object-center border-4 border-gray-700 rounded-lg"
                />
                <h4 className="text-lg font-bold text-center p-6">{award.title}</h4>
              </div>

              {/* Back */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-800 rounded-lg shadow-xl p-4 flex flex-col justify-center items-center text-center">
                {award.description && (
                  <p className="text-sm text-gray-300 mb-2">{award.description}</p>
                )}
                {award.uploadedAt && (
                  <p className="text-xs text-gray-400 mb-3">Uploaded: {formatDate(award.uploadedAt)}</p>
                )}
                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(award.id);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-sm px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
