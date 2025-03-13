package com.example.demo.Repos;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Certificate;

public interface CertificateRepository extends JpaRepository<Certificate, Long> {
    Certificate findByRegistrationNumber(String registrationNumber);
}
