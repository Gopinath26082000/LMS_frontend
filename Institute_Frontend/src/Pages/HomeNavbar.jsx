import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './HomeNavbar.css';

function HomeNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll listener to change navbar style when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Navigate to homepage or logout
  const handleLogout = () => {
    navigate('/');
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className={`home-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="home-navbar-content">
        <div className="home-logo" style={{ cursor: 'pointer' }}>
          <h1 className="home-navbar-title">EduIns</h1>
        </div>

        <div className="mobile-menu-button" onClick={toggleSidebar}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>

        <ul className="home-navbar-links desktop">
          <li>
            <a href="/" className={location.pathname === '/' ? 'active' : ''}>
              <b>Home</b>
            </a>
          </li>
          <li>
            <a
              href="/employeelogin"
              className={location.pathname === '/employeelogin' ? 'active' : ''}
            >
              <b>Student Login</b>
            </a>
          </li>
          <li>
            <a
              href="/tllogin"
              className={location.pathname === '/tllogin' ? 'active' : ''}
            >
              <b>Staff Login</b>
            </a>
          </li>
          <li>
            <a
              href="/adminlogin"
              className={location.pathname === '/adminlogin' ? 'active' : ''}
            >
              <b>Admin Login</b>
            </a>
          </li>
          <li>
            <a
              href="#services"
              className={location.pathname === '#services' ? 'active' : ''}
            >
              <b>Our Services</b>
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={location.pathname === '#contact' ? 'active' : ''}
            >
              <b>Contact</b>
            </a>
          </li>
        </ul>
      </div>

      {/* Glass background overlay */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* Off-canvas Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>X</button>
        <ul>
          <li>
            <a href="/" onClick={toggleSidebar}>
              <b>Home</b>
            </a>
          </li>
          <li>
            <a href="/employeelogin" onClick={toggleSidebar}>
              <b>Farmers Login</b>
            </a>
          </li>
          <li>
            <a href="/tllogin" onClick={toggleSidebar}>
              <b>Farm Manager Login</b>
            </a>
          </li>
          <li>
            <a href="/adminlogin" onClick={toggleSidebar}>
              <b>Admin Login</b>
            </a>
          </li>
          <li>
            <a href="#services" onClick={toggleSidebar}>
              <b>Our Services</b>
            </a>
          </li>
          <li>
            <a href="#contact" onClick={toggleSidebar}>
              <b>Contact</b>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default HomeNavbar;
