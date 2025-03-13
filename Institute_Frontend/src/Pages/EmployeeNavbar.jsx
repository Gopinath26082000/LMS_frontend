import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaHome, FaSuitcase, FaBullhorn, FaExclamationTriangle, FaPowerOff } from 'react-icons/fa';
import { logout } from './userSlice';  // Import logout action from userSlice.js
import './EmployeeNavbar.css';

function EmployeeNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const registerNumber = useSelector((state) => state.user.registerNumber);

  // Set active tab based on current route
  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

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

  const handleLogout = () => {
    sessionStorage.removeItem('registerNumber');
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className={`employee-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="employee-navbar-content">
        {/* Logo Section */}
        <div className="employee-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <h1 className="employee-navbar-title">EduIns</h1>
        </div>

        {/* Navigation Links */}
        <ul className="employee-navbar-links">
          <li className={activeTab === '/employeedashboard' ? 'active' : ''}>
            <a href="/employeedashboard">
              <FaHome style={{ marginRight: '8px' }} />
              <b>Dashboard</b>
            </a>
          </li>
          <li className={activeTab === '/employeefiledownloads' ? 'active' : ''}>
            <a href="/employeefiledownloads">
              <FaSuitcase style={{ marginRight: '8px' }} />
              <b>Assessment Directory</b>
            </a>
          </li>
          <li className={activeTab === '/farmercomplaints' ? 'active' : ''}>
            <a href="#" onClick={() => navigate('/farmercomplaints')}>
              <FaExclamationTriangle style={{ marginRight: '8px' }} />
              <b>Complaints</b>
            </a>
          </li>
          <li className={activeTab === '/farmerannouncement' ? 'active' : ''}>
            <a href="/farmerannouncement">
              <FaBullhorn style={{ marginRight: '8px' }} />
              <b>Announcements</b>
            </a>
          </li>
        </ul>

        {/* Register Number Section */}
        <div className="navbar-registerNumber">
          <span className="register-number-label">Register Number: </span>
          <span className="register-number-value">
            {registerNumber ? registerNumber : 'Not Available'}
          </span>
        </div>

        {/* Logout Link */}
        <div className="navbar-logout">
          <a href="#" onClick={handleLogout}>
            <FaPowerOff style={{ marginRight: '8px' }} />
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
}

export default EmployeeNavbar;
