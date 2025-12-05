// src/admin/ContactInfoEditor.jsx
import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

function ContactEditor() {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const docRef = doc(db, 'contactInfo', 'main');

  useEffect(() => {
    const loadInfo = async () => {
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        setPhone(data.phone || '');
        setAddress(data.address || '');
      }
    };
    loadInfo();
  }, []);

  const handleSave = async () => {
    try {
      await setDoc(docRef, { phone, address });
      setMessage('Contact info updated successfully!');
    } catch (err) {
      setMessage('Error updating info: ' + err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Edit Contact Info</h2>
      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="Mailing Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}

export default ContactEditor;
