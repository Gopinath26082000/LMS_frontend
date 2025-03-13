package com.example.demo.Repos;

import com.example.demo.Entites.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepo extends JpaRepository<Staff, Long> {

    // Methods for finding by email and register number
    Staff findByEmail(String email);
    Staff findByRegisterNumber(String registerNumber);

    // You may also add any custom queries if needed based on course
    // Example: List<Staff> findByCourse(String course);
}
