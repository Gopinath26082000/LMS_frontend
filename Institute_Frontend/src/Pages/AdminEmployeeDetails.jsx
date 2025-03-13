import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar'; // Import the AdminNavbar component
import { FaSearch } from 'react-icons/fa'; // Import the search icon from react-icons

function AdminEmployeeDetails() {
  const [owners, setOwners] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOwners, setFilteredOwners] = useState([]);
  
  useEffect(() => {
    // Fetch the owner data from the backend
    fetch('http://localhost:6900/api/user/all')
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
      <h1 style={{ textAlign: 'center', color: '#28A745', marginTop: '20px' }}>FARMER'S DIRECTORY</h1>
      <br/>

      {/* Search Bar */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name..."
            style={{
              padding: '10px 20px',
              width: '90%',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px',
              boxSizing: 'border-box',
              borderRadius:'30px',
              transition: 'transform 0.3s ease-in-out',
            }}
          />
          <FaSearch
            style={{
              position: 'absolute',
              left: '82%',
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
      <div style={{ overflowX: 'auto', padding: '20px' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            animation: 'fadeIn 1s ease', // Animation for table fade-in
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#28A745',color:'white' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Password</th>
            </tr>
          </thead>
          <tbody>
            {filteredOwners.map((owner) => (
              <tr
                key={owner.id}
                style={{
                  borderBottom: '1px solid #ddd',
                  transition: 'transform 0.3s ease-in-out',
                }}
              >
                <td style={{ padding: '10px' }}>{owner.id}</td>
                <td style={{ padding: '10px' }}>{owner.name}</td>
                <td style={{ padding: '10px' }}>{owner.email}</td>
                <td style={{ padding: '10px' }}>{owner.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminEmployeeDetails;
