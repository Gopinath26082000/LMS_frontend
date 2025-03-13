import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import HrNavbar from './HrNavbar';

function Hrfilerequest() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]); // New state for filtered requests
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  // Fetch file requests data on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:6900/api/requests');
        const data = await response.json();
        setRequests(data);
        setFilteredRequests(data); // Initially set filtered files to all files
      } catch (error) {
        console.error('Error fetching requests:', error);
        toast.error('Error fetching requests!');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRequests();
  }, []);

  // Function to update the request status
  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:6900/api/requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(status),
      });

      if (response.ok) {
        const updatedRequest = await response.json();
        setRequests(requests.map((request) =>
          request.id === updatedRequest.id ? updatedRequest : request
        ));
        toast.success(`${status} request successfully!`);
      } else {
        toast.error('Failed to update request status!');
      }
    } catch (error) {
      console.error('Error updating request status:', error);
      toast.error('Error updating request status!');
    }
  };

  // Handle search input change
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = requests.filter((request) =>
      request.fileName.toLowerCase().includes(query.toLowerCase()) ||
      request.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRequests(filtered);
  };

  // Inline CSS for Professional Design
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const thTdStyle = {
    padding: '12px 20px',
    border: '1px solid #ddd',
    textAlign: 'left',
    fontSize: '16px',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
  };

  const thStyle = {
    backgroundColor: '#39A4D7',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    cursor:'pointer'
  };

  const trStyle = {
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer',
  };

  const trHoverStyle = {
    backgroundColor: '#f9f9f9',
    transform: 'scale(1.02)',
  };

  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  };

  const acceptButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745',
    color: 'white',
  };

  const rejectButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    color: 'white',
  };

  const actionButtonContainerStyle = {
    display: 'flex',
    gap: '10px',
  };

  return (
    <div>
      <HrNavbar />
      <div style={containerStyle}>
        <h2 style={{ textAlign: 'center', fontSize: '28px', color: '#333', marginBottom: '20px' }}>
          FILE REQUEST LIST
        </h2>

        {/* Search Bar */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by file name or email..."
            style={{
              padding: '10px',
              width: '30%',
              fontSize: '16px',
              borderRadius: '60px',
              border: '1px solid #ddd',
              marginTop: '10px',
              transition: 'border 0.3s ease',
            }}
          />
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', fontSize: '18px', color: '#888' }}>Loading data...</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={thStyle}>
                  <th style={{color:'whitesmoke',padding:'12.5px'}}>ID</th>
                  <th style={{color:'whitesmoke'}}>File Name</th>
                  <th style={{color:'whitesmoke'}}>Email</th>
                  <th style={{color:'whitesmoke'}}>Status</th>
                  <th style={{color:'whitesmoke'}}>Action</th> {/* Action column */}
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr
                    key={request.id}
                    style={trStyle}
                    onMouseOver={(e) => e.currentTarget.style = { ...trHoverStyle }}
                    onMouseOut={(e) => e.currentTarget.style = { ...trStyle }}
                  >
                    <td style={thTdStyle}>{request.id}</td>
                    <td style={thTdStyle}>{request.fileName}</td>
                    <td style={thTdStyle}>{request.email}</td>
                    <td style={thTdStyle}>{request.status}</td>
                    <td style={thTdStyle}>
                      <div style={actionButtonContainerStyle}>
                        <button
                          style={acceptButtonStyle}
                          onClick={() => handleStatusUpdate(request.id, 'Accepted')}
                        >
                          Accept
                        </button>
                        <button
                          style={rejectButtonStyle}
                          onClick={() => handleStatusUpdate(request.id, 'Rejected')}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hrfilerequest;
