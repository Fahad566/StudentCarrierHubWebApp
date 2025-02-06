import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firestore, auth } from "../../../index";
import emailjs from "emailjs-com";
import Layout from "../UniLayout/UniLayout";
import "./CompaniesForm.css";

const CompaniesForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    hrName: "",
    hrEmail: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [university, setUniversity] = useState("");

  useEffect(() => {
    const fetchUniversityName = () => {
      try {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        if (userDetails?.university) {
          setUniversity(userDetails.university);
        } else {
          setError("University name not found.");
        }
      } catch (err) {
        console.error("Error fetching university name:", err.message);
        setError("Failed to fetch university name.");
      }
    };
    fetchUniversityName();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendEmail = (hrData) => {
    const emailParams = {
      to_email: hrData.hrEmail,
      hr_name: hrData.hrName,
      company_name: hrData.companyName,
      login_link: "https://yourwebsite.com/login",
      email: hrData.hrEmail,
      password: hrData.password,
    };

    emailjs
      .send("service_6ikw0vi", "template_6zea83p", emailParams, "iC2xMIi8s1n79MzdT")
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
      })
      .catch((err) => {
        console.error("Failed to send email:", err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.hrEmail,
        formData.password
      );

      await addDoc(collection(firestore, "Companies"), {
        companyName: formData.companyName,
        hrName: formData.hrName,
        hrEmail: formData.hrEmail,
        university: university,
        createdAt: new Date(),
        hrUserId: userCredential.user.uid,
      });

      setSuccessMessage("Company added successfully!");
      sendEmail(formData);

      setTimeout(() => {
        navigate("/companies");
      }, 2000);
    } catch (error) {
      console.error("Error adding company: ", error.message);
      setError("Failed to add company. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="form-card1">
        <div className="form-header1">
          <h2>Add New Company</h2>
        </div>

        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                placeholder="Enter Company Name"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>HR Name</label>
              <input
                type="text"
                name="hrName"
                placeholder="Enter HR Name"
                value={formData.hrName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>HR Email</label>
              <input
                type="email"
                name="hrEmail"
                placeholder="Enter HR Email"
                value={formData.hrEmail}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter HR Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <button type="submit" className="submit-button">
              Add Company
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CompaniesForm;