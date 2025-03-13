import React, { useState, useEffect } from 'react';
import EmployeeNavbar from './EmployeeNavbar';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import axios from 'axios';

// Helper function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'N/A'; // Return 'N/A' if the date is invalid
  }
  return date.toLocaleString(); // Default formatting
};

function FarmerAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch announcements from the backend
    axios
      .get('http://localhost:6900/api/announcements')
      .then((response) => {
        // Sort the announcements by createdAt (most recent first)
        const sortedAnnouncements = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setAnnouncements(sortedAnnouncements);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching announcements:', error);
        setError('Failed to load announcements');
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <EmployeeNavbar />
      <Container maxWidth="lg" style={{ marginTop: '30px' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#448068', fontWeight: 'bold' }}>
          Student Announcements
        </Typography>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" style={{ marginBottom: '20px' }}>
            {error}
          </Alert>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: '50px' }}>
            <CircularProgress />
          </Box>
        ) : (
          // Table to display announcements
          <TableContainer
            component={Paper}
            style={{
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              backgroundColor: '#f5f5f5',
            }}
          >
            <Table>
              <TableHead style={{ backgroundColor: '#448068' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {announcements.map((announcement) => (
                  <TableRow
                    key={announcement.id}
                    sx={{
                      '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                      '&:hover': { backgroundColor: '#f1f1f1' },
                    }}
                  >
                    <TableCell>{announcement.id}</TableCell>
                    <TableCell>{announcement.title}</TableCell>
                    <TableCell>{announcement.description}</TableCell>
                    <TableCell>{formatDate(announcement.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </div>
  );
}

export default FarmerAnnouncements;
