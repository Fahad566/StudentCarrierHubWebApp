import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../.."; // Adjust path if needed
import "./TeacherHeader.css";

const TeacherHeader = () => {
  const [username, setUsername] = useState("");
  const [institution, setInstitution] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch teacher details from localStorage
    const teacherDetails = JSON.parse(localStorage.getItem("teacherDetails"));
    if (teacherDetails) {
      setUsername(teacherDetails.username || teacherDetails.name || "Teacher");
      setInstitution(teacherDetails.institution || "Institution");
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase sign-out
      localStorage.clear(); // Clear all stored data
      navigate("/"); // Redirect to Login page
      console.log("Teacher logged out successfully");
    } catch (error) {
      console.error("Logout Error: ", error.message);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="header">
      <div className="header-left">
        <span className="logo">Teacher Portal</span>
      </div>
      <div className="header-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default TeacherHeader;
