package com.example.demo.Controlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entites.Assessment;
import com.example.demo.Entites.Attendance;
import com.example.demo.Repos.AssessmentRepository;
import com.example.demo.Repos.AttendanceRepository;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/student")
public class AssessmentAttendenceController {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private AssessmentRepository assessmentRepository;

    // Endpoint to store attendance data
    @PostMapping("/attendance")
    public String saveAttendance(@RequestBody Attendance attendance) {
        attendanceRepository.save(attendance);
        return "Attendance data saved successfully";
    }

    // Endpoint to store assessment data
    @PostMapping("/assessment")
    public String saveAssessment(@RequestBody Assessment assessment) {
        assessmentRepository.save(assessment);
        return "Assessment data saved successfully";
    }

    // Get all attendance records
    @GetMapping("/attendance")
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    // Get all assessment records
    @GetMapping("/assessment")
    public List<Assessment> getAllAssessments() {
        return assessmentRepository.findAll();
    }
    
 // Get attendance records by staff registration number only
    @GetMapping("/attendance/by-staff")
    public List<Attendance> getAttendanceByStaff(
        @RequestParam String staffRegistrationNumber) {
        return attendanceRepository.findByStaffRegistrationNumber(staffRegistrationNumber);
    }

    // Get assessment records by staff registration number only
    @GetMapping("/assessment/by-staff")
    public List<Assessment> getAssessmentByStaff(
        @RequestParam String staffRegistrationNumber) {
        return assessmentRepository.findByStaffRegistrationNumber(staffRegistrationNumber);
    }
    
 // Get attendance records by student registration number
    @GetMapping("/attendance/by-student")
    public List<Attendance> getAttendanceByStudent(
        @RequestParam String studentRegistrationNumber) {
        return attendanceRepository.findByStudentRegistrationNumber(studentRegistrationNumber);
    }

    // Get assessment records by student registration number
    @GetMapping("/assessment/by-student")
    public List<Assessment> getAssessmentByStudent(
        @RequestParam String studentRegistrationNumber) {
        return assessmentRepository.findByStudentRegistrationNumber(studentRegistrationNumber);
    }
}
