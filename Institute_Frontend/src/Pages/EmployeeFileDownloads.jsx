import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import EmployeeNavbar from './EmployeeNavbar';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  CircularProgress,
  Box,
  Grid,
  Typography,
  Container,
} from '@mui/material';

function EmployeeJobDownloads() {
  const registerNumber = useSelector((state) => state.user.registerNumber);
  const [assessmentData, setAssessmentData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAssessmentData, setFilteredAssessmentData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (registerNumber) {
      setLoading(true);
      // Updated URL to fetch assessments by student registration number
      fetch(`http://localhost:6900/api/student/assessment/by-student?studentRegistrationNumber=${registerNumber}`)
        .then(response => response.json())
        .then(data => {
          setAssessmentData(data);
          setFilteredAssessmentData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching assessment data:', error);
          setLoading(false);
        });
    }
  }, [registerNumber]);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filteredData = assessmentData.filter((assessment) =>
      assessment.assessmentName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAssessmentData(filteredData);
  };

  return (
    <div>
       <EmployeeNavbar />
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        {/* Heading Section */}
        <Grid item xs={12}>
          <Typography variant="h4" align="center" color="primary" style={{fontWeight:'bold'}} gutterBottom>
            ASSESSMENT DIRECTORY
          </Typography>
        </Grid>

        {/* Register Number Display */}
        <Grid item xs={12}>
          <Typography variant="h6" align="center" color="textSecondary">
            <strong>Register Number: {registerNumber}</strong>
          </Typography>
        </Grid>

        {/* Search Bar Section */}
        <Grid item xs={12} sm={8} md={6}>
          <TextField
            label="Search by assessment name..."
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            fullWidth
            sx={{
              marginBottom: 2,
            }}
          />
        </Grid>

        {/* Table Section */}
        <Grid item xs={12}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
              <Table>
                <TableHead sx={{ backgroundColor: '#1976d2', color: 'white' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Assessment Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Marks</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Pass Mark</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Department</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Staff Registration Number</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAssessmentData.map((assessment) => (
                    <TableRow
                      key={assessment.id}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#f1f1f1',
                        },
                      }}
                    >
                      <TableCell>{assessment.id}</TableCell>
                      <TableCell>{assessment.assessmentName}</TableCell>
                      <TableCell>{assessment.marks}</TableCell>
                      <TableCell>{assessment.passMark}</TableCell>
                      <TableCell>{assessment.department}</TableCell>
                      <TableCell>{assessment.staffRegistrationNumber}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </Container>
    </div>
  );
}

export default EmployeeJobDownloads;
