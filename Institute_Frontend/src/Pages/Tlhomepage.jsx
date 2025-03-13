import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tlnavbar from './Tlnavbar';
import { logout } from './userSlice';
import axios from 'axios';
import { Box, Typography, Paper, TextField, Button } from '@mui/material'; 
import { FixedSizeList as List } from 'react-window';
import * as XLSX from 'xlsx';

function TLHomepage() {
  const registerNumber = useSelector((state) => state.user.registerNumber);
  const dispatch = useDispatch();
  const [staffData, setStaffData] = useState(null);
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!registerNumber) {
      window.location.href = '/tlLogin';
    } else {
      // Fetch staff data first
      axios.get(`http://localhost:6900/api/owner/staff/${registerNumber}`)
        .then((response) => {
          setStaffData(response.data); // Store staff data
        })
        .catch((error) => {
          console.error('Error fetching staff data:', error);
        });
    }
  }, [registerNumber]);

  useEffect(() => {
    // Fetch students based on department when staff data is available
    if (staffData) {
      axios.get(`http://localhost:6900/api/student/course/${staffData.course}`)
        .then((response) => {
          setStudents(response.data); // Set students data for the respective department
        })
        .catch((error) => {
          console.error('Error fetching student data:', error);
        });
    }
  }, [staffData]); // Re-run this effect when staffData is updated

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/tlLogin';
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredStudents = students.filter((student) =>
    (student.registrationNumber && student.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (student.name && student.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredStudents);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "students.xlsx");
  };

  const Row = ({ index, style }) => {
    const student = filteredStudents[index];

    const getLightBackgroundColor = (index) => {
      const colors = [
        '#f9f9f9', '#e8f5e9', '#f3e5f5', '#ffebee', '#e1f5fe',
        '#fff3e0', '#e8eaf6', '#f1f8e9', '#f5f5f5', '#fce4ec'
      ];
      return colors[index % colors.length];
    };

    return (
      <Box 
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 2fr 1fr 1fr 1fr 1fr',
          padding: '12px',
          borderBottom: '1px solid #ddd',
          backgroundColor: getLightBackgroundColor(index),
        }} 
        style={style} 
        key={student.id}
      >
        <Typography>{student.registrationNumber}</Typography>
        <Typography>{student.name}</Typography>
        <Typography>{student.email}</Typography>
        <Typography>{student.contactNumber}</Typography>
        <Typography>{student.course}</Typography>
        <Typography>{student.status}</Typography>
        <Typography>{student.joiningDate}</Typography>
      </Box>
    );
  };

  return (
    <div>
      <Tlnavbar registerNumber={registerNumber} onLogout={handleLogout} />

      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976D2' }}>
          Welcome, Staff Member!
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
          Course: {staffData ? staffData.course : 'Loading...'}
        </Typography>

        {/* Search Bar with Download Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', alignItems: 'center' }}>
          <TextField
            label="Search by Registration Number or Name"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearch}
            sx={{ maxWidth: '600px' }}
          />
          
          <Button 
            onClick={downloadExcel} 
            sx={{ marginLeft: '20px', backgroundColor: '#388E3C', color: 'white', padding: '10px 20px', fontWeight: 'bold' }}
          >
            Excel Download
          </Button>
        </Box>

        {/* Table Container */}
        <Paper sx={{ maxHeight: 500, overflow: 'hidden', borderRadius: '8px', boxShadow: 3 }}>
          {/* Header Row */}
          <Box 
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 2fr 1fr 1fr 1fr 1fr',
              backgroundColor: '#1976d2',
              color: 'white',
              fontWeight: 'bold',
              padding: '12px',
              fontSize: '16px'
            }}
          >
            <Typography>Registration Number</Typography>
            <Typography>Name</Typography>
            <Typography>Email</Typography>
            <Typography>Contact Number</Typography>
            <Typography>Course</Typography>
            <Typography>Status</Typography>
            <Typography>Joining Date</Typography>
          </Box>

          {/* Virtualized List */}
          <List
            height={400}
            itemCount={filteredStudents.length}
            itemSize={50}
            width="100%"
          >
            {Row}
          </List>
        </Paper>
      </Box>
    </div>
  );
}

export default TLHomepage;
