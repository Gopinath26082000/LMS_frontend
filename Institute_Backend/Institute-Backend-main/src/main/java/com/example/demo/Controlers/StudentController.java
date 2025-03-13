package com.example.demo.Controlers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entites.Student;
import com.example.demo.Repos.StudentRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/register")
    public String registerStudent(@RequestBody Student student) {
        try {
            // Check if the email already exists
            if (studentRepository.findByEmail(student.getEmail()) != null) {
                return "Email is already in use.";
            }
            
            // Check if the registration number already exists
            if (studentRepository.findByRegistrationNumber(student.getRegistrationNumber()) != null) {
                return "Registration number is already in use.";
            }

            // Save the student if email and registration number are unique
            studentRepository.save(student);
            return "Student registered successfully!";
        } catch (Exception e) {
            return "An error occurred while registering the student.";
        }
    }

    // Login endpoint
    @PostMapping("/login")
    public String loginStudent(@RequestBody Student student) {
        try {
            // Check if the student exists based on registration number
            Student existingStudent = studentRepository.findByRegistrationNumber(student.getRegistrationNumber());
            if (existingStudent != null && existingStudent.getPassword().equals(student.getPassword())) {
                return "Login successful!";
            } else {
                return "Invalid registration number or password.";
            }
        } catch (Exception e) {
            return "An error occurred during login.";
        }
    }

    // Get all student details
    @GetMapping("/details")
    public List<Student> getAllStudents() {
        try {
            // Find and return all students
            return studentRepository.findAll();
        } catch (Exception e) {
            return null; // Return null or a custom error message if an error occurs
        }
    }

    // Get students by course (replacing department with course)
    @GetMapping("/course/{course}")
    public List<Student> getStudentsByCourse(@PathVariable String course) {
        try {
            // Find and return students based on the course
            List<Student> students = studentRepository.findByCourse(course);
            if (students.isEmpty()) {
                return null; // or return an empty list if no students are found
            }
            return students;
        } catch (Exception e) {
            return null; // Return null or a custom error message if an error occurs
        }
    }
}
