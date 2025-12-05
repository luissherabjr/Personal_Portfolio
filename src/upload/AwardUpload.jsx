import React, { useState } from 'react';
import { storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Toast from '../component/Toast';

export default function AwardUpload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const handleUpload = async () => {
    if (!file || !title.trim()) {
      setToast({ show: true, message: '❗ Title & image are required.', type: 'error' });
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `awards/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'awards'), {
        title: title.trim(),
        description: description.trim(),
        imageUrl: url,
        uploadedAt: serverTimestamp(),
      });

      setTitle('');
      setDescription('');
      setFile(null);
      setToast({ show: true, message: '✅ Award uploaded successfully!', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: '❌ Upload failed: ' + error.message, type: 'error' });
    }

    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white p-6 relative">
      <div className="max-w-2xl mx-auto bg-black bg-opacity-50 p-6 rounded-lg shadow-md relative">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2">Upload Award or Certificate</h2>

        <input
          type="text"
          placeholder="Award or Certificate Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-transparent border border-blue-400 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
        />

        <textarea
          placeholder="Brief Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full p-3 mb-4 rounded bg-transparent border border-blue-400 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />

        <div className="relative">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded shadow disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>

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
