package com.example.demo.Repos;

import com.example.demo.Entites.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    // Find complaints by register number (formerly email)
    List<Complaint> findByRegisterNumber(String registerNumber);
}
