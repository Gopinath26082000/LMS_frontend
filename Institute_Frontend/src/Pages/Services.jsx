import React, { useState, useEffect } from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaBook, FaUserTie, FaBuilding } from 'react-icons/fa'; // Updated icons for education
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS styles
import './Services.css'; // Create and import a separate CSS file for styling

function Services() {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 2000, // Animation duration
      easing: 'ease-in-out', // Easing function
      once: true, // Trigger animation only once
    });
  }, []);

  return (
    <div className="services-container" id="services">
      <h2 className="services-title" data-aos="fade-up">
        EDUCATIONAL INSTITUTION SERVICES
      </h2>
      <div className="services-grid">
        {/* Student Management Card */}
        <div className="service-card" data-aos="fade-up" data-aos-delay="100">
          <FaUserGraduate className="service-icon" />
          <h2 className="service-title">Student Management</h2>
          <p className="service-description">
            Manage student profiles, track academic performance, and keep all student data in one place with our advanced student management system.
          </p>
        </div>

        {/* Faculty Management Card */}
        <div className="service-card" data-aos="fade-up" data-aos-delay="200">
          <FaChalkboardTeacher className="service-icon" />
          <h2 className="service-title">Faculty Management</h2>
          <p className="service-description">
            Easily manage faculty details, schedules, and performance evaluations to ensure smooth operation of the institution's academic staff.
          </p>
        </div>

        {/* Curriculum Management Card */}
        <div className="service-card" data-aos="fade-up" data-aos-delay="300">
          <FaBook className="service-icon" />
          <h2 className="service-title">Curriculum Management</h2>
          <p className="service-description">
            Plan, organize, and update curricula for various courses and programs, ensuring that educational standards are met with ease.
          </p>
        </div>

        {/* Admin Dashboard Card */}
        <div className="service-card" data-aos="fade-up" data-aos-delay="400">
          <FaUserTie className="service-icon" />
          <h2 className="service-title">Admin Dashboard</h2>
          <p className="service-description">
            Access a comprehensive dashboard for managing institutional operations, monitoring student and faculty performance, and more.
          </p>
        </div>

        {/* Campus Management Card */}
        <div className="service-card" data-aos="fade-up" data-aos-delay="500">
          <FaBuilding className="service-icon" />
          <h2 className="service-title">Campus & Facility Management</h2>
          <p className="service-description">
            Oversee campus facilities, classrooms, and infrastructure with our intuitive management tools designed for educational institutions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Services;
