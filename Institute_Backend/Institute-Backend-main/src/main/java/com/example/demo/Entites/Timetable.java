package com.example.demo.Entites;

import jakarta.persistence.*;

@Entity
@Table(name = "timetable")
public class Timetable {

    @Id
    @Column(unique = true) // Ensures registerNumber is unique
    private String registerNumber; // Register Number
    
    private String monday1, monday2, monday3, monday4, monday5, monday6;
    private String tuesday1, tuesday2, tuesday3, tuesday4, tuesday5, tuesday6;
    private String wednesday1, wednesday2, wednesday3, wednesday4, wednesday5, wednesday6;
    private String thursday1, thursday2, thursday3, thursday4, thursday5, thursday6;
    private String friday1, friday2, friday3, friday4, friday5, friday6;
    private String saturday1, saturday2, saturday3, saturday4, saturday5, saturday6;
    
    public Timetable()
    {
    	
    }
    
    
    
	public Timetable(String registerNumber, String monday1, String monday2, String monday3, String monday4,
			String monday5, String monday6, String tuesday1, String tuesday2, String tuesday3, String tuesday4,
			String tuesday5, String tuesday6, String wednesday1, String wednesday2, String wednesday3,
			String wednesday4, String wednesday5, String wednesday6, String thursday1, String thursday2,
			String thursday3, String thursday4, String thursday5, String thursday6, String friday1, String friday2,
			String friday3, String friday4, String friday5, String friday6, String saturday1, String saturday2,
			String saturday3, String saturday4, String saturday5, String saturday6) {
		super();
		this.registerNumber = registerNumber;
		this.monday1 = monday1;
		this.monday2 = monday2;
		this.monday3 = monday3;
		this.monday4 = monday4;
		this.monday5 = monday5;
		this.monday6 = monday6;
		this.tuesday1 = tuesday1;
		this.tuesday2 = tuesday2;
		this.tuesday3 = tuesday3;
		this.tuesday4 = tuesday4;
		this.tuesday5 = tuesday5;
		this.tuesday6 = tuesday6;
		this.wednesday1 = wednesday1;
		this.wednesday2 = wednesday2;
		this.wednesday3 = wednesday3;
		this.wednesday4 = wednesday4;
		this.wednesday5 = wednesday5;
		this.wednesday6 = wednesday6;
		this.thursday1 = thursday1;
		this.thursday2 = thursday2;
		this.thursday3 = thursday3;
		this.thursday4 = thursday4;
		this.thursday5 = thursday5;
		this.thursday6 = thursday6;
		this.friday1 = friday1;
		this.friday2 = friday2;
		this.friday3 = friday3;
		this.friday4 = friday4;
		this.friday5 = friday5;
		this.friday6 = friday6;
		this.saturday1 = saturday1;
		this.saturday2 = saturday2;
		this.saturday3 = saturday3;
		this.saturday4 = saturday4;
		this.saturday5 = saturday5;
		this.saturday6 = saturday6;
	}



	public String getRegisterNumber() {
		return registerNumber;
	}



	public void setRegisterNumber(String registerNumber) {
		this.registerNumber = registerNumber;
	}



	public String getMonday1() {
		return monday1;
	}



	public void setMonday1(String monday1) {
		this.monday1 = monday1;
	}



	public String getMonday2() {
		return monday2;
	}



	public void setMonday2(String monday2) {
		this.monday2 = monday2;
	}



	public String getMonday3() {
		return monday3;
	}



	public void setMonday3(String monday3) {
		this.monday3 = monday3;
	}



	public String getMonday4() {
		return monday4;
	}



	public void setMonday4(String monday4) {
		this.monday4 = monday4;
	}



	public String getMonday5() {
		return monday5;
	}



	public void setMonday5(String monday5) {
		this.monday5 = monday5;
	}



	public String getMonday6() {
		return monday6;
	}



	public void setMonday6(String monday6) {
		this.monday6 = monday6;
	}



	public String getTuesday1() {
		return tuesday1;
	}



	public void setTuesday1(String tuesday1) {
		this.tuesday1 = tuesday1;
	}



	public String getTuesday2() {
		return tuesday2;
	}



	public void setTuesday2(String tuesday2) {
		this.tuesday2 = tuesday2;
	}



