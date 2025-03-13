import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from React Router

function CustomerRegister() {
  // State to manage form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState(''); // New state for address
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // To handle loading state
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (!email || !password || !confirmPassword || !name || !phone || !address) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true); // Set loading to true during API request

    // Create the customer object
    const customerData = {
      name,
      email,
      password,
      phone,
      address,  // Include the address field
    };

    try {
      // Make the API call to register the customer
      const response = await fetch('http://localhost:6900/api/customers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      // Check if the response was successful
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
        setLoading(false);  // Set loading to false
        return;
      }
      navigate('/customerlogin');  // Redirect to the customer login page

    } catch (error) {
      setError('Something went wrong. Please try again later.');
      setLoading(false);  // Set loading to false
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.splitScreen}>
        {/* Left side - Register Form */}
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>CUSTOMER REGISTRATION</h2>
          {error && <div style={styles.errorMessage}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label htmlFor="name" style={styles.label}>FULL NAME</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder='Enter the full name'
                onChange={(e) => setName(e.target.value)} // Update name state
                style={styles.inputField}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>EMAIL ID</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder='Enter the email'
                onChange={(e) => setEmail(e.target.value)} // Update email state
                style={styles.inputField}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="phone" style={styles.label}>PHONE NUMBER</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                placeholder='Enter the phone number'
                onChange={(e) => setPhone(e.target.value)} // Update phone state
                style={styles.inputField}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="address" style={styles.label}>ADDRESS</label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                placeholder='Enter the address'
                onChange={(e) => setAddress(e.target.value)} // Update address state
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

            <div style={styles.inputGroup}>
              <label htmlFor="confirmPassword" style={styles.label}>CONFIRM PASSWORD</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder='Enter the confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state
                style={styles.inputField}
                required
              />
            </div>

            <div style={styles.submitBtnContainer}>
              <button
                type="submit"
                style={styles.submitBtn}
                disabled={loading}  // Disable the button while loading
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
        </div>

        {/* Right side - GIF or Image */}
        <div style={styles.gifContainer}>
          <img
            src="https://cdn.dribbble.com/users/5029463/screenshots/11511001/media/6cb497ee008768b9177dfc03fce747ea.gif"
            alt="Customer Registration Animation"
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
    maxWidth: '1200px',
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
    color: '#333',
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
    color: '#333',
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
  errorMessage: {
    color: 'red',
    fontSize: '1rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  submitBtnContainer: {
    width: '100%',
  },
  submitBtn: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#4c8bf5',
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
    maxWidth: '90%',
    height: 'auto',
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

export default CustomerRegister;
