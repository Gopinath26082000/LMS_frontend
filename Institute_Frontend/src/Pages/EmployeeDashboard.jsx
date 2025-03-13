import React, { useEffect, useState } from 'react';
import EmployeeNavbar from './EmployeeNavbar';
import { useSelector } from 'react-redux';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  TextField, Paper, Button, CircularProgress 
} from '@mui/material';

function EmployeeDashboard() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [downloading, setDownloading] = useState(false);
  const registerNumber = useSelector((state) => state.user.registerNumber);

  useEffect(() => {
    const fetchAttendanceDetails = async () => {
      try {
        const response = await fetch(`http://localhost:6900/api/student/attendance/by-student?studentRegistrationNumber=${registerNumber}`);
        const result = await response.json();
        setAttendance(result);
        setFilteredAttendance(result);
      } catch (error) {
        console.error('Error fetching attendance details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (registerNumber) {
      fetchAttendanceDetails();
    }
  }, [registerNumber]);

  const handleSearch = () => {
    if (searchQuery === '') {
      setFilteredAttendance(attendance);
    } else {
      const filteredData = attendance.filter(item =>
        item.date.includes(searchQuery) || item.staffRegistrationNumber.includes(searchQuery)
      );
      setFilteredAttendance(filteredData);
    }
  };

  const downloadCertificate = async () => {
    setDownloading(true);
    try {
      const response = await fetch(`http://localhost:6900/api/certificates/download/${registerNumber}`);

      if (!response.ok) {
        throw new Error('Certificate not found');
      }

      // Convert response to a Blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create a download link and trigger it
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${registerNumber}_certificate.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading certificate:', error);
      alert('Certificate not found or an error occurred.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div>
      <EmployeeNavbar />
      <br />
      <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '28px' }}>ATTENDENCE TRACKING</h2>

      {/* Display Register Number */}
      <div style={{ textAlign: 'center', fontSize: '18px', marginBottom: '20px' }}>
        <strong>Register Number: </strong>{registerNumber}
      </div>

      {/* Download Certificate Button */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Button
          onClick={downloadCertificate}
          variant="contained"
          color="secondary"
          disabled={downloading}
          style={{
            padding: '12px 24px',
            borderRadius: '5px',
            fontSize: '16px',
            marginBottom: '20px'
          }}
        >
          {downloading ? 'Downloading...' : 'Download Certificate'}
        </Button>
      </div>

      {/* Search Bar */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <TextField
          label="Search by Date or Staff Registration Number"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '350px', marginRight: '10px' }}
        />
        <Button
          onClick={handleSearch}
          variant="contained"
          color="primary"
          style={{
            padding: '12px 24px',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        >
          Search
        </Button>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
          <CircularProgress size={50} />
        </div>
      ) : (
        <TableContainer component={Paper} sx={{ maxWidth: '80%', margin: '0 auto' }}>
          <Table>
            <TableHead style={{ backgroundColor: '#1976d2' }}>
              <TableRow>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Department</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell style={{ color: 'white', fontWeight: 'bold' }}>Staff Registration Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAttendance.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.name}</TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.status}</TableCell>
                  <TableCell>{record.staffRegistrationNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default EmployeeDashboard;
