import React, { useEffect, useState } from 'react';
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
  Alert,
  Box
} from '@mui/material';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux store
import EmployeeNavbar from './EmployeeNavbar';
import axios from 'axios';

function FarmerComplaints() {
  const registerNumber = useSelector((state) => state.user.registerNumber);  // Access registerNumber from Redux store
  const [description, setDescription] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Fetch complaints based on registerNumber
  useEffect(() => {
    if (registerNumber) {
      // Change the endpoint to use registerNumber instead of email
      axios
        .get(`http://localhost:6900/api/complaints/registerNumber/${registerNumber}`)
        .then((response) => {
          setComplaints(response.data);
        })
        .catch((error) => {
          console.error('Error fetching complaints:', error);
        });
    }
  }, [registerNumber]);

  // Handle complaint submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const complaintData = {
      registerNumber: registerNumber,  // Use registerNumber instead of email
      description: description,
    };

    try {
      // Send the complaint with registerNumber to the backend
      const response = await axios.post('http://localhost:6900/api/complaints', complaintData);
      setMessage('Complaint successfully submitted');
      setLoading(false);
      setOpenSnackbar(true);
      setDescription(''); // Clear description after submission
      // Re-fetch complaints after submission to include the new one
      axios
        .get(`http://localhost:6900/api/complaints/registerNumber/${registerNumber}`)
        .then((response) => {
          setComplaints(response.data);
        })
        .catch((error) => {
          console.error('Error fetching complaints:', error);
        });
    } catch (error) {
      console.error('Error submitting complaint:', error);
      setMessage('There was an error submitting your complaint.');
      setLoading(false);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <EmployeeNavbar />
      <Container maxWidth="md" style={{ marginTop: '30px' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#448068', fontWeight: 'bold', textAlign: 'center' }}>
          STUDENT COMPLAINTS
        </Typography>

        {/* Complaint submission form */}
        <Box sx={{ boxShadow: 3, borderRadius: 2, padding: 2, backgroundColor: '#f7f7f7' }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Register Number"
              value={registerNumber || ''}
              disabled
              fullWidth
              margin="normal"
              variant="outlined"
              style={{ backgroundColor: '#fff' }}
            />

            <TextField
              label="Complaint Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
              style={{ backgroundColor: '#fff' }}
            />

            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              style={{ marginTop: '20px' }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="white" /> : 'Submit Complaint'}
            </Button>
          </form>
        </Box>

        {/* Snackbar (Notification) */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={loading ? 'info' : 'success'}>
            {message}
          </Alert>
        </Snackbar>

        {/* Table to display complaints */}
        {complaints.length > 0 && (
          <TableContainer
            component={Paper}
            style={{
              marginTop: '30px',
              borderRadius: '12px', // Border radius for the table container
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adding subtle shadow for elegance
            }}
          >
            <Table sx={{ borderRadius: '12px' }}>
              <TableHead sx={{ backgroundColor: '#448068' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Complaint ID</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Reply</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {complaints.map((complaint) => (
                  <TableRow
                    key={complaint.id}
                    sx={{
                      '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                      '&:hover': { backgroundColor: '#f1f1f1' }, // Hover effect
                    }}
                  >
                    <TableCell>{complaint.id}</TableCell>
                    <TableCell>{complaint.description}</TableCell>
                    <TableCell>{complaint.reply || 'No reply yet'}</TableCell>
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

export default FarmerComplaints;
