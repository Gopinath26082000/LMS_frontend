import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar'; // Import the AdminNavbar component

function AdminJobDetails() {
  const [jobDetails, setJobDetails] = useState([]); // Store job details
  const [filteredJobs, setFilteredJobs] = useState([]); // Filtered job details
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  // Fetch job details from backend when component mounts
  useEffect(() => {
    fetch('http://localhost:6900/api/job-details')
      .then((response) => response.json())
      .then((data) => {
        setJobDetails(data); // Set job data to state
        setFilteredJobs(data); // Initially set filtered jobs to all jobs
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching job details:', error);
        setLoading(false);
      });
  }, []);

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    
    // Filter jobs based on search query
    if (event.target.value === '') {
      setFilteredJobs(jobDetails);  // If search is cleared, show all jobs
    } else {
      const lowercasedQuery = event.target.value.toLowerCase();
      const filtered = jobDetails.filter((job) =>
        job.workName.toLowerCase().includes(lowercasedQuery) || // Search by work name
        job.email.toLowerCase().includes(lowercasedQuery) // Search by email
      );
      setFilteredJobs(filtered); // Update filtered jobs
    }
  };

  return (
    <div>
      <AdminNavbar /> {/* Admin navbar component */}
      <br />
      <h1 style={{ textAlign: 'center', color: '#28A745' }}>FARMING JOB DETAILS</h1>
      <br />

      {/* Enhanced Search Bar */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div
          style={{
            position: 'relative',
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          <input
            type="text"
            placeholder="Search by work name or email..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              padding: '12px 40px 12px 20px', // Added padding for better look
              fontSize: '16px',
              width: '100%',
              borderRadius: '25px',
              border: '1px solid #ddd',
              boxSizing: 'border-box',
              transition: 'border-color 0.3s ease',
            }}
            // Change border color on focus
            onFocus={(e) => e.target.style.borderColor = '#28A745'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
          {/* Search Icon */}
          <span
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              fontSize: '18px',
              color: '#28A745',
            }}
          >
            🔍
          </span>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p> // Show loading indicator while fetching data
      ) : (
        <div style={{ overflowX: 'auto', padding: '20px' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              animation: 'fadeIn 1s ease',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#28A745', color: 'white' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Work Name</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Job Description</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Location</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Hours Worked</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Amount</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px' }}>{job.id}</td>
                  <td style={{ padding: '10px' }}>{job.email}</td>
                  <td style={{ padding: '10px' }}>{job.workName}</td>
                  <td style={{ padding: '10px' }}>{job.jobDescription}</td>
                  <td style={{ padding: '10px' }}>{job.location}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{job.hoursWorked}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>₹{job.amount}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{job.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminJobDetails;
