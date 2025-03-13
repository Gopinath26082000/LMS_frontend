import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tlnavbar from './Tlnavbar';
import { logout } from './userSlice';
import axios from 'axios';
import { Box, Typography, Paper, TextField, Button, Pagination, Modal, FormControl, InputLabel, Select, MenuItem } from '@mui/material'; 
import { FixedSizeList as List } from 'react-window';
import * as XLSX from 'xlsx';

function FarmersAppliedJobManager() {
  const registerNumber = useSelector((state) => state.user.registerNumber);
  const dispatch = useDispatch();
  const [staffData, setStaffData] = useState(null);
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [studentsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [category, setCategory] = useState('');
  const [attendanceDate, setAttendanceDate] = useState('');
  const [status, setStatus] = useState('');
  const [assessmentName, setAssessmentName] = useState('');
  const [marks, setMarks] = useState('');
  const [passMark, setPassMark] = useState('');

  useEffect(() => {
    if (!registerNumber) {
      window.location.href = '/tlLogin';
    } else {
      axios.get(`http://localhost:6900/api/owner/staff/${registerNumber}`)
        .then((response) => {
          setStaffData(response.data); 
        })
        .catch((error) => {
          console.error('Error fetching staff data:', error);
        });
    }
  }, [registerNumber]);

  useEffect(() => {
    if (staffData) {
      axios.get(`http://localhost:6900/api/student/course/${staffData.course}`)
        .then((response) => {
          setStudents(response.data); 
        })
        .catch((error) => {
          console.error('Error fetching student data:', error);
        });
    }
  }, [staffData]);

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

  const currentStudents = filteredStudents.slice((page - 1) * studentsPerPage, page * studentsPerPage);

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredStudents);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");
    XLSX.writeFile(wb, "students.xlsx");
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const Row = ({ index, style }) => {
    const student = currentStudents[index];

    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 2fr 1fr 1fr 1fr 1fr 1fr', 
          padding: '12px',
          borderBottom: '1px solid #ddd',
          backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e8f5e9',
          '@media (max-width:600px)': {
            gridTemplateColumns: '1fr 1fr 1fr', 
            padding: '8px',
          }
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
        
        <Button
          variant="contained"
          onClick={() => { setSelectedStudent(student); setOpenModal(true); }}
          sx={{
            backgroundColor: '#388E3C', 
            color: 'white',
            padding: '10px 20px',
          }}
        >
          Action
        </Button>
      </Box>
    );
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setCategory('');
    setAttendanceDate('');
    setStatus('');
    setAssessmentName('');
    setMarks('');
    setPassMark('');
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

 // Handle attendance submission
const handleAttendanceSubmit = () => {
  const attendanceData = {
    studentId: selectedStudent.id,
    studentRegistrationNumber: selectedStudent.registrationNumber,  // Student registration number
    staffRegistrationNumber: staffData.registerNumber,  // Staff registration number
    name: selectedStudent.name,
    course: selectedStudent.course,
    date: attendanceDate,
    status: status,
  };

  axios.post('http://localhost:6900/api/student/attendance', attendanceData)
    .then((response) => {
      console.log('Attendance submitted successfully:', response.data);
      handleModalClose();
    })
    .catch((error) => {
      console.error('Error submitting attendance data:', error);
    });
};

// Handle assessment submission
const handleAssessmentSubmit = () => {
  const assessmentData = {
    studentId: selectedStudent.id,
    studentRegistrationNumber: selectedStudent.registrationNumber,  // Student registration number
    staffRegistrationNumber: staffData.registerNumber,  // Staff registration number
    name: selectedStudent.name,
    course: selectedStudent.course,
    assessmentName: assessmentName,
    marks: marks,
    passMark: passMark,
  };

  axios.post('http://localhost:6900/api/student/assessment', assessmentData)
    .then((response) => {
      console.log('Assessment submitted successfully:', response.data);
      handleModalClose();
    })
    .catch((error) => {
      console.error('Error submitting assessment data:', error);
    });
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

        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <TextField
            label="Search by Registration Number or Name"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            sx={{ maxWidth: '600px' }}
          />
          <Button onClick={downloadExcel} sx={{ marginLeft: '20px', backgroundColor: '#388E3C', color: 'white' }}>
            Excel Download
          </Button>
        </Box>

        <Paper sx={{ maxHeight: 500, overflow: 'hidden', borderRadius: '8px' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 1fr 1fr 1fr 1fr 1fr', backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold', padding: '12px' }}>
            <Typography>Registration Number</Typography>
            <Typography>Name</Typography>
            <Typography>Email</Typography>
            <Typography>Contact Number</Typography>
            <Typography>Course</Typography>
            <Typography>Status</Typography>
            <Typography>Joining Date</Typography>
            <Typography>Action</Typography>
          </Box>

          <List height={400} itemCount={currentStudents.length} itemSize={50} width="100%">
            {Row}
          </List>
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Pagination count={Math.ceil(filteredStudents.length / studentsPerPage)} page={page} onChange={handlePageChange} color="primary" />
        </Box>
      </Box>

      <Modal open={openModal} onClose={handleModalClose}>
        <Box sx={{ padding: '20px', backgroundColor: 'white', width: '400px', marginLeft:'45%', top: '50%', transform: 'translateY(-50%)', position: 'absolute' }}>
          <Typography variant="h6">Action for {selectedStudent?.name}</Typography>

          <FormControl fullWidth sx={{ marginTop: '16px' }}>
            <InputLabel>Category</InputLabel>
            <Select value={category} onChange={handleCategoryChange}>
              <MenuItem value="attendance">Attendance</MenuItem>
              <MenuItem value="assessment">Assessment</MenuItem>
            </Select>
          </FormControl>

          {category === 'attendance' && (
            <>
              <TextField
                label="Date"
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                sx={{ marginTop: '16px' }}
                InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth sx={{ marginTop: '16px' }}>
                <InputLabel>Status</InputLabel>
                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <MenuItem value="present">Present</MenuItem>
                  <MenuItem value="absent">Absent</MenuItem>
                </Select>
              </FormControl>
            </>
          )}

          {category === 'assessment' && (
            <>
              <TextField label="Assessment Name" value={assessmentName} onChange={(e) => setAssessmentName(e.target.value)} fullWidth sx={{ marginTop: '16px' }} />
              <TextField label="Marks" type="number" value={marks} onChange={(e) => setMarks(e.target.value)} fullWidth sx={{ marginTop: '16px' }} />
              <TextField label="Pass Mark" type="number" value={passMark} onChange={(e) => setPassMark(e.target.value)} fullWidth sx={{ marginTop: '16px' }} />
            </>
          )}

          <Button onClick={category === 'attendance' ? handleAttendanceSubmit : handleAssessmentSubmit} variant="contained" color="primary" sx={{ marginTop: '16px', width: '100%' }}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default FarmersAppliedJobManager;
