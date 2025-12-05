import React, { useState } from 'react';
import { storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Toast from '../component/Toast';

export default function ProjectUpload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [link, setLink] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const handleUpload = async () => {
    if (!file || !title) {
      setToast({ show: true, message: '❗ Please provide a title and image.', type: 'error' });
      return;
    }

    setIsUploading(true);

    try {
      const storageRef = ref(storage, `projects/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'projects'), {
        title,
        imageUrl: url,
        description,
        year,
        link,
        createdAt: serverTimestamp(),
      });

      setToast({ show: true, message: '✅ Project uploaded successfully!', type: 'success' });

      setTitle('');
      setFile(null);
      setDescription('');
      setLink('');
      setYear('');
    } catch (error) {
      console.error('Upload failed:', error);
      setToast({ show: true, message: '❌ Upload failed, please try again.', type: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-2xl max-w-xl mx-auto text-white mt-10 relative">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload New Project</h2>

      <div className="flex flex-col gap-4 relative">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
        />

        <input
          type="text"
          placeholder="Year (optional)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
        />
        <input
          type="url"
          placeholder="Project Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
        />

        <textarea
          placeholder="Short description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 resize-none"
          rows={3}
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*"
          className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 hover:file:bg-blue-700"
        />

        <div className="relative self-start">
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className={`px-4 py-2 rounded text-white font-semibold transition duration-300 ${
              isUploading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isUploading ? 'Uploading...' : 'Upload Project'}
          </button>

          {/* Toast appears just below the button */}
          {toast.show && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast({ ...toast, show: false })}
            />
          )}
        </div>
      </div>
    </div>
  );
}
