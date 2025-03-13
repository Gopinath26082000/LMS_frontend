package com.example.demo.Entites;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentId;

    private String studentRegistrationNumber; // Add student registration number
    private String staffRegistrationNumber;   // Add staff registration number

    private String name;

    private String department;

    private LocalDate date;

    private String status;

    public Attendance() {}

    public Attendance(String studentId, String studentRegistrationNumber, String staffRegistrationNumber, String name, String department, LocalDate date, String status) {
        this.studentId = studentId;
        this.studentRegistrationNumber = studentRegistrationNumber;
        this.staffRegistrationNumber = staffRegistrationNumber;
        this.name = name;
        this.department = department;
        this.date = date;
        this.status = status;
    }

    // Getters and Setters
    public String getStudentRegistrationNumber() {
        return studentRegistrationNumber;
    }

    public void setStudentRegistrationNumber(String studentRegistrationNumber) {
        this.studentRegistrationNumber = studentRegistrationNumber;
    }

    public String getStaffRegistrationNumber() {
        return staffRegistrationNumber;
    }

    public void setStaffRegistrationNumber(String staffRegistrationNumber) {
        this.staffRegistrationNumber = staffRegistrationNumber;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getStudentId() {
		return studentId;
	}

	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
    
    
}
