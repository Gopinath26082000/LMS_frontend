import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Snackbar,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert
} from '@mui/material';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [reply, setReply] = useState('');
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // Fetch complaints from backend
  useEffect(() => {
    axios
      .get('http://localhost:6900/api/complaints')  // Ensure the API is correctly handling registerNumber instead of email
      .then((response) => {
        setComplaints(response.data);
      })
      .catch((error) => {
        console.error('Error fetching complaints:', error);
      });
  }, []);

  // Handle reply submission
  const handleReplySubmit = (complaintId) => {
    setLoading(true);
    const data = { reply: reply };  // send reply in correct format

    axios
      .put(`http://localhost:6900/api/complaints/${complaintId}/reply`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setMessage('Reply successfully added');
        setOpenSnackbar(true);
        setLoading(false);
        // Update complaint's reply in the state
        setComplaints(
          complaints.map((complaint) =>
            complaint.id === complaintId
              ? { ...complaint, reply: response.data.reply }
              : complaint
          )
        );
        setReply('');
        setOpenDialog(false);
        setSelectedComplaintId(null);
      })
      .catch((error) => {
        console.error('Error adding reply:', error);
        setMessage('Error adding reply');
        setOpenSnackbar(true);
        setLoading(false);
      });
  };

  const openReplyDialog = (complaintId) => {
    setSelectedComplaintId(complaintId);
    setOpenDialog(true);
  };

  const closeReplyDialog = () => {
    setOpenDialog(false);
    setReply('');
  };

  return (
    <div>
      <AdminNavbar />
      <br />
      <h1 style={{ textAlign: 'center', color: 'green' }}>Complaints Directory</h1>
      <br />
      <TableContainer component={Paper} sx={{ maxWidth: '80%', margin: 'auto' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#388e3c', cursor: 'pointer' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Register Number</TableCell> {/* Changed Email to Register Number */}
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Reply</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complaints.map((complaint) => (
              <TableRow key={complaint.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                <TableCell>{complaint.id}</TableCell>
                <TableCell>{complaint.registerNumber}</TableCell> {/* Display Register Number */}
                <TableCell>{complaint.description}</TableCell>
                <TableCell>{complaint.reply || 'No reply yet'}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => openReplyDialog(complaint.id)}
                    sx={{ textTransform: 'none' }}
                  >
                    Reply
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Reply Dialog (Popup) */}
      <Dialog open={openDialog} onClose={closeReplyDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#388e3c', color: 'white', textAlign: 'center' }}>
          Reply to Complaint
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Your Reply"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            sx={{ marginTop: 2 }}
            placeholder="Write your reply here..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeReplyDialog} sx={{ textTransform: 'none', borderRadius: '20px', fontWeight: 'bold', color: 'green' }}>
            Cancel
          </Button>
          <Button
            onClick={() => handleReplySubmit(selectedComplaintId)}
            sx={{
              textTransform: 'none',
              borderRadius: '15px',
              fontWeight: 'bold',
              backgroundColor: '#388e3c',
              '&:hover': {
                backgroundColor: '#2c6f3f',
              },
            }}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="white" /> : 'Submit Reply'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar (Notification) */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AdminComplaints;
