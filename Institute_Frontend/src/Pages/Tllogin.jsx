import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch to dispatch actions
import { setRegisterNumber } from './userSlice';  // Import the action to set register number
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

function TLLogin() {
  const [registerNumber, setRegisterNumberInput] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = { identifier: registerNumber, password };

    try {
      const response = await fetch('http://localhost:6900/api/owner/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        alert('Login successful');
        dispatch(setRegisterNumber(registerNumber)); // Dispatch the register number to Redux
        navigate('/tlhomepage'); // Redirect to TL homepage
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
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
          <h2 style={{...styles.formTitle, fontSize: '2.5rem'}}>STAFF LOGIN</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label htmlFor="registerNumber" style={styles.label}>REGISTER NUMBER</label>
              <input
                type="text"
                id="registerNumber"
                value={registerNumber}
                placeholder="Enter your register number"
                onChange={(e) => setRegisterNumberInput(e.target.value)}
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
            src="https://cdni.iconscout.com/illustration/premium/thumb/employees-are-logging-into-their-accounts-illustration-download-in-svg-png-gif-file-formats--user-login-password-account-employee-content-writing-pack-people-illustrations-8419462.png"
            alt="Team Leader Login Animation"
            style={styles.gifImage}
          />
        </div>
      </div>
    </div>
  );
}

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
    width: '100%',
    maxWidth: '900px',
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
    color: '#8B4A34',
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
    color: '#8B4A34',
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
    backgroundColor: '#8B4A34',
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
    maxWidth: '100%',
    height: 'auto',
    objectFit: 'cover',
    transition: 'max-width 0.3s ease',
  },
};

export default TLLogin;
