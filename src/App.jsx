// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './component/Navbar';
import Footer from './component/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Project from './pages/Project';
import Contact from './pages/Contact';
import Login from './component/Login';

import AdminHome from "./admin/AdminHome";
import AdminProjects from "./admin/AdminProjects";
import Dashboard from './admin/Dashboard';
import PrivateRoute from './admin/PrivateRoute';
import AboutEditor from './upload/AboutEditor';
import ResumeEditor from './upload/ResumeEditor';
import ContactEditor from './upload/ContactEditor';

import { subscribeToAuthChanges, auth} from './firebase';
import { signOut } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(setUser);
    return () => unsubscribe();
  }, []);

  const handleLogOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} handleLogOut={handleLogOut} />

      <main className="p-8 flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />

          <Route element={<PrivateRoute user={user} />}>
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/edit/about" element={<AboutEditor />} />
            <Route path="/admin/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
            <Route path="/admin/edit/resume" element={<ResumeEditor />} />
            <Route path="/admin/edit/contact-info" element={<ContactEditor />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
