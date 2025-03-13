import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Use useSelector to get state
import { logout } from './userSlice';
import './AdminNavbar.css';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Tlnavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openProfileDialog, setOpenProfileDialog] = useState(false); 
  const [staffDetails, setStaffDetails] = useState(null);
  const [assessmentDropdown, setAssessmentDropdown] = useState(false);
  const [assignmentDropdown, setAssignmentDropdown] = useState(false); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerNumber = useSelector((state) => state.user.registerNumber); // Get registerNumber from Redux

  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchStaffDetails = async () => {
    try {
      const response = await fetch(`http://localhost:6900/api/owner/staff/${registerNumber}`);
      const data = await response.json();
      setStaffDetails(data);
    } catch (error) {
      console.error('Error fetching staff details:', error);
    }
  };

  const handleOpenProfileDialog = () => {
    fetchStaffDetails();
    setOpenProfileDialog(true);
  };

  const handleCloseProfileDialog = () => {
    setOpenProfileDialog(false);
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate('/tllogin'); // Redirect to the login page
  };

  return (
    <nav className={`admin-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="admin-navbar-content">
        <div className="admin-logo" onClick={() => navigate('/tlhomepage')}>
          <h1 className="admin-navbar-title">EduIns</h1>
        </div>

        <ul className="admin-navbar-links desktop" style={{cursor:'pointer'}}>
          <li><a href="/tlhomepage"><b>Home Page</b></a></li>
          <li><a onClick={() => navigate('/tlfiledetails')}><b>Time Table Directory</b></a></li>

          <li
            onMouseEnter={() => setAssessmentDropdown(true)}
            onMouseLeave={() => setAssessmentDropdown(false)}
          >
            <b>Attendance/Assignment</b>
            {assessmentDropdown && (
              <ul className="dropdown-menu">
                <li onClick={() => navigate('/farmersapplied')}>Give Attendance/Assessment marks</li>
                <li onClick={() => navigate('/staffattendence')}>View Attendance/Assessment marks</li>
              </ul>
            )}
          </li>

          <li><a href='/farmermanagerannouncements'><b>News</b></a></li>
        </ul>

        {registerNumber && (
          <div className="registerNumber-display">
            <p>Register Number: {registerNumber}</p>
            <button className="profile-btn" onClick={handleOpenProfileDialog}>
              <AccountCircleIcon className="profile-icon" />
            </button>
          </div>
        )}

        <ul className="admin-navbar-links desktop">
          <li>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </li>
        </ul>

        <button className="mobile-menu-button" onClick={() => setSidebarOpen(true)}>
          Menu
        </button>
      </div>

      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          Close
        </button>
        <ul>
          <li><a href="/tlhomepage">Home Page</a></li>
          <li><a href="/tlfiledetails">Job Details</a></li>
          <li><a href="/farmersapplied">Farmer's Applied Jobs</a></li>
          <li><a href="/farmermanagerannouncements">News</a></li>
        </ul>
      </div>

      <Dialog open={openProfileDialog} onClose={handleCloseProfileDialog}>
        <DialogTitle>Staff Profile</DialogTitle>
        <DialogContent>
          {staffDetails ? (
            <>
              <p><strong>Name:</strong> {staffDetails.name}</p>
              <p><strong>Email:</strong> {staffDetails.email}</p>
              <p><strong>Course:</strong> {staffDetails.course}</p>
            </>
          ) : (
            <p>Loading profile...</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfileDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </nav>
  );
}

export default Tlnavbar;
