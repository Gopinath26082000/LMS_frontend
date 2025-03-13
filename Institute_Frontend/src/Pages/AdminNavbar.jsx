import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSignOutAlt, FaBars, FaTimes, FaUserPlus, FaBook } from 'react-icons/fa';
import { Menu, MenuItem, Slide } from '@mui/material';
import './AdminNavbar.css';

function AdminNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [registerAnchorEl, setRegisterAnchorEl] = useState(null);
  const [directoriesAnchorEl, setDirectoriesAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleRegisterClick = (event) => {
    setRegisterAnchorEl(event.currentTarget);
  };

  const handleDirectoriesClick = (event) => {
    setDirectoriesAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setRegisterAnchorEl(null);
    setDirectoriesAnchorEl(null);
  };

  return (
    <nav className={`admin-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="admin-navbar-content">
        <div className="admin-logo" style={{ cursor: 'pointer' }}>
          <h1 className="admin-navbar-title">EduIns</h1>
        </div>

        <div className="mobile-menu-button" onClick={toggleSidebar}>
          <FaBars size={24} />
        </div>

        <ul className="admin-navbar-links desktop">
        

          {/* Register Dropdown */}
          <li onClick={handleRegisterClick} className="dropdown">
            <a href="#" className={location.pathname === '#' ? 'active' : ''}><b>Register Credentials</b></a>
          </li>

          {/* Directories Dropdown */}
          <li onClick={handleDirectoriesClick} className="dropdown">
            <a href="#" className={location.pathname === '#' ? 'active' : ''}><b>View Directories</b></a>

          </li>
          <li><a href="/admincomplaints" className={location.pathname === '/admincomplaints' ? 'active' : ''}><b>Complaints</b></a></li>
          <li><a href="/adminannouncements" className={location.pathname === '/adminannouncements' ? 'active' : ''}><b>Announcements</b></a></li>

          <li><button className="logout-btn" onClick={handleLogout}><FaSignOutAlt style={{ marginRight: '8px' }} /> Logout</button></li>
        </ul>
      </div>

      {/* Glass background overlay */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* Off-canvas Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}><FaTimes size={24} /></button>
        <ul>
         
          <li onClick={handleRegisterClick}>
            <a href="#">Register</a>

          </li>
          <li onClick={handleDirectoriesClick}>
            <a href="#">Directories</a>

          </li>

          <li><a href="/adminfiledetails" onClick={toggleSidebar}>Job's Details</a></li>
          <li><a href="/admincomplaints" onClick={toggleSidebar}>Complaints</a></li>
          <li><a href="/adminannouncements" onClick={toggleSidebar}>Announcements</a></li>

          <li><button className="logout-btn" onClick={handleLogout}><FaSignOutAlt style={{ marginRight: '8px' }} /> Logout</button></li>
        </ul>
      </div>

      {/* Register Dropdown Menu */}
      <Menu
        anchorEl={registerAnchorEl}
        open={Boolean(registerAnchorEl)}
        onClose={handleCloseMenu}
        TransitionComponent={Slide}
        direction="down"
      >
        <MenuItem onClick={() => { navigate('/employeeRegister'); handleCloseMenu(); }}>Student Register</MenuItem>
        <MenuItem onClick={() => { navigate('/tlregister'); handleCloseMenu(); }}>Staff Register</MenuItem>
      </Menu>

      {/* Directories Dropdown Menu */}
      <Menu
        anchorEl={directoriesAnchorEl}
        open={Boolean(directoriesAnchorEl)}
        onClose={handleCloseMenu}
        TransitionComponent={Slide}
        direction="down"
      >
        <MenuItem onClick={() => { navigate('/studentdirectory'); handleCloseMenu(); }}>Student Directory</MenuItem>
        <MenuItem onClick={() => { navigate('/staffdirectory'); handleCloseMenu(); }}>Staff Directory</MenuItem>
      </Menu>
    </nav>
  );
}

export default AdminNavbar;
