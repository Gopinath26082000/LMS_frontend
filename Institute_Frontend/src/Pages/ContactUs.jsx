import React, { useEffect } from 'react';
import { FaEnvelope, FaPhoneAlt, FaFacebook, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaGraduationCap, FaChalkboardTeacher, FaSchool } from 'react-icons/fa'; // Added relevant icons for education
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

function ContactUs() {
  // Initialize AOS when the component mounts
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-in-out', // Easing function
      once: true, // Trigger animation only once
    });
  }, []);

  const containerStyle = {
    backgroundColor: '#f7f7f7', // Soft background color for a professional look
    color: '#333',
    padding: '100px 30px', // Increased padding for better spacing
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif', // Modern font
    borderTop: '6px solid #197230', // Refined blue accent color
  };

  const headingStyle = {
    fontSize: '48px',
    fontWeight: '700',
    marginBottom: '30px',
    color: '#197230', // Green heading color for education
    textTransform: 'uppercase',
    letterSpacing: '2px',
    cursor: 'pointer',
    fontFamily: 'Montserrat, sans-serif', // More modern font for heading
  };

  const subheadingStyle = {
    fontSize: '20px',
    color: '#555',
    marginBottom: '60px',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.8',
    fontWeight: '400',
  };

  const footerContentStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  };

  const footerSectionStyle = {
    backgroundColor: '#ffffff',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    transition: 'transform 0.3s ease',
  };

  const footerTitleStyle = {
    fontSize: '22px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '20px',
    textTransform: 'uppercase',
  };

  const footerTextStyle = {
    fontSize: '16px',
    color: '#777',
    lineHeight: '1.8',
    marginBottom: '15px',
  };

  const iconContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginTop: '30px',
  };

  const iconStyle = {
    fontSize: '30px',
    color: '#1E90FF', // Accent color for icons
    cursor: 'pointer',
    transition: 'color 0.3s ease, transform 0.3s ease',
  };

  const iconHoverStyle = {
    color: '#62DBC7', // Slightly brighter hover effect
    transform: 'scale(1.2)', // Slight zoom effect
  };

  return (
    <div style={containerStyle} id="contact">
      <h2 style={headingStyle} data-aos="fade-up">Contact Us</h2>
      <p style={subheadingStyle} data-aos="fade-up" data-aos-delay="200">
        Have questions? Want to learn more about our programs? Get in touch with us below or follow us on social media.
      </p>

      <div style={footerContentStyle}>
        {/* Office Address Section */}
        <div style={footerSectionStyle} data-aos="fade-up" data-aos-delay="300">
          <h3 style={footerTitleStyle}>Our Campus</h3>
          <p style={footerTextStyle}>
            <FaMapMarkerAlt style={{ marginRight: '10px' }} /> 456 Learning Lane, Education Block
          </p>
          <p style={footerTextStyle}>
            Knowledge City, Country
          </p>
          <p style={footerTextStyle}>
            Postal Code: 67890
          </p>
        </div>

        {/* Contact Information Section */}
        <div style={footerSectionStyle} data-aos="fade-up" data-aos-delay="400">
          <h3 style={footerTitleStyle}>Contact Information</h3>
          <p style={footerTextStyle}>
            <FaEnvelope style={{ marginRight: '10px' }} /> admissions@educationsite.com
          </p>
          <p style={footerTextStyle}>
            <FaPhoneAlt style={{ marginRight: '10px' }} /> +1 (123) 789-1234
          </p>
          <p style={footerTextStyle}>
            <FaPhoneAlt style={{ marginRight: '10px' }} /> +1 (800) 111-2222 (Toll-Free)
          </p>
        </div>

        {/* Social Media Icons Section */}
        <div style={footerSectionStyle} data-aos="fade-up" data-aos-delay="500">
          <h3 style={footerTitleStyle}>Follow Us</h3>
          <div style={iconContainerStyle}>
            <FaFacebook
              style={iconStyle}
              onMouseEnter={(e) => (e.target.style.color = '#62DBC7')}
              onMouseLeave={(e) => (e.target.style.color = '#1E90FF')}
            />
            <FaTwitter
              style={iconStyle}
              onMouseEnter={(e) => (e.target.style.color = '#62DBC7')}
              onMouseLeave={(e) => (e.target.style.color = '#1E90FF')}
            />
            <FaLinkedin
              style={iconStyle}
              onMouseEnter={(e) => (e.target.style.color = '#62DBC7')}
              onMouseLeave={(e) => (e.target.style.color = '#1E90FF')}
            />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div style={footerContentStyle}>
        <div style={footerSectionStyle} data-aos="fade-up" data-aos-delay="600">
          <h3 style={footerTitleStyle}>Our Educational Programs</h3>
          <p style={footerTextStyle}>
            <FaGraduationCap style={{ marginRight: '10px' }} /> Undergraduate Programs
          </p>
          <p style={footerTextStyle}>
            <FaChalkboardTeacher style={{ marginRight: '10px' }} /> Professional Development
          </p>
          <p style={footerTextStyle}>
            <FaSchool style={{ marginRight: '10px' }} /> Online Courses
          </p>
        </div>
      </div>

      {/* Footer Copyright */}
<p
  style={{
    color: '#bbb',
    fontSize: '14px',
    marginTop: '60px',
    textAlign: 'center', // Added this to center the text
  }}
  data-aos="fade-up"
  data-aos-delay="700"
>
  &copy; 2024 EducationSite. All rights reserved.
</p>

    </div>
  );
}

export default ContactUs;
