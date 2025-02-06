import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../../index";
import Layout from "../Layout/Layout";
import "./AdminForm.css";

const AdminForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    university: "",
  });
  const [error, setError] = useState(""); // To store error messages
  const [successMessage, setSuccessMessage] = useState(""); // To store success message
  const [universities, setUniversities] = useState([]); // To store universities fetched from Firebase

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Universities"));
        const universityList = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("University Data:", data); // Check the data structure in the console
          universityList.push({ id: doc.id,  email: data.email, name: data.name});
        });
        setUniversities(universityList);
      } catch (error) {
        console.error("Error fetching universities: ", error.message);
        setError("Failed to fetch universities. Please try again.");
      }
    };
    fetchUniversities();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset any previous errors
    setSuccessMessage(""); // Reset success message
  
    // Validate email domain matches selected university's email domain
    const selectedUniversity = universities.find(
      (university) => university.name === formData.university
    );
    if (selectedUniversity) {
      const emailDomain = formData.email.split("@")[1];
      if (emailDomain !== selectedUniversity.email) {
        setError(`Email domain must be ${selectedUniversity.email}`);
        return;
      }
    }
  
    try {
      // Step 1: Create a new user in Firebase Authentication
      const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
  
      // Step 2: Reference to the "UniAdmins" collection in Firestore
      const uniAdminsRef = collection(firestore, "UniAdmins");
  
      // Step 3: Add admin details to Firestore
      await addDoc(uniAdminsRef, {
        name: formData.name,
        email: formData.email,
        password: formData.password, // Store the password if required by your use case
        university: formData.university,
        userId: user.uid, // Store the Firebase Authentication UID
        createdAt: new Date(), // Add timestamp
      });
  
      setSuccessMessage("Admin added successfully!");
      setTimeout(() => {
        navigate("/uniadmin"); // Redirect to the University Admins page after 2 seconds
      }, 2000); // Delay before navigation for user experience
    } catch (error) {
      console.error("Error adding admin: ", error.message);
      setError("Failed to add admin. Please try again.");
    }
  };
  

  return (
    <Layout>
      <div className="form-card1">
        <div className="form-header1">
          <h2>Add New Uni Admin</h2>
        </div>

        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Admin Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Admin Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Admin Email</label>
              <input
                type="text"
                name="email"
                placeholder="Enter Admin Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Admin Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="universityForm"> {/* Changed class name here */}
              <label>University Name</label>
              <select
                name="university"
                value={formData.university}
                onChange={handleChange}
                required
              >
                <option value="">Select University</option>
                {universities.map((university) => (
                  <option key={university.id} value={university.name}>
                    {university.name}
                  </option>
                ))}
              </select>
            </div>

            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <button type="submit" className="submit-button">
              Add Admin
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AdminForm;
