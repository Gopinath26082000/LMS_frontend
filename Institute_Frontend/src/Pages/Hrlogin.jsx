import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from React Router

function Hrlogin() {
  // State to manage form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Hook to navigate programmatically

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if username and password are "admin"
    if (username === 'authority' && password === 'authority') {
      // Redirect to another page (e.g., /dashboard)
      navigate('/hrdashboard');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.splitScreen}>
        {/* Left side - Login Form */}
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>AUTHORITY LOGIN</h2>
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
        <div style={styles.gifContainer}>
          <img
            src="https://img.freepik.com/premium-vector/secure-login-sign-up-concept-illustration-user-use-secure-login-password-protection-website-social-media-account-vector-flat-style_7737-2270.jpg?semt=ais_hybrid"
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
    maxWidth: '800px',
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
    color: '#6777E9',
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
    color: '#6777E9',
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
    backgroundColor: '#6777E9',
    color: 'white',
    fontSize: '1.125rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  submitBtnHover: {
    backgroundColor: '#3578e5',
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
    maxWidth: '110%',
    height: '110%',
    borderRadius: '12px',
    objectFit: 'cover',
  },
};

// Media query-like behavior using inline styles for responsiveness
if (window.innerWidth <= 768) {
  styles.splitScreen.flexDirection = 'column';
  styles.gifImage.display = 'none'; // Hide GIF on small screens
  styles.formContainer.padding = '2rem'; // Less padding on smaller screens
}

export default Hrlogin;
