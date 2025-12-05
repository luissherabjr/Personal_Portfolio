import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import {Link} from 'react-router-dom';

function ResumeEditor() {
  const [text, setText] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const docRef = doc(db, 'aboutPage', 'resume');

  useEffect(() => {
    async function fetchData() {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setText(data.text || '');
        setResumeUrl(data.link || '');
      }
      setLoading(false);
    }
    fetchData();
  },);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = () => {
    if (!file) return Promise.resolve(resumeUrl); // No new file to upload

    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `resumes/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setUploadProgress(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleSave = async () => {
    if (!text.trim()) {
      setMessage('Description text cannot be empty.');
      return;
    }
    setSaving(true);
    setMessage('');
    try {
      const downloadURL = await uploadFile();
      await setDoc(docRef, { text: text.trim(), link: downloadURL });
      setResumeUrl(downloadURL);
      setMessage('Resume section updated successfully!');
      setFile(null);
      setUploadProgress(0);
    } catch (error) {
      setMessage('Error updating resume: ' + error.message);
    }
    setSaving(false);
  };

  if (loading) return <p className='text-white text-center mt-10'>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 p-6 text-white">
       
      {/* 🔙 Back to Dashboard */}
      <div className='mb-6'>
        <Link  
          to="/admin/dashboard" 
          className='inine-block bg-gray-700 hover:bg-gray-800 transition px-4 py-2 rounded text-sm text-white'>
            back
        </Link>
      </div>
      <div className="max-w-3xl mx-auto bg-black bg-opacity-50 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">Edit Resume Section</h2>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded mb-3 text-black"
          placeholder="Resume description"
          rows={4}
        />

        <div className="mb-4">
          <label className="block mb-1 font-medium">Upload New Resume (PDF only):</label>
          <input type="file" accept="application/pdf" onChange={handleFileChange} className='text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:hover:bg-blue-700' />
        </div>

        {uploadProgress > 0 && (
          <div className="mb-4">
           <p className='mb-1'>Upload Progress: {uploadProgress}%</p> 
            <progress value={uploadProgress} max="100" className="w-full h-2 rounded bg-gray-200" />
          </div>
        )}

        {resumeUrl && (
          <p className="mb-4">
            Current Resume: <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">View PDF</a>
          </p>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 shadow disabled:opacity-50 rounded hover:bg-blue-700">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>

        {message && (<p className={`mt-4 text-sm ${message.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>{message}</p>)}
      </div>
    </div>

  );
}

export default ResumeEditor;
