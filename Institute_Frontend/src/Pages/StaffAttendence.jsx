import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';  // Import useSelector to get data from Redux store
import axios from 'axios';  // Import axios for making HTTP requests
import Tlnavbar from './Tlnavbar';  // Import your navbar component
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button } from '@mui/material';
import * as XLSX from 'xlsx';  // Import the xlsx library for Excel file generation

function StaffAttendence() {
  const registerNumber = useSelector((state) => state.user.registerNumber); // Get register number from Redux store

  const [attendanceData, setAttendanceData] = useState([]); // States to store the fetched attendance data
  const [assessmentData, setAssessmentData] = useState([]); // States to store the fetched assessment data

  useEffect(() => {
    if (registerNumber) {
      axios
        .get(`http://localhost:6900/api/student/attendance/by-staff?staffRegistrationNumber=${registerNumber}`)
        .then((response) => {
          setAttendanceData(response.data);  // Store the fetched attendance data in the state
        })
        .catch((error) => {
          console.error("There was an error fetching the attendance data:", error);
        });
    }
  }, [registerNumber]);

  useEffect(() => {
    if (registerNumber) {
      axios
        .get(`http://localhost:6900/api/student/assessment/by-staff?staffRegistrationNumber=${registerNumber}`)
        .then((response) => {
          setAssessmentData(response.data);  // Store the fetched assessment data in the state
        })
        .catch((error) => {
          console.error("There was an error fetching the assessment data:", error);
        });
    }
  }, [registerNumber]);

  // Function to download attendance data as Excel
  const downloadAttendanceExcel = () => {
    const ws = XLSX.utils.json_to_sheet(attendanceData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
    XLSX.writeFile(wb, 'attendance_data.xlsx');
  };

  // Function to download assessment data as Excel
  const downloadAssessmentExcel = () => {
    const ws = XLSX.utils.json_to_sheet(assessmentData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Assessment');
    XLSX.writeFile(wb, 'assessment_data.xlsx');
  };

  // Function to determine the row color for attendance status
  const getAttendanceRowColor = (status) => {
    if (status === "Present") {
      return { backgroundColor: '#d4edda' };  // Light Green for present
    } else if (status === "Absent") {
      return { backgroundColor: '#f8d7da' };  // Light Red for absent
    }
    return {}; // Default (no special color)
  };

  // Function to determine the row color for assessment marks
  const getAssessmentRowColor = (marks, passMark) => {
    if (marks >= passMark) {
      return {};  // Normal row color if marks are greater than or equal to the pass mark
    }
    return { backgroundColor: '#f8d7da' };  // Light Red if marks are less than pass mark
  };

  return (
    <div>
      {/* Render the navbar */}
      <Tlnavbar />

      <div className="staff-attendance-content" style={{ padding: '20px' }}>
        {/* Styled Heading */}
        <Box display="flex" justifyContent="center" alignItems="center" marginBottom="20px">
          <Typography variant="h4" component="h2" style={{ fontWeight: 'bold', textAlign: 'center' }}>
            Students Attendance & Assessment Directory
          </Typography>
        </Box>

        {/* Display the register number */}
        {registerNumber && (
          <div className="register-number" style={{ marginBottom: '20px' }}>
            <Typography variant="body1" style={{ fontSize: '16px' }}>
              <strong>Register Number:</strong> {registerNumber}
            </Typography>
          </div>
        )}

        {/* Attendance Table */}
        <Box marginBottom="40px" p={2} boxShadow={3} borderRadius={5} bgcolor="#f9f9f9">
          <Typography variant="h5" component="h3" style={{ fontWeight: 'bold', marginBottom: '20px' }}>
            Attendance Data
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={downloadAttendanceExcel}
            style={{ marginTop: '20px', marginBottom: '20px' }}
          >
            Download Attendance Excel
          </Button>
          {attendanceData.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Student ID</TableCell>
                    <TableCell style={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Student Registration No.</TableCell>
                    <TableCell style={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Staff Registration No.</TableCell>
                    <TableCell style={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell style={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                    <TableCell style={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceData.map((attendance) => (
                    <TableRow key={attendance.id} style={getAttendanceRowColor(attendance.status)}>
                      <TableCell>{attendance.studentId}</TableCell>
                      <TableCell>{attendance.studentRegistrationNumber}</TableCell>
                      <TableCell>{attendance.staffRegistrationNumber}</TableCell>
                      <TableCell>{attendance.name}</TableCell>
                      <TableCell>{attendance.date}</TableCell>
                      <TableCell>{attendance.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1">No attendance data available for this staff.</Typography>
          )}
        </Box>

        {/* Assessment Table */}
        <Box p={2} boxShadow={3} borderRadius={5} bgcolor="#f9f9f9">
          <Typography variant="h5" component="h3" style={{ fontWeight: 'bold', marginBottom: '20px' }}>
            Assessment Marks Data
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={downloadAssessmentExcel}
            style={{ marginTop: '20px', marginBottom: '20px' }}
          >
            Download Assessment Excel
          </Button>
          {assessmentData.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Student ID</TableCell>
                    <TableCell style={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Student Registration No.</TableCell>
                    <TableCell style={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Staff Registration No.</TableCell>
                    <TableCell style={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell style={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Assessment Name</TableCell>
                    <TableCell style={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Marks</TableCell>
                    <TableCell style={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Pass Mark</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assessmentData.map((assessment) => (
                    <TableRow key={assessment.id} style={getAssessmentRowColor(assessment.marks, assessment.passMark)}>
                      <TableCell>{assessment.studentId}</TableCell>
                      <TableCell>{assessment.studentRegistrationNumber}</TableCell>
                      <TableCell>{assessment.staffRegistrationNumber}</TableCell>
                      <TableCell>{assessment.name}</TableCell>
                      <TableCell>{assessment.assessmentName}</TableCell>
                      <TableCell>{assessment.marks}</TableCell>
                      <TableCell>{assessment.passMark}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1">No assessment data available for this staff.</Typography>
          )}
        </Box>
      </div>
    </div>
  );
}

export default StaffAttendence;
