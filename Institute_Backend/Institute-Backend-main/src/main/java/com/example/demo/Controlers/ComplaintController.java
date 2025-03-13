package com.example.demo.Controlers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entites.Complaint;
import com.example.demo.Repos.ComplaintRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintRepository complaintRepository;

    // POST method to submit a complaint
    @PostMapping
    public ResponseEntity<Complaint> createComplaint(@RequestBody Complaint complaint) {
        Complaint savedComplaint = complaintRepository.save(complaint);
        return new ResponseEntity<>(savedComplaint, HttpStatus.CREATED);
    }

    // Optional: GET method to fetch all complaints
    @GetMapping
    public ResponseEntity<Iterable<Complaint>> getAllComplaints() {
        return ResponseEntity.ok(complaintRepository.findAll());
    }

    // PUT method to add a reply to a complaint
    @PutMapping("/{id}/reply")
    public ResponseEntity<Complaint> addReplyToComplaint(@PathVariable Long id, @RequestBody String reply) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        complaint.setReply(reply);
        Complaint updatedComplaint = complaintRepository.save(complaint);

        return ResponseEntity.ok(updatedComplaint);
    }

    // New GET method to fetch complaints by register number
    @GetMapping("/registerNumber/{registerNumber}")
    public ResponseEntity<Iterable<Complaint>> getComplaintsByRegisterNumber(@PathVariable String registerNumber) {
        // Fetch complaints associated with the registerNumber
        List<Complaint> complaints = complaintRepository.findByRegisterNumber(registerNumber);
        if (complaints.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Return 404 if no complaints found
        }
        return ResponseEntity.ok(complaints); // Return the complaints if found
    }
}
