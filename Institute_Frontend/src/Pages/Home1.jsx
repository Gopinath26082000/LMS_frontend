import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import './Home1.css';

function Home1() {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 2000, // Set the duration for the animation
    });
  }, []);

  return (
    <div className="home-container">
      <div
        className="left-content"
        data-aos="fade-left" // Content enters from the left
        data-aos-delay="2000" // Delay the content for 2 seconds
      >
        <h1 style={{ color: '#38AD7D' }}>Educational Institution Management Information System</h1>
        <p>
          This system is designed to streamline the management of educational institutions by integrating various administrative functions into a unified platform. The system offers features such as student enrollment, timetable management, grade tracking, faculty management, and much more.
          <br />
          With real-time data analysis and reporting, this system enhances decision-making for administrators and provides a seamless experience for students and faculty. The goal is to improve operational efficiency and create a more organized academic environment.
        </p>
      </div>

      <div
        className="right-image"
        data-aos="fade-right" // Image enters from the right
      >
        <img
          className="gif-style"
          src="https://lifescienceproduction.co.uk/wp-content/uploads/2022/06/90714-online-learning.gif"
          alt="Institution Management"
          loading="lazy" // Lazy load the image
        />
      </div>
    </div>
  );
}

export default Home1;
