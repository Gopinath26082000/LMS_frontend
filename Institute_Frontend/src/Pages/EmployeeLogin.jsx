import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for routing after login
import { useDispatch } from 'react-redux';  // Import useDispatch to dispatch the action
import { setRegisterNumber } from './userSlice';  // Import the action

function StudentLogin() {
  const [registrationNumber, setRegistrationNumber] = useState('');  // Use registration number
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();  // Initialize dispatch function

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = { registrationNumber, password };  // Send registration number and password

    try {
      // Send credentials to the backend API for login
      const response = await fetch('http://localhost:6900/api/student/login', {  // Correct URL for login
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        // Dispatch the action to save the registration number in Redux state
        dispatch(setRegisterNumber(registrationNumber));

        alert('Login successful');
        navigate('/employeedashboard');  // Redirect to the student dashboard after successful login
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);  // Show error message if login fails
      }
    } catch (error) {
      alert('An error occurred during login');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.splitScreen}>
        {/* Left side - Login Form */}
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>STUDENT LOGIN</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label htmlFor="registrationNumber" style={styles.label}>REGISTRATION NUMBER</label>
              <input
                type="text"
                id="registrationNumber"
                value={registrationNumber}
                placeholder="Enter your registration number"
                onChange={(e) => setRegistrationNumber(e.target.value)}
                style={styles.inputField}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>PASSWORD</label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                style={styles.inputField}
                required
              />
            </div>

            <div style={styles.submitBtnContainer}>
              <button type="submit" style={styles.submitBtn}>
                <b>LOGIN</b>
              </button>
            </div>
          </form>
        </div>

        {/* Right side - Animation or Image */}
        <div style={styles.gifContainer}>
          <img
            src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-login_516790-1261.jpg"
            alt="Student Login Animation"
            style={styles.gifImage}
          />
        </div>
      </div>
    </div>
  );
}

// Inline Styles for the login page
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f1f5f9',
    padding: '20px',
  },
  splitScreen: {
    display: 'flex',
    width: '90%',
    maxWidth: '920px',
    backgroundColor: 'white',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
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
    color: '#E15F83',
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
    color: '#E15F83',
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
  submitBtnContainer: {
    width: '100%',
  },
  submitBtn: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#E15F83',
    color: 'white',
    fontSize: '1.125rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
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
    maxWidth: '130%',
    height: '80%',
    borderRadius: '12px',
    objectFit: 'cover',
  },
};

export default StudentLogin;
