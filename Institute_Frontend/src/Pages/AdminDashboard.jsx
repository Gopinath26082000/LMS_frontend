import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar'; // Import the AdminNavbar component
import { FaSearch } from 'react-icons/fa'; // Import the search icon from react-icons

function AdminDashboard() {
  const [owners, setOwners] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOwners, setFilteredOwners] = useState([]);

  useEffect(() => {
    // Fetch the owner data from the backend
    fetch('http://localhost:6900/api/owner/all')
      .then(response => response.json())
      .then(data => {
        setOwners(data);
        setFilteredOwners(data); // Initialize filtered owners with all owners initially
      })
      .catch(error => console.error('Error fetching owner data:', error));
  }, []);

  // Handle the search functionality
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase(); // Convert to lowercase for case-insensitive search
    setSearchQuery(query);

    if (query === '') {
      setFilteredOwners(owners); // Show all owners if search is empty
    } else {
      const filtered = owners.filter((owner) =>
        owner.name.toLowerCase().includes(query) // Filter owners by name
      );
      setFilteredOwners(filtered); // Update filtered owners
    }
  };

  return (
    <div>
      <AdminNavbar />
      <h1 style={{ textAlign: 'center', color: '#28A745', marginTop: '20px', cursor: 'pointer' }}>FARM MANAGER DIRECTORY</h1>
      <br />

      {/* Search Bar */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name..."
            style={{
              padding: '12px 20px',
              width: '90%',
              borderRadius: '25px',
              border: '1px solid #ccc',
              fontSize: '16px',
              boxSizing: 'border-box',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              outline: 'none',
            }}
            onFocus={(e) => e.target.style.boxShadow = '0 0 8px rgba(0, 123, 255, 0.6)'}
            onBlur={(e) => e.target.style.boxShadow = 'none'}
          />
          <FaSearch
            style={{
              position: 'absolute',
              right: '25px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#28A745',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
            }}
          />
        </div>
      </div>

      {/* Table to display owner details */}
      <div style={{ overflowX: 'auto', padding: '20px', borderRadius:'15px' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            animation: 'fadeIn 1s ease', // Animation for table fade-in
           
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#28A745' }}>
              <th style={tableHeaderStyle}>ID</th>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Password</th>
            </tr>
          </thead>
          <tbody>
            {filteredOwners.map((owner) => (
              <tr
                key={owner.id}
                style={tableRowStyle}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <td style={tableCellStyle}>{owner.id}</td>
                <td style={tableCellStyle}>{owner.name}</td>
                <td style={tableCellStyle}>{owner.email}</td>
                <td style={tableCellStyle}>{owner.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Style for table header
const tableHeaderStyle = {
  padding: '12px 15px',
  textAlign: 'left',
  backgroundColor: '#28A745',
  color: '#fff',
  fontWeight: 'bold',
  borderBottom: '2px solid #ddd'
};

// Style for table rows
const tableRowStyle = {
  borderBottom: '1px solid #ddd',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
};

// Style for table cells
const tableCellStyle = {
  padding: '12px 15px',
  textAlign: 'left',
  color: '#333',
  transition: 'background-color 0.3s ease',
};

// Export the component
export default AdminDashboard;
