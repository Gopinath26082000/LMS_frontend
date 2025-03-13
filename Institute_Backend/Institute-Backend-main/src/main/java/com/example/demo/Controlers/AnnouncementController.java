package com.example.demo.Controlers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entites.Announcement;
import com.example.demo.Repos.AnnouncementRepository;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/announcements")
public class AnnouncementController {

    @Autowired
    private AnnouncementRepository announcementRepository;

    // Create a new announcement
    @PostMapping
    public ResponseEntity<Announcement> createAnnouncement(@RequestBody Announcement announcement) {
        Announcement savedAnnouncement = announcementRepository.save(announcement);
        return new ResponseEntity<>(savedAnnouncement, HttpStatus.CREATED);
    }

    // Get all announcements
    @GetMapping
    public ResponseEntity<List<Announcement>> getAllAnnouncements() {
        List<Announcement> announcements = announcementRepository.findAll();
        return ResponseEntity.ok(announcements);
    }

    // Get announcement by ID (optional, if needed)
    @GetMapping("/{id}")
    public ResponseEntity<Announcement> getAnnouncementById(@PathVariable Long id) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Announcement not found"));
        return ResponseEntity.ok(announcement);
    }
}
