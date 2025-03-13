package com.example.demo.Entites;

import jakarta.persistence.*;

@Entity
public class Assessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentId;

    private String studentRegistrationNumber; // Add student registration number
    private String staffRegistrationNumber;   // Add staff registration number

    private String name;

    private String department;

    private String assessmentName;

    private Integer marks;

    private Integer passMark;

    public Assessment() {}

    public Assessment(String studentId, String studentRegistrationNumber, String staffRegistrationNumber, String name, String department, String assessmentName, Integer marks, Integer passMark) {
        this.studentId = studentId;
        this.studentRegistrationNumber = studentRegistrationNumber;
        this.staffRegistrationNumber = staffRegistrationNumber;
        this.name = name;
        this.department = department;
        this.assessmentName = assessmentName;
        this.marks = marks;
        this.passMark = passMark;
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

	public String getAssessmentName() {
		return assessmentName;
	}

	public void setAssessmentName(String assessmentName) {
		this.assessmentName = assessmentName;
	}

	public Integer getMarks() {
		return marks;
	}

	public void setMarks(Integer marks) {
		this.marks = marks;
	}

	public Integer getPassMark() {
		return passMark;
	}

	public void setPassMark(Integer passMark) {
		this.passMark = passMark;
	}

    // Other Getters and Setters
    
}
