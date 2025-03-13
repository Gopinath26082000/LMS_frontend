import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, TextField } from '@mui/material';
import AdminNavbar from './AdminNavbar';

function StaffDirectory() {
  const [staff, setStaff] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch data from the API
  useEffect(() => {
    fetch('http://localhost:6900/api/owner/staff')
      .then((response) => response.json())
      .then((data) => {
        setStaff(data);
      })
      .catch((error) => {
        console.error('Error fetching staff data:', error);
      });
  }, []);

  // Filter staff data based on search query (search by register number or name)
  const filteredStaff = staff.filter((staffMember) =>
    staffMember.registerNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staffMember.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <AdminNavbar />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976D2' }}>
          STAFF DIRECTORY
        </Typography>

        {/* Search Bar */}
        <TextField
          label="Search by Register Number or Name"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ marginBottom: 3 }}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="staff directory">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: '#1976d2', // Blue background color for header
                  '& th': {
                    color: 'white',  // White text for the header
                    fontWeight: 'bold',
                    fontSize: '16px',  // Font size for header
                  },
                }}
              >
                <TableCell>Register Number</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Qualification</TableCell>
                <TableCell>Experience (Years)</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Joining Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStaff.map((staffMember) => (
                <TableRow
                  key={staffMember.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                      transition: 'background-color 0.3s ease',
                    },
                  }}
                >
                  <TableCell>{staffMember.registerNumber}</TableCell>
                  <TableCell>{staffMember.name}</TableCell>
                  <TableCell>{staffMember.email}</TableCell>
                  <TableCell>{staffMember.contactNumber}</TableCell>
                  <TableCell>{staffMember.course}</TableCell> {/* Updated from 'department' to 'course' */}
                  <TableCell>{staffMember.qualification}</TableCell>
                  <TableCell>{staffMember.experience}</TableCell>
                  <TableCell>{staffMember.designation}</TableCell>
                  <TableCell>{staffMember.status}</TableCell>
                  <TableCell>{staffMember.joiningDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default StaffDirectory;
