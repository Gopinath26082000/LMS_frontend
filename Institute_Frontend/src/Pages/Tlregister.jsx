import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container, Box, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import AdminNavbar from './AdminNavbar';

function TlRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [dob, setDob] = useState('');
  const [course, setCourse] = useState('');  // Changed 'department' to 'course'
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [gender, setGender] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [designation, setDesignation] = useState('');
  const [status, setStatus] = useState('');

  // State for Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
      contactNumber,
      dob,
      course,  // Updated to 'course'
      address,
      role,
      registerNumber,
      gender,
      joiningDate,
      qualification,
      experience,
      designation,
      status,
    };

    try {
      const response = await fetch('http://localhost:6900/api/owner/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Show success message in Snackbar
        setSnackbarMessage('Staff credentials created successfully!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      } else {
        const errorMessage = await response.text();
        setSnackbarMessage(errorMessage);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage('An error occurred while registering.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <Container component="main" maxWidth="sm" sx={{ padding: '20px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" color="primary" gutterBottom style={{ fontWeight: 'bold' }}>
            STAFF REGISTER
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Grid container spacing={2}>
              {/* Register Number and Name Fields */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Register Number"
                  variant="outlined"
                  value={registerNumber}
                  onChange={(e) => setRegisterNumber(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Grid>

              {/* Email and Password Fields */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Grid>

              {/* Contact Number and Date of Birth Fields */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  variant="outlined"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  variant="outlined"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {/* Gender and Joining Date Fields */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    label="Gender"
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Joining Date"
                  variant="outlined"
                  type="date"
                  value={joiningDate}
                  onChange={(e) => setJoiningDate(e.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {/* Course and Qualification Fields */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Course"  // Changed 'Department' to 'Course'
                  variant="outlined"
                  value={course}  // Updated to 'course'
                  onChange={(e) => setCourse(e.target.value)}  // Updated to 'course'
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Qualification"
                  variant="outlined"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  required
                />
              </Grid>

              {/* Experience and Designation Fields */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Experience (in years)"
                  variant="outlined"
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Designation"
                  variant="outlined"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  required
                />
              </Grid>

              {/* Address and Status Fields */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address"
                  variant="outlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label="Status"
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ marginTop: '20px' }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ padding: '10px', fontSize: '1rem', fontWeight: '600' }}
              >
                REGISTER
              </Button>
            </Box>
          </form>
        </Box>
      </Container>

      {/* Snackbar for showing success/error message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position Snackbar at the top-right
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default TlRegister;
