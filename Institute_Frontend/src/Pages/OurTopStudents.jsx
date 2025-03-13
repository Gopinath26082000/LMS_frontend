import React, { useEffect, useState } from 'react';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles
import './OurStudents.css'; // Import the external CSS file

function OurStudents() {
  const [hoveredStudent, setHoveredStudent] = useState(null);

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-in-out', // Easing function
      once: true, // Trigger animation only once
    });
  }, []);

  const students = [
    {
      photo: 'https://static.vecteezy.com/system/resources/thumbnails/038/999/552/small/ai-generated-college-girl-in-a-casual-yet-stylish-outfit-with-a-backpack-slung-over-one-shoulder-photo.jpg',
      name: 'Sophia Taylor',
      company: 'Google',
      description: 'Sophia is an exceptional Computer Science graduate who secured a position at Google.',
      link: 'https://www.google.com',
    },
    {
      photo: 'https://media.istockphoto.com/id/1161222772/photo/latina-college-girl-looking-at-the-camera-with-a-smile.jpg?s=170667a&w=0&k=20&c=AloE1t-H3HR6NUWDBqzoD4lHUzaDDyV5ELaZkCSWzM4=',
      name: 'Emma Johnson',
      company: 'Microsoft',
      description: 'Emma, a talented software engineer, now works as a developer at Microsoft.',
      link: 'https://www.microsoft.com',
    },
    {
      photo: 'https://img.freepik.com/premium-photo/university-student-holding-notebooks-posing-outdoor-portrait_1295366-167284.jpg?semt=ais_hybrid',
      name: 'Olivia Davis',
      company: 'Amazon',
      description: 'Olivia’s expertise in data science helped her secure a data analyst role at Amazon.',
      link: 'https://www.amazon.com',
    },
    {
      photo: 'https://img.freepik.com/premium-photo/photo-portrait-cheerful-young-college-woman-student-campus-with-backpack_763111-329798.jpg',
      name: 'Ava Miller',
      company: 'Facebook',
      description: 'Ava’s skills in digital marketing earned her a role at Facebook’s marketing team.',
      link: 'https://www.facebook.com',
    },
    {
      photo: 'https://img.freepik.com/premium-photo/photo-portrait-cheerful-young-college-woman-student-campus-with-backpack_763111-329766.jpg?w=360',
      name: 'Isabella Wilson',
      company: 'Tesla',
      description: 'Isabella’s passion for sustainability led her to a mechanical engineering role at Tesla.',
      link: 'https://www.tesla.com',
    },
    {
      photo: 'https://img.freepik.com/premium-photo/photo-portrait-cheerful-young-woman-college-student-outdoors-with-backpack-folder_763111-330009.jpg?w=360',
      name: 'Mia Clark',
      company: 'Apple',
      description: 'Mia’s design skills were recognized by Apple, where she now works as a UI/UX designer.',
      link: 'https://www.apple.com',
    },
    {
      photo: 'https://media.istockphoto.com/id/578811140/photo/smiling-female-young-college-student-of-indian-ethnicity.jpg?b=1&s=612x612&w=0&k=20&c=VFkB-4OkSibgAr_iSLB0l4X4-FjfMmWPFXmxM-1nhhQ=',
      name: 'Amelia Lee',
      company: 'Netflix',
      description: 'Amelia landed a software engineering position at Netflix, contributing to their video streaming platform.',
      link: 'https://www.netflix.com',
    },
    {
      photo: 'https://static.vecteezy.com/system/resources/thumbnails/046/761/383/small_2x/college-girl-standing-on-a-campus-outdoor-photo.JPG',
      name: 'Charlotte Brown',
      company: 'Adobe',
      description: 'Charlotte’s expertise in creative tools earned her a design position at Adobe.',
      link: 'https://www.adobe.com',
    },
  ];

  return (
    <div className="students-container" id="students">
      <h1 data-aos="fade-up">Our Placed Students</h1>
      <p data-aos="fade-up" data-aos-delay="200">
        We are proud of the incredible success of our students who have been placed in some of the top companies across the globe.
        Their talent and hard work are the foundation of our college's growing legacy.
      </p>

      <div className="students-grid">
        {students.map((student, index) => (
          <a
            href={student.link}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="student-card"
            onMouseEnter={() => setHoveredStudent(student.name)}
            onMouseLeave={() => setHoveredStudent(null)}
            data-aos="fade-up"
            data-aos-delay={`${300 + index * 100}`}
          >
            <img src={student.photo} alt={student.name} />
            <div
              className="student-info"
              style={{
                bottom: hoveredStudent === student.name ? '0' : '-100%',
              }}
            >
              <h3>{student.name}</h3>
              <h4>{student.company}</h4>
              <p>{student.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default OurStudents;
