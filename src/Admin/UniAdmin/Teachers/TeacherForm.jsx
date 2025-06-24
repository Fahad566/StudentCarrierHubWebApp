import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firestore, auth } from "../../../index"; // Adjust the path to your firebase.js
import Layout from "../UniLayout/UniLayout";
import "./TeacherForm.css"; // Adjust the file name for styling if necessary

const TeacherForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
  });
  const [error, setError] = useState(""); // To store error messages
  const [successMessage, setSuccessMessage] = useState(""); // To store success message
  const [emailDomain, setEmailDomain] = useState(""); // Store email domain dynamically
  const [university, setUniversity] = useState(""); // Store university name dynamically

  // Fetch admin's email domain
  useEffect(() => {
    const fetchAdminEmailDomain = async () => {
      try {
        // Get the current admin's email
        const adminEmail = auth.currentUser?.email;

        if (!adminEmail) {
          throw new Error("Admin not logged in.");
        }

        // Extract the domain from the admin's email
        const domain = adminEmail.split("@")[1];
        setEmailDomain(domain);
      } catch (error) {
        console.error("Error fetching admin email domain:", error.message);
        setError("Failed to fetch admin email domain. Please try again.");
      }
    };

    fetchAdminEmailDomain();
  }, []);

  // Fetch university name from localStorage
  useEffect(() => {
    const fetchUniversityName = () => {
      try {
        // Fetch university name from localStorage
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        if (userDetails?.university) {
          setUniversity(userDetails.university);
        } else {
          setError("University name not found. Please contact the admin.");
        }
      } catch (err) {
        console.error("Error fetching university name:", err.message);
        setError("Failed to fetch university name. Please try again.");
      }
    };

    fetchUniversityName();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate email based on emailDomain
  const validateEmail = (email) => {
    if (!emailDomain) return false; // If domain not set, fail validation

    // Escape dots in domain for regex
    const escapedDomain = emailDomain.replace(/\./g, "\\.");
    const emailRegex = new RegExp(`^[^@\\s]+@${escapedDomain}$`, "i");
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous errors
    setSuccessMessage(""); // Reset success message

    if (!emailDomain) {
      setError("Email domain is not set. Please contact the admin.");
      return;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      setError(`Email must end with "@${emailDomain}"`);
      return;
    }

    try {
      // Create a new user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Reference to the "Teachers" collection in Firestore
      const teachersRef = collection(firestore, "Teachers");

      // Add form data to Firestore, **excluding the password** for security
      await addDoc(teachersRef, {
        name: formData.name,
        email: formData.email,
        department: formData.department,
        university: university,
        // password: formData.password, // Use the university name fetched from localStorage
        createdAt: new Date(), // Add timestamp
        userId: userCredential.user.uid, // Link the teacher to the auth user
      });

      setSuccessMessage("Teacher added successfully!");
      setTimeout(() => {
        navigate("/teacher"); // Redirect to the Teachers page after 2 seconds
      }, 2000); // Delay before navigation for user experience
    } catch (error) {
      console.error("Error adding teacher: ", error.message);
      setError("Failed to add teacher. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="form-card1">
        <div className="form-header1">
          <h2>Add New Teacher</h2>
        </div>

        <div className="form-content">
          <form onSubmit={handleSubmit}>
            {/* Teacher Name */}
            <div className="form-group">
              <label>Teacher Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Teacher Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Teacher Email */}
            <div className="form-group">
              <label>Teacher Email</label>
              <input
                type="email"
                name="email"
                placeholder={`Enter Teacher Email (e.g., name@${emailDomain})`}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Teacher Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Department */}
            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                placeholder="Enter Department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Success Message */}
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}

            {/* Submit Button */}
            <button type="submit" className="submit-button">
              Add Teacher
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default TeacherForm;
