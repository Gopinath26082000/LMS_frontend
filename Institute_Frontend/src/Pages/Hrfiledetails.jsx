import React, { useEffect, useState } from 'react';
import HrNavbar from './HrNavbar';

function Hrfiledetails() {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);  // State for filtered files
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');  // State for search query

  // Fetch files data from backend on component mount
  useEffect(() => {
    fetch('http://localhost:6900/files/all')
      .then((response) => response.json())
      .then((data) => {
        setFiles(data);
        setFilteredFiles(data);  // Set initial filtered files to all files
        setLoading(false); // Data has been fetched, stop loading
      })
      .catch((error) => {
        console.error('Error fetching files:', error);
        setLoading(false);
      });
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    
    // Filter files based on search query
    if (event.target.value === '') {
      setFilteredFiles(files);  // If search is cleared, show all files
    } else {
      const lowercasedQuery = event.target.value.toLowerCase();
      const filtered = files.filter((file) =>
        file.fileName.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredFiles(filtered);  // Update filtered files
    }
  };

  return (
    <div>
        <HrNavbar />
        <br />
        <h1 style={{ textAlign: 'center', color: '#333' }}>FILE DIRECTORY</h1>
        <br/>
        {/* Search Bar */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by file name..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              padding: '15px',
              fontSize: '16px',
              width: '60%',
              maxWidth: '350px',
              borderRadius: '50px',
              border: '1px solid #ddd',
              boxSizing: 'border-box',
            }}
          />
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
                <tr style={{ backgroundColor: '#62DBC8',color:'white' }}>
                  <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>File Name</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Encrypted Key</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file) => (
                  <tr key={file.id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '10px' }}>{file.id}</td>
                    <td style={{ padding: '10px' }}>{file.fileName}</td>
                    <td style={{ padding: '10px' }}>{file.email}</td>
                    <td style={{ padding: '10px' }}>{file.encryptedKeyStore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
}

export default Hrfiledetails;
