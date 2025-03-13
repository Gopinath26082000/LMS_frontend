package com.example.demo.Repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entites.Timetable;

public interface TimetableRepository extends JpaRepository<Timetable, String> {
    // You can add custom queries if needed
}
