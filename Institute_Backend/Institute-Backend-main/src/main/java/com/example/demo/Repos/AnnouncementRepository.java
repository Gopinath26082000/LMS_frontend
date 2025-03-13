package com.example.demo.Repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entites.Announcement;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
}
