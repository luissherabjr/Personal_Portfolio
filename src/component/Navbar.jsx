import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/logos/logo1.svg';

function Navbar({ user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleDashboardClick = () => {
    if (user) {
      navigate('admin/dashboard');
    } else {
      navigate('/login');
    }
  };

  const navLinkClass = (path) => `
    relative pb-1 transition-all duration-300 
    ${location.pathname === path 
      ? 'text-green-500 font-bold after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-green-500 after:transition-all after:duration-300'
      : 'text-white hover:text-green-300 after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-green-300 hover:after:w-full after:transition-all after:duration-300'
    }
  `;

  return (
    <nav className="bg-orange-900 shadow-2xl">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex flex-col items-center">
          <img src={Logo} className="w-12 h-10" alt="Logo" />
          <span className="font-bold text-green-400 text-sm tracking-wide">
            Luis Sherab Jr.
          </span>
        </div>
        
        {/* Navigation Links */}
        <div className="flex space-x-6 items-center font-medium bg-orange-800 p-2 shadow-lg rounded-md">
          <Link to="/" className={navLinkClass("/")}>Home</Link>
          <Link to="/about" className={navLinkClass("/about")}>About</Link>
          <Link to="/project" className={navLinkClass("/project")}>Projects</Link>
          <Link to="/contact" className={navLinkClass("/contact")}>Contact</Link>

          {/* Dashboard */}
          <button 
            onClick={handleDashboardClick} 
            className={navLinkClass("/dashboard")}
          >
            Dashboard
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
