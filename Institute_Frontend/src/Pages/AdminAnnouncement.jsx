import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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

function AdminAnnouncement() {
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementDescription, setAnnouncementDescription] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Fetch all announcements on component mount
  useEffect(() => {
    axios
      .get('http://localhost:6900/api/announcements')
      .then((response) => {
        setAnnouncements(response.data);
      })
      .catch((error) => {
        console.error('Error fetching announcements:', error);
      });
  }, []);

  // Handle announcement submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const announcementData = {
      title: announcementTitle,
      description: announcementDescription,
    };

    try {
      const response = await axios.post('http://localhost:6900/api/announcements', announcementData);
      setMessage('Announcement successfully submitted');
      setLoading(false);
      setOpenSnackbar(true);
      setAnnouncementTitle(''); // Clear the title input
      setAnnouncementDescription(''); // Clear the description input

      // Re-fetch announcements to include the new one
      axios
        .get('http://localhost:6900/api/announcements')
        .then((response) => {
          setAnnouncements(response.data);
        })
        .catch((error) => {
          console.error('Error fetching announcements:', error);
        });
    } catch (error) {
      console.error('Error submitting announcement:', error);
      setMessage('There was an error submitting your announcement.');
      setLoading(false);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <AdminNavbar />
      <Container maxWidth="sm" style={{ marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#438067', fontWeight: 'bolder' }}>
          Admin Announcement
        </Typography>

        {/* Announcement submission form */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Announcement Title"
            value={announcementTitle}
            onChange={(e) => setAnnouncementTitle(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="Announcement Description"
            value={announcementDescription}
            onChange={(e) => setAnnouncementDescription(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
          />

          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            style={{ marginTop: '20px' }}
          >
            {loading ? <CircularProgress size={24} color="white" /> : 'Submit'}
          </Button>
        </form>

        {/* Snackbar (Notification) */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            {message}
          </Alert>
        </Snackbar>

        {/* Table to display announcements */}
        {announcements.length > 0 && (
          <TableContainer
            component={Paper}
            style={{
              marginTop: '30px',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: '#438067' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Announcement ID</TableCell>
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
                    <TableCell>{formatDate(announcement.createdAt)}</TableCell> {/* Format date here */}
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

export default AdminAnnouncement;
