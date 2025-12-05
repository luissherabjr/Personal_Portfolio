import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

function AboutEditor() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const docRef = doc(db, 'aboutPage', 'main');

  useEffect(() => {
    const fetchData = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title || '');
        setBody(data.body || '');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!title.trim() || !body.trim()) {
      setMessage("Title and content cannot be empty.");
      return;
    }
    setSaving(true);
    try {
      await setDoc(docRef, { title, body });
      setMessage("About page updated successfully!");
    } catch (err) {
      setMessage("Error updating content: " + err.message);
    }
    setSaving(false);
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl max-w-2xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit About Page</h2>

      {loading ? (
        <p className="text-gray-300 text-center">Loading...</p>
      ) : (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            placeholder="Page Title"
          />

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full h-40 p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 resize-none mb-4"
            placeholder="Page Content"
          />

          <button
            onClick={handleSave}
            disabled={saving}
            className={`w-full py-2 rounded font-semibold transition duration-300 ${
              saving
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>

          {message && (
            <p className="mt-4 text-sm text-green-400 text-center">{message}</p>
          )}

          {/* Resume Edit Link */}
          <div className="border-t border-gray-700 mt-10 pt-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Want to update your resume?</h3>
            <Link
              to="/admin/edit/resume"
              className="inline-block bg-gray-700 hover:bg-gray-800 transition px-4 py-2 rounded text-white"
            >
              Go to Resume Editor
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default AboutEditor;
