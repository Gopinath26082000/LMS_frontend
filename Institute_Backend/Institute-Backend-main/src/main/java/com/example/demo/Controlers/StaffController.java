package com.example.demo.Controlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entites.Staff;
import com.example.demo.Repos.StaffRepo;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/owner")
public class StaffController {

    @Autowired
    private StaffRepo staffRepository;

    // Endpoint for registering a new staff member
    @PostMapping("/register")
    public ResponseEntity<String> registerStaff(@RequestBody Staff staff) {

        // Check if email already exists
        Staff existingUserByEmail = staffRepository.findByEmail(staff.getEmail());
        if (existingUserByEmail != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        // Check if register number already exists
        Staff existingUserByRegisterNumber = staffRepository.findByRegisterNumber(staff.getRegisterNumber());
        if (existingUserByRegisterNumber != null) {
            return ResponseEntity.badRequest().body("Register Number already exists");
        }

        // Save the staff member to the database
        staffRepository.save(staff);

        return ResponseEntity.ok("Registration successful");
    }

    // Endpoint for logging in a staff member
    @PostMapping("/login")
    public ResponseEntity<String> loginStaff(@RequestBody Map<String, String> credentials) {

        String identifier = credentials.get("identifier");  // Can be email or register number
        String password = credentials.get("password");

        // Check if login is using email or register number
        Staff staff = staffRepository.findByEmail(identifier);
        if (staff == null) {
            staff = staffRepository.findByRegisterNumber(identifier);  // Try finding by register number
        }

        if (staff == null || !staff.getPassword().equals(password)) { // No encryption, direct comparison
            return ResponseEntity.badRequest().body("Invalid credentials");
        }

        return ResponseEntity.ok("Login successful");
    }
    
    // Endpoint to fetch all staff details
    @GetMapping("/staff")
    public ResponseEntity<List<Staff>> getAllStaff() {
        List<Staff> staffList = staffRepository.findAll();
        return ResponseEntity.ok(staffList);  // Return the list of staff as a response
    }

    // Endpoint to fetch staff details by register number
    @GetMapping("/staff/{registerNumber}")
    public ResponseEntity<Staff> getStaffByRegisterNumber(@PathVariable String registerNumber) {
        // Find staff by register number
        Staff staff = staffRepository.findByRegisterNumber(registerNumber);

        // Check if staff exists
        if (staff == null) {
            return ResponseEntity.notFound().build();  // Return 404 if staff not found
        }

        return ResponseEntity.ok(staff);  // Return staff details if found
    }
}
