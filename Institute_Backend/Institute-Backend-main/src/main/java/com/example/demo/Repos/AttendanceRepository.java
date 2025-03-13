package com.example.demo.Repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entites.Attendance;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    // Find by staff registration number only (remove department)
    List<Attendance> findByStaffRegistrationNumber(String staffRegistrationNumber);
    List<Attendance> findByStudentRegistrationNumber(String studentRegistrationNumber);
}
