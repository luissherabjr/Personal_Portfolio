import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Toast from '../component/Toast';

export default function HeroUpload() {
  const [file, setFile] = useState(null);
  const [toast, setToast] = useState({show: false, message: '', type: ''});

  const handleUpload = async () => {
    if (!file) {
      setToast({show:true, message: 'No file is selected.', type: 'error'});
     return;
    }
    try {
      const storageRef = ref(storage, `heroImages/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'heroImages'), {
        imageUrl: url,
        createdAt: serverTimestamp(),
      });

      setToast({ show: true, message: '✅ Upload successful!', type: 'success' });
      setFile(null);
    } catch (error) {
      console.error(error);
      setToast({ show: true, message: '❌ Upload failed!', type: 'error' });
    }
  };
   
  return (
    <div className="bg-gray-900 text-white p-4 rounded shadow max-w-md mx-auto mt-10 space-x-4 space-y-4 relative inline-block">
      <h2 className="text-xl font-semibold mb-2">Upload Hero Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />
      <div className='relative'>
        <button
          onClick={handleUpload}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
         Upload
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
  );
}
