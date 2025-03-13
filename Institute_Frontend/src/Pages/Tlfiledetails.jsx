import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Tlnavbar from './Tlnavbar'; 
import { Box, Button, TextField, Grid, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { jsPDF } from 'jspdf'; 
import axios from 'axios'; 

function TlJobDetails() {
  // Access the registerNumber from the Redux store
  const registerNumber = useSelector((state) => state.user.registerNumber);

  // Initialize timetable state
  const [timetable, setTimetable] = useState({
    monday: ['', '', '', '', '', ''],
    tuesday: ['', '', '', '', '', ''],
    wednesday: ['', '', '', '', '', ''],
    thursday: ['', '', '', '', '', ''],
    friday: ['', '', '', '', '', ''],
    saturday: ['', '', '', '', '', ''],
  });

  // State to handle modal and form inputs
  const [selectedDay, setSelectedDay] = useState('');  // Selected day (e.g., "monday")
  const [selectedClass, setSelectedClass] = useState(0);  // Class selection (0-5 for class 1-6)
  const [newValue, setNewValue] = useState('');  // New value for the selected class period

  // Fetch timetable data based on registerNumber
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await axios.get(`http://localhost:6900/api/timetable/${registerNumber}`);
        if (response.data) {
          const fetchedTimetable = response.data;
          setTimetable({
            monday: [fetchedTimetable.monday1, fetchedTimetable.monday2, fetchedTimetable.monday3, fetchedTimetable.monday4, fetchedTimetable.monday5, fetchedTimetable.monday6],
            tuesday: [fetchedTimetable.tuesday1, fetchedTimetable.tuesday2, fetchedTimetable.tuesday3, fetchedTimetable.tuesday4, fetchedTimetable.tuesday5, fetchedTimetable.tuesday6],
            wednesday: [fetchedTimetable.wednesday1, fetchedTimetable.wednesday2, fetchedTimetable.wednesday3, fetchedTimetable.wednesday4, fetchedTimetable.wednesday5, fetchedTimetable.wednesday6],
            thursday: [fetchedTimetable.thursday1, fetchedTimetable.thursday2, fetchedTimetable.thursday3, fetchedTimetable.thursday4, fetchedTimetable.thursday5, fetchedTimetable.thursday6],
            friday: [fetchedTimetable.friday1, fetchedTimetable.friday2, fetchedTimetable.friday3, fetchedTimetable.friday4, fetchedTimetable.friday5, fetchedTimetable.friday6],
            saturday: [fetchedTimetable.saturday1, fetchedTimetable.saturday2, fetchedTimetable.saturday3, fetchedTimetable.saturday4, fetchedTimetable.saturday5, fetchedTimetable.saturday6],
          });
        }
      } catch (error) {
        console.error('Error fetching timetable:', error);
      }
    };

    if (registerNumber) {
      fetchTimetable();
    }
  }, [registerNumber]);

  // Handle change in timetable slots
  const handleChange = (day, index, value) => {
    setTimetable((prevTimetable) => ({
      ...prevTimetable,
      [day]: prevTimetable[day].map((item, i) => (i === index ? value : item)),
    }));
  };

  // Handle updating a specific class period (e.g., Monday's first period)
  const handleClassPeriodUpdate = async () => {
    if (!selectedDay || selectedClass < 0 || selectedClass > 5 || !newValue) {
      alert('Please select a valid day, period, and enter a class name.');
      return;
    }

    // Construct the URL dynamically based on selected day and class
    const url = `http://localhost:6900/api/timetable/update/${registerNumber}/${selectedDay}/${selectedClass + 1}`;

    try {
      // Send PUT request to the backend with the new value
      const response = await axios.put(url, {
        value: newValue,  // Send the new class name directly
      });

      console.log('Class period updated successfully:', response.data);
      alert('Class period updated successfully!');
      
      // Update the timetable in the frontend with the new value
      setTimetable((prevTimetable) => ({
        ...prevTimetable,
        [selectedDay]: prevTimetable[selectedDay].map((item, i) =>
          i === selectedClass ? newValue : item
        ),
      }));
    } catch (error) {
      console.error('Error updating class period:', error);
      alert('Failed to update class period. Please try again.');
    }
  };

  const handleSaveTimetable = async () => {
    try {
      // Create the data object to be sent to the backend
      const timetableData = {
        registerNumber: registerNumber, // Include registerNumber
        monday1: timetable.monday[0],
        monday2: timetable.monday[1],
        monday3: timetable.monday[2],
        monday4: timetable.monday[3],
        monday5: timetable.monday[4],
        monday6: timetable.monday[5],
        tuesday1: timetable.tuesday[0],
        tuesday2: timetable.tuesday[1],
        tuesday3: timetable.tuesday[2],
        tuesday4: timetable.tuesday[3],
        tuesday5: timetable.tuesday[4],
        tuesday6: timetable.tuesday[5],
        wednesday1: timetable.wednesday[0],
        wednesday2: timetable.wednesday[1],
        wednesday3: timetable.wednesday[2],
        wednesday4: timetable.wednesday[3],
        wednesday5: timetable.wednesday[4],
        wednesday6: timetable.wednesday[5],
        thursday1: timetable.thursday[0],
        thursday2: timetable.thursday[1],
        thursday3: timetable.thursday[2],
        thursday4: timetable.thursday[3],
        thursday5: timetable.thursday[4],
        thursday6: timetable.thursday[5],
        friday1: timetable.friday[0],
        friday2: timetable.friday[1],
        friday3: timetable.friday[2],
        friday4: timetable.friday[3],
        friday5: timetable.friday[4],
        friday6: timetable.friday[5],
        saturday1: timetable.saturday[0],
        saturday2: timetable.saturday[1],
        saturday3: timetable.saturday[2],
        saturday4: timetable.saturday[3],
        saturday5: timetable.saturday[4],
        saturday6: timetable.saturday[5],
      };
  
      // Send POST request to backend
      const response = await axios.post('http://localhost:6900/api/timetable/store', timetableData);
  
      // Handle successful response
      console.log('Timetable saved successfully:', response.data);
      alert('Timetable saved successfully!');
    } catch (error) {
      console.error('Error saving timetable:', error);
      alert('Failed to save timetable. Please try again.');
    }
  };
  
  

  return (
    <div>
      <Tlnavbar registerNumber={registerNumber} onLogout={() => console.log('Logged out')} /> 

      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976D2' }}>
          Create Your Timetable
        </Typography>

        {/* Form to update timetable */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#1976D2' }}>Update Timetable</Typography>
          
          <FormControl sx={{ marginRight: 2 }}>
            <InputLabel>Day</InputLabel>
            <Select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              label="Day"
            >
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map((day) => (
                <MenuItem key={day} value={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ marginRight: 2 }}>
            <InputLabel>Class</InputLabel>
            <Select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              label="Class"
            >
              {[...Array(6)].map((_, index) => (
                <MenuItem key={index} value={index}>{`Class ${index + 1}`}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="New Value"
            variant="outlined"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            sx={{ marginRight: 2 }}
          />

          <Button variant="contained" onClick={handleClassPeriodUpdate}>Update</Button>
        </Box>

        {/* Timetable Table */}
        <form>
          <Grid container spacing={3} justifyContent="center">
            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map((day, dayIndex) => (
              <Grid item xs={12} sm={6} md={4} key={day}>
                <Paper sx={{ padding: 2 }}>
                  <Typography variant="h6" align="center" sx={{ fontWeight: '600', color: '#8B4A34' }}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </Typography>
                  {Array.from({ length: 6 }, (_, index) => (
                    <TextField
                      key={index}
                      label={`Class ${index + 1}`}
                      variant="outlined"
                      fullWidth
                      value={timetable[day][index]}
                      onChange={(e) => handleChange(day, index, e.target.value)}
                      margin="normal"
                      sx={{
                        backgroundColor: index % 2 === 0 ? '#f1f5f8' : '#f9f9f9',
                        borderRadius: 1,
                      }}
                    />
                  ))}
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Button variant="contained" sx={{ marginTop: 3 }} fullWidth onClick={handleSaveTimetable}>
  Save Timetable
</Button>

        </form>
      </Box>
    </div>
  );
}

export default TlJobDetails;
