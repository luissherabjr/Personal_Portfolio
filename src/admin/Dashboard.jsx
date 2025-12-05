import React, { useState } from 'react';
import SiteStats from './Sitestats';
import ProjectsUpload from '../upload/ProjectsUpload';
import AwardUpload from '../upload/AwardUpload';
import AboutEditor from '../upload/AboutEditor';
import ContactEditor from '../upload/ContactEditor';
import HeroUpload from '../upload/HeroUpload';
import { Menu, X } from 'lucide-react'; // use react-icons or lucide-react

const sections = {
  stats: 'Stats',
  projects: 'Projects',
  awards: 'Awards',
  about: 'About',
  contact: 'Contact',
  hero:'Hero',
};

export default function Dashboard({ setUser }) {
  const [activeSection, setActiveSection] = useState('stats');
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 to-gray-200">
      
      {/* Sidebar Drawer for Small Screens */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:h-auto md:block`}
      >
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center md:block">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <button
              onClick={() => setShowSidebar(false)}
              className="md:hidden text-gray-600"
            >
              <X />
            </button>
          </div>
          {Object.entries(sections).map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setActiveSection(key);
                setShowSidebar(false);
              }}
              className={`w-full text-left px-4 py-2 rounded transition-all duration-300 ${
                activeSection === key
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'hover:bg-blue-100'
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 mt-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto relative">
        {/* Hamburger Button */}
        <button
          className="md:hidden absolute top-4 left-4 z-40 bg-white p-2 rounded shadow-md"
          onClick={() => setShowSidebar(true)}
        >
          <Menu />
        </button>

        <div className="bg-white shadow-lg rounded-xl p-6 min-h-[85vh]">
          {activeSection === 'stats' && <SiteStats />}
          {activeSection === 'projects' && <ProjectsUpload />}
          {activeSection === 'awards' && <AwardUpload />}
          {activeSection === 'about' && <AboutEditor />}
          {activeSection === 'contact' && <ContactEditor />}
          {activeSection === 'hero' && <HeroUpload />}
        </div>
      </main>
    </div>
  );
}
