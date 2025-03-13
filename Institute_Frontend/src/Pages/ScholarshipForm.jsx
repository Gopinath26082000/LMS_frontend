import React, { useState } from "react";

// Admin Scholarship Form to add new scholarship details
const AdminScholarshipForm = () => {
  const [scholarshipType, setScholarshipType] = useState("government");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eligibility: "",
    amount: "",
    deadline: "",
    governmentDetails: "",
    privateDetails: "",
    status: "active", // default status as 'active'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Here, you'd typically send formData to the backend API
    console.log("Scholarship Data Submitted: ", formData);

    // After successful submission, update the form state
    setFormSubmitted(true);
    alert("Scholarship details uploaded successfully!");
  };

  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#f4f7fc', 
      margin: 0
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '30px',
        width: '80%',
        maxWidth: '600px',
        boxSizing: 'border-box',
        height: '100%', // Ensuring the form takes up 100% of the height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <h1 style={{ color: '#333', fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>
          Add New {scholarshipType === "government" ? "Government" : "Private"} Scholarship
        </h1>

        <form onSubmit={handleSubmit} style={{ flex: 1 }}>
          {/* Scholarship Type Selection */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '14px', color: '#555', display: 'block', marginBottom: '8px' }}>
              Scholarship Type:
            </label>
            <select
              value={scholarshipType}
              onChange={(e) => setScholarshipType(e.target.value)}
              name="scholarshipType"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            >
              <option value="government">Government</option>
              <option value="private">Private</option>
            </select>
          </div>

          {/* Scholarship Title */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '14px', color: '#555', display: 'block', marginBottom: '8px' }}>
              Scholarship Title:
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>

          {/* Scholarship Description */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '14px', color: '#555', display: 'block', marginBottom: '8px' }}>
              Description:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                minHeight: '120px',
              }}
            />
          </div>

          {/* Eligibility Criteria */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '14px', color: '#555', display: 'block', marginBottom: '8px' }}>
              Eligibility Criteria:
            </label>
            <textarea
              name="eligibility"
              value={formData.eligibility}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                minHeight: '120px',
              }}
            />
          </div>

          {/* Scholarship Amount */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '14px', color: '#555', display: 'block', marginBottom: '8px' }}>
              Scholarship Amount:
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>

          {/* Deadline */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '14px', color: '#555', display: 'block', marginBottom: '8px' }}>
              Deadline:
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>

          {/* Additional Fields based on Scholarship Type */}
          {scholarshipType === "government" && (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '14px', color: '#555', display: 'block', marginBottom: '8px' }}>
                Government Scholarship Specific Details:
              </label>
              <textarea
                name="governmentDetails"
                value={formData.governmentDetails}
                onChange={handleChange}
                placeholder="Provide specific government scholarship details"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  minHeight: '120px',
                }}
              />
            </div>
          )}

          {scholarshipType === "private" && (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '14px', color: '#555', display: 'block', marginBottom: '8px' }}>
                Private Scholarship Specific Details:
              </label>
              <textarea
                name="privateDetails"
                value={formData.privateDetails}
                onChange={handleChange}
                placeholder="Provide specific private scholarship details"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  minHeight: '120px',
                }}
              />
            </div>
          )}

          {/* Scholarship Status */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '14px', color: '#555', display: 'block', marginBottom: '8px' }}>
              Status:
            </label>
            <select
              value={formData.status}
              onChange={handleChange}
              name="status"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formSubmitted}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
          >
            {formSubmitted ? "Scholarship Added" : "Add Scholarship"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminScholarshipForm;