	public String getTuesday3() {
		return tuesday3;
	}



	public void setTuesday3(String tuesday3) {
		this.tuesday3 = tuesday3;
	}



	public String getTuesday4() {
		return tuesday4;
	}



	public void setTuesday4(String tuesday4) {
		this.tuesday4 = tuesday4;
	}



	public String getTuesday5() {
		return tuesday5;
	}



	public void setTuesday5(String tuesday5) {
		this.tuesday5 = tuesday5;
	}



	public String getTuesday6() {
		return tuesday6;
	}



	public void setTuesday6(String tuesday6) {
		this.tuesday6 = tuesday6;
	}



	public String getWednesday1() {
		return wednesday1;
	}



	public void setWednesday1(String wednesday1) {
		this.wednesday1 = wednesday1;
	}



	public String getWednesday2() {
		return wednesday2;
	}



	public void setWednesday2(String wednesday2) {
		this.wednesday2 = wednesday2;
	}



	public String getWednesday3() {
		return wednesday3;
	}



	public void setWednesday3(String wednesday3) {
		this.wednesday3 = wednesday3;
	}



	public String getWednesday4() {
		return wednesday4;
	}



	public void setWednesday4(String wednesday4) {
		this.wednesday4 = wednesday4;
	}



	public String getWednesday5() {
		return wednesday5;
	}



	public void setWednesday5(String wednesday5) {
		this.wednesday5 = wednesday5;
	}



	public String getWednesday6() {
		return wednesday6;
	}



	public void setWednesday6(String wednesday6) {
		this.wednesday6 = wednesday6;
	}



	public String getThursday1() {
		return thursday1;
	}



	public void setThursday1(String thursday1) {
		this.thursday1 = thursday1;
	}



	public String getThursday2() {
		return thursday2;
	}



	public void setThursday2(String thursday2) {
		this.thursday2 = thursday2;
	}



	public String getThursday3() {
		return thursday3;
	}



	public void setThursday3(String thursday3) {
		this.thursday3 = thursday3;
	}



	public String getThursday4() {
		return thursday4;
	}



	public void setThursday4(String thursday4) {
		this.thursday4 = thursday4;
	}



	public String getThursday5() {
		return thursday5;
	}



	public void setThursday5(String thursday5) {
		this.thursday5 = thursday5;
	}



	public String getThursday6() {
		return thursday6;
	}



	public void setThursday6(String thursday6) {
		this.thursday6 = thursday6;
	}



	public String getFriday1() {
		return friday1;
	}



	public void setFriday1(String friday1) {
		this.friday1 = friday1;
	}



	public String getFriday2() {
		return friday2;
	}



	public void setFriday2(String friday2) {
		this.friday2 = friday2;
	}



	public String getFriday3() {
		return friday3;
	}



	public void setFriday3(String friday3) {
		this.friday3 = friday3;
	}



	public String getFriday4() {
		return friday4;
	}



	public void setFriday4(String friday4) {
		this.friday4 = friday4;
	}



	public String getFriday5() {
		return friday5;
	}



	public void setFriday5(String friday5) {
		this.friday5 = friday5;
	}



	public String getFriday6() {
		return friday6;
	}



	public void setFriday6(String friday6) {
		this.friday6 = friday6;
	}



	public String getSaturday1() {
		return saturday1;
	}



	public void setSaturday1(String saturday1) {
		this.saturday1 = saturday1;
	}



	public String getSaturday2() {
		return saturday2;
	}



	public void setSaturday2(String saturday2) {
		this.saturday2 = saturday2;
	}



	public String getSaturday3() {
		return saturday3;
	}



	public void setSaturday3(String saturday3) {
		this.saturday3 = saturday3;
	}



	public String getSaturday4() {
		return saturday4;
	}



	public void setSaturday4(String saturday4) {
		this.saturday4 = saturday4;
	}



	public String getSaturday5() {
		return saturday5;
	}



	public void setSaturday5(String saturday5) {
		this.saturday5 = saturday5;
	}



	public String getSaturday6() {
		return saturday6;
	}



	public void setSaturday6(String saturday6) {
		this.saturday6 = saturday6;
	}
    
        

    // Constructor and getters/setters remain the same
    

}
