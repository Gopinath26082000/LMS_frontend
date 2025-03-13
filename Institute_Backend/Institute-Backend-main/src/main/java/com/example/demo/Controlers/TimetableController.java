package com.example.demo.Controlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entites.Timetable;
import com.example.demo.Repos.TimetableRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/timetable")
public class TimetableController {

    @Autowired
    private TimetableRepository timetableRepository;

    // Endpoint to create or update the timetable
    @PostMapping("/store")
    public ResponseEntity<?> updateTimetable(@RequestBody Timetable timetable) {
        try {
            Timetable savedTimetable = timetableRepository.save(timetable);
            return ResponseEntity.ok(savedTimetable);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(400).body("Register number must be unique.");
        }
    }

    // Endpoint to retrieve timetable by register number
    @GetMapping("/{registerNumber}")
    public ResponseEntity<Timetable> getTimetable(@PathVariable String registerNumber) {
        return timetableRepository.findById(registerNumber)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PutMapping("/update/{registerNumber}/{day}/{period}")
    public ResponseEntity<?> updateSingleClass(@PathVariable String registerNumber, 
                                               @PathVariable String day, 
                                               @PathVariable String period, 
                                               @RequestBody String updatedClass) {
        // Find the existing timetable by register number
        return timetableRepository.findById(registerNumber).map(existingTimetable -> {
            // Based on the day and period, update the correct field
            switch (day.toLowerCase()) {
                case "monday":
                    switch (period) {
                        case "1":
                            existingTimetable.setMonday1(updatedClass);
                            break;
                        case "2":
                            existingTimetable.setMonday2(updatedClass);
                            break;
                        case "3":
                            existingTimetable.setMonday3(updatedClass);
                            break;
                        case "4":
                            existingTimetable.setMonday4(updatedClass);
                            break;
                        case "5":
                            existingTimetable.setMonday5(updatedClass);
                            break;
                        case "6":
                            existingTimetable.setMonday6(updatedClass);
                            break;
                        default:
                            return ResponseEntity.status(400).body("Invalid period");
                    }
                    break;
                case "tuesday":
                    switch (period) {
                        case "1":
                            existingTimetable.setTuesday1(updatedClass);
                            break;
                        case "2":
                            existingTimetable.setTuesday2(updatedClass);
                            break;
                        case "3":
                            existingTimetable.setTuesday3(updatedClass);
                            break;
                        case "4":
                            existingTimetable.setTuesday4(updatedClass);
                            break;
                        case "5":
                            existingTimetable.setTuesday5(updatedClass);
                            break;
                        case "6":
                            existingTimetable.setTuesday6(updatedClass);
                            break;
                        default:
                            return ResponseEntity.status(400).body("Invalid period");
                    }
                    break;
                case "wednesday":
                    switch (period) {
                        case "1":
                            existingTimetable.setWednesday1(updatedClass);
                            break;
                        case "2":
                            existingTimetable.setWednesday2(updatedClass);
                            break;
                        case "3":
                            existingTimetable.setWednesday3(updatedClass);
                            break;
                        case "4":
                            existingTimetable.setWednesday4(updatedClass);
                            break;
                        case "5":
                            existingTimetable.setWednesday5(updatedClass);
                            break;
                        case "6":
                            existingTimetable.setWednesday6(updatedClass);
                            break;
                        default:
                            return ResponseEntity.status(400).body("Invalid period");
                    }
                    break;
                case "thursday":
                    switch (period) {
                        case "1":
                            existingTimetable.setThursday1(updatedClass);
                            break;
                        case "2":
                            existingTimetable.setThursday2(updatedClass);
                            break;
                        case "3":
                            existingTimetable.setThursday3(updatedClass);
                            break;
                        case "4":
                            existingTimetable.setThursday4(updatedClass);
                            break;
                        case "5":
                            existingTimetable.setThursday5(updatedClass);
                            break;
                        case "6":
                            existingTimetable.setThursday6(updatedClass);
                            break;
                        default:
                            return ResponseEntity.status(400).body("Invalid period");
                    }
                    break;
                case "friday":
                    switch (period) {
                        case "1":
                            existingTimetable.setFriday1(updatedClass);
                            break;
                        case "2":
                            existingTimetable.setFriday2(updatedClass);
                            break;
                        case "3":
                            existingTimetable.setFriday3(updatedClass);
                            break;
                        case "4":
                            existingTimetable.setFriday4(updatedClass);
                            break;
                        case "5":
                            existingTimetable.setFriday5(updatedClass);
                            break;
                        case "6":
                            existingTimetable.setFriday6(updatedClass);
                            break;
                        default:
                            return ResponseEntity.status(400).body("Invalid period");
                    }
                    break;
                case "saturday":
                    switch (period) {
                        case "1":
                            existingTimetable.setSaturday1(updatedClass);
                            break;
                        case "2":
                            existingTimetable.setSaturday2(updatedClass);
                            break;
                        case "3":
                            existingTimetable.setSaturday3(updatedClass);
                            break;
                        case "4":
                            existingTimetable.setSaturday4(updatedClass);
                            break;
                        case "5":
                            existingTimetable.setSaturday5(updatedClass);
                            break;
                        case "6":
                            existingTimetable.setSaturday6(updatedClass);
                            break;
                        default:
                            return ResponseEntity.status(400).body("Invalid period");
                    }
                    break;
                default:
                    return ResponseEntity.status(400).body("Invalid day");
            }

            // Save the updated timetable
            Timetable savedTimetable = timetableRepository.save(existingTimetable);

            // Return the updated timetable as the response
            return ResponseEntity.ok(savedTimetable);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

}
