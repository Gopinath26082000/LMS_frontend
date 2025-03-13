package com.example.demo;

import jakarta.persistence.*;
import jakarta.persistence.GenerationType;

@Entity
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true) // Ensuring uniqueness of registrationNumber in the database
    private String registrationNumber;

    private String pdfFileName;
    private String course;
    private String endDate;

    public Certificate() {
    }

    public Certificate(Long id, String registrationNumber, String pdfFileName, String course, String endDate) {
        super();
        this.id = id;
        this.registrationNumber = registrationNumber;
        this.pdfFileName = pdfFileName;
        this.course = course;
        this.endDate = endDate;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getPdfFileName() {
        return pdfFileName;
    }

    public void setPdfFileName(String pdfFileName) {
        this.pdfFileName = pdfFileName;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
}
