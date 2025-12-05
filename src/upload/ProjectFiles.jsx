import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Projects({ isAdminPage }) {
  const [projects, setProjects] = useState([]);
  const [flipped, setFlipped] = useState({});

  const fetchProjects = async () => {
    const snapshot = await getDocs(collection(db, 'projects'));
    setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'projects', id));
    fetchProjects();
  };

  const handleEdit = async (id) => {
    const newTitle = prompt('New project title: ');
    const newDescription = prompt('New description: ');
    const newYear = prompt('New year:');
    const newLink = prompt('New project link (URL):');

    if (newTitle) {
      await updateDoc(doc(db, 'projects', id), {
       title: newTitle,
       description: newDescription,
       year: newYear,
       link: newLink, 
      });
      fetchProjects();
    }
  };

  const toggleFlip = (id) => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="px-4 py-3 bg-black text-white">
      <h2 className="text-2xl mb-4">Project Names & Details:</h2>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => toggleFlip(project.id)}
            className="relative w-full h-60 perspective cursor-pointer"
          >
            <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${flipped[project.id] ? 'rotate-y-180' : ''}`}>
              
              {/* Front */}
              <div className="absolute w-full h-full backface-hidden bg-slate-70 p-2 rounded flex flex-col">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-40 object-cover mb-1 rounded"
                />
                <p className="text-sm font-semibold">{project.title}</p>
                {isAdminPage && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(project.id);
                      }}
                      className="bg-yellow-500 px-2 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(project.id);
                      }}
                      className="bg-red-500 px-2 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Back */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-slate-800 p-3 rounded flex flex-col justify-center items-center text-center">
                <p className="text-sm font-bold mb-1">{project.title}</p>
                {project.year && <p className="text-xs text-gray-300 mb-1">Year: {project.year}</p>}
                {project.description && (
                  <p className="text-xs text-gray-400">{project.description}</p>
                )}
                {project.link && (
                  <a 
                   href={project.link} target="_blank"  rel="noopener noreferrer"  className='text-xs text-red-500   hover:underline font-bold m-4 p-2'
                  >
                    View Project
                  </a>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
