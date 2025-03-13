import React, { useEffect, useState } from 'react';
import { FaUserGraduate, FaChartLine, FaChalkboardTeacher, FaLaptop, FaBook } from 'react-icons/fa';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles
import './WhyChooseUs.css'; // Import external CSS

function WhyChooseUs() {
  // State to handle hover effect on each point
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 2000, // Animation duration
      easing: 'ease-in-out', // Easing function
      once: true, // Trigger animation only once
    });
  }, []);

  return (
    <div className="why-choose-container" id="choose">
      <h1 className="why-choose-heading" data-aos="fade-up">Why Choose Our Institute?</h1>
      <p className="why-choose-subheading" data-aos="fade-up" data-aos-delay="200">
        We provide an enriching educational experience with a focus on academic excellence, innovative teaching methods, and student growth. Here’s why we are the perfect choice for your education:
      </p>

      <div className="why-choose-points-container">
        {/* Personalized Learning Section */}
        <div
          className={`point-card ${hoveredPoint === 'personalized' ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredPoint('personalized')}
          onMouseLeave={() => setHoveredPoint(null)}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <FaUserGraduate className="point-icon" />
          <h3 className="point-title">Personalized Learning</h3>
          <p className="point-description">
            We offer personalized learning experiences tailored to the needs of each student, ensuring a better understanding and mastery of subjects.
          </p>
        </div>

        {/* Data-Driven Progress Tracking Section */}
        <div
          className={`point-card ${hoveredPoint === 'insights' ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredPoint('insights')}
          onMouseLeave={() => setHoveredPoint(null)}
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <FaChartLine className="point-icon" />
          <h3 className="point-title">Data-Driven Progress Tracking</h3>
          <p className="point-description">
            Our advanced progress tracking systems provide real-time insights into student performance, helping to guide improvements and celebrate achievements.
          </p>
        </div>

        {/* Trusted Faculty Section */}
        <div
          className={`point-card ${hoveredPoint === 'partnerships' ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredPoint('partnerships')}
          onMouseLeave={() => setHoveredPoint(null)}
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <FaChalkboardTeacher className="point-icon" />
          <h3 className="point-title">Trusted Faculty</h3>
          <p className="point-description">
            Our faculty is comprised of highly qualified and experienced educators committed to fostering a supportive and enriching learning environment.
          </p>
        </div>

        {/* Cutting-Edge Educational Resources Section */}
        <div
          className={`point-card ${hoveredPoint === 'solutions' ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredPoint('solutions')}
          onMouseLeave={() => setHoveredPoint(null)}
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <FaLaptop className="point-icon" />
          <h3 className="point-title">Cutting-Edge Educational Resources</h3>
          <p className="point-description">
            We provide students with access to the latest educational technology and resources, enhancing the learning experience both in and outside the classroom.
          </p>
        </div>

        {/* Continuous Academic Growth Section */}
        <div
          className={`point-card ${hoveredPoint === 'growth' ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredPoint('growth')}
          onMouseLeave={() => setHoveredPoint(null)}
          data-aos="fade-up"
          data-aos-delay="700"
        >
          <FaBook className="point-icon" />
          <h3 className="point-title">Continuous Academic Growth</h3>
          <p className="point-description">
            We believe in fostering continuous academic development, providing opportunities for students to challenge themselves and grow beyond the classroom.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
