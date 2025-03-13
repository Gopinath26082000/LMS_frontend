import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import {
  FaHome,           // Home icon for the dashboard
  FaChartLine,      // Statistics icon for Home Page
  FaUserFriends,    // Users icon for Employee Details
  FaFolderOpen,     // File icon for File Details
  FaSignOutAlt,     // Logout icon (changed from FaPowerOff)
} from 'react-icons/fa'; // Import icons
import './AdminNavbar.css'; // Import the CSS file for styles

function HrNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handle scroll to add 'scrolled' class for background change
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to handle logout and redirect
  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing cookies or localStorage)
    navigate('/'); // Redirect to the homepage
  };

  return (
    <nav className={`admin-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="admin-navbar-content">
        {/* Logo Section */}
        <div className="admin-logo" style={{ cursor: 'pointer'}}>
          <h1 className="admin-navbar-title">CloudXpress</h1>
        </div>

        {/* Navigation Links */}
        <ul className="admin-navbar-links">
          <li>
            <a href="/hrdashboard">
              <FaHome style={{ marginRight: '8px' }} /> <b>Dashboard</b>
            </a>
          </li>
          <li>
            <a href="/hremployeedetails">
              <FaUserFriends style={{ marginRight: '8px' }} /> <b>Data User Directory</b>
            </a>
          </li>
          <li>
            <a href="/hrfiledetails">
              <FaFolderOpen style={{ marginRight: '8px' }} /> <b>File Directory</b>
            </a>
          </li>
          <li>
            <a href="/hranalysis">
              <FaChartLine style={{ marginRight: '8px' }} /> <b>Analysis</b>
            </a>
          </li>
          <li>
            <a href="/hrfilerequest">
              <FaFolderOpen style={{ marginRight: '8px' }} /> <b>File Request</b>
            </a>
          </li>

          {/* Logout Button */}
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt style={{ marginRight: '8px' }} /> Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default HrNavbar;
