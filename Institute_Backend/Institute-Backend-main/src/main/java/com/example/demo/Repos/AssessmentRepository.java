package com.example.demo.Repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entites.Assessment;

import java.util.List;

public interface AssessmentRepository extends JpaRepository<Assessment, Long> {
    // Find by staff registration number only (remove department)
    List<Assessment> findByStaffRegistrationNumber(String staffRegistrationNumber);
    List<Assessment> findByStudentRegistrationNumber(String studentRegistrationNumber);
}
