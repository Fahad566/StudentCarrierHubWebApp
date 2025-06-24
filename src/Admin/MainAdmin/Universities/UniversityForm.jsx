import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../../index"; // Adjust the path to your firebase.js
import Layout from "../Layout/Layout";
import "./UniversityForm.css";

const UniversityForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "", // Initially empty, but we'll validate it starts with @
  });
  const [error, setError] = useState(""); // To store error messages
  const [successMessage, setSuccessMessage] = useState(""); // To store success message

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the email field is being edited, ensure it starts with "@"
    if (name === "email") {
      if (value.startsWith("@") || value === "") {
        setFormData({ ...formData, [name]: value });
      } else {
        setError("Email must start with @");
      }
    } else {
      // Handle changes for university name
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous errors
    setSuccessMessage(""); // Reset success message    

    try {
      // Reference to the "Universities" collection in Firestore
      const universitiesRef = collection(firestore, "Universities");

      // Add form data to Firestore
      await addDoc(universitiesRef, {
        name: formData.name,
        email: formData.email,
        createdAt: new Date(), // Add timestamp
      });

      setSuccessMessage("University added successfully!");
      setTimeout(() => {
        navigate("/universities"); // Redirect to the Universities page after 2 seconds
      }, 2000); // Delay before navigation for user experience
    } catch (error) {
      console.error("Error adding university: ", error.message);
      setError("Failed to add university. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="form-card">
        <div className="form-header">
          {/* Header background image is set in CSS */}
        </div>
        
        <div className="form-content">
          <h2>Add New University</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">University Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">University Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="@"
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            
            <button type="submit" className="submit-button">
              Add University
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UniversityForm;