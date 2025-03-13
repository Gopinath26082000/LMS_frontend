import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from React Router

function AdminLogin() {
  // State to manage form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate(); // Hook to navigate programmatically

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if username and password are "admin"
    if (username === 'admin' && password === 'admin') {
      // Redirect to another page (e.g., /dashboard)
      navigate('/studentdirectory');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.splitScreen}>
        {/* Left side - Login Form */}
        <div style={styles.formContainer}>
          <h2 style={{...styles.formTitle, fontSize: windowWidth <= 768 ? '2rem' : '2.5rem' }}>
            ADMIN LOGIN
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label htmlFor="username" style={styles.label}>USERNAME</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                placeholder='Enter the username'
                onChange={(e) => setUsername(e.target.value)} // Update username state
                style={styles.inputField}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>PASSWORD</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder='Enter the password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                style={styles.inputField}
                required
              />
            </div>

            <div style={styles.submitBtnContainer}>
              <button
                type="submit"
                style={styles.submitBtn}
              >
                <b>LOGIN</b>
              </button>
            </div>
          </form>
        </div>

        {/* Right side - GIFs */}
        <div style={{ ...styles.gifContainer, display: windowWidth <= 768 ? 'none' : 'flex' }}>
          <img
            src="https://storage.googleapis.com/msgsndr/t4ivvHxEPSeJWYYREEWL/media/2d6f9b19-e981-41ff-9cc4-50040c7b0d5c.gif"
            alt="Admin Login Animation"
            style={styles.gifImage}
          />
        </div>
      </div>
    </div>
  );
}

// Enhanced Inline Styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f1f5f9', // Soft background
    padding: '20px',
  },
  splitScreen: {
    display: 'flex',
    width: '100%',
    maxWidth: '900px',
    backgroundColor: 'white',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
    borderRadius: '10px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  formContainer: {
    flex: 1,
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  formTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#84AEFD',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: '1.5rem',
  },
  label: {
    fontSize: '1rem',
    marginBottom: '0.5rem',
    color: '#84AEFD',
    fontWeight: '600',
  },
  inputField: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease',
  },
  inputFieldFocus: {
    borderColor: '#4c8bf5', // Blue border on focus
  },
  submitBtnContainer: {
    width: '100%',
  },
  submitBtn: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#84AEFD',
    color: 'white',
    fontSize: '1.125rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  submitBtnHover: {
    backgroundColor: '#744EA2',
    transform: 'scale(1.05)', // Slight scale effect on hover
  },
  gifContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '2rem',
  },
  gifImage: {
    maxWidth: '100%',
    height: 'auto',
    cursor: 'pointer',
    objectFit: 'cover',
    transition: 'max-width 0.3s ease', // Smooth transition for resizing GIF
  },
};

export default AdminLogin;
