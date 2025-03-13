package com.example.demo.Entites;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    
    @Column(unique = true)
    private String email;
    
    private String password;
    
    private String contactNumber;
    
    private LocalDate dob;  // Store Date of Birth
    
    private String course;  // Change department to course
    
    private String address;
    
    private String role;
    
    @Column(unique = true)  // Ensure registerNumber is unique
    private String registerNumber;
    
    private String gender;
    
    private LocalDate joiningDate;  // Store Joining Date
    
    private String qualification;
    
    private int experience;  // Store Experience in years
    
    private String designation;
    
    private String status;

    // Default constructor
    public Staff() {}

    // Constructor with all fields
    public Staff(Long id, String name, String email, String password, String contactNumber, 
                 LocalDate dob, String course, String address, String role, 
                 String registerNumber, String gender, LocalDate joiningDate, 
                 String qualification, int experience, String designation, String status) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.contactNumber = contactNumber;
        this.dob = dob;
        this.course = course;  // Use course instead of department
        this.address = address;
        this.role = role;
        this.registerNumber = registerNumber;
        this.gender = gender;
        this.joiningDate = joiningDate;
        this.qualification = qualification;
        this.experience = experience;
        this.designation = designation;
        this.status = status;
    }

    // Getters and setters for all fields...
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }

    public LocalDate getDob() { return dob; }
    public void setDob(LocalDate dob) { this.dob = dob; }

    public String getCourse() { return course; }  // Get course instead of department
    public void setCourse(String course) { this.course = course; }  // Set course instead of department

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getRegisterNumber() { return registerNumber; }
    public void setRegisterNumber(String registerNumber) { this.registerNumber = registerNumber; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public LocalDate getJoiningDate() { return joiningDate; }
    public void setJoiningDate(LocalDate joiningDate) { this.joiningDate = joiningDate; }

    public String getQualification() { return qualification; }
    public void setQualification(String qualification) { this.qualification = qualification; }

    public int getExperience() { return experience; }
    public void setExperience(int experience) { this.experience = experience; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    @Override
    public String toString() {
        return "Staff [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + ", contactNumber=" + contactNumber 
                + ", dob=" + dob + ", course=" + course + ", address=" + address + ", role=" + role + ", registerNumber=" + registerNumber
                + ", gender=" + gender + ", joiningDate=" + joiningDate + ", qualification=" + qualification + ", experience=" + experience
                + ", designation=" + designation + ", status=" + status + "]";
    }
}
