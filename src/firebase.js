// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "",
  authDomain: "personal-portfolio-e7047.firebaseapp.com",
  projectId: "personal-portfolio-e7047",
  storageBucket: "personal-portfolio-e7047.firebasestorage.app",
  messagingSenderId: "635132317438",
  appId: "1:635132317438:web:2c72a450fe82f10cc69faf",
  measurementId: "G-CS04LMKH49"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
}
