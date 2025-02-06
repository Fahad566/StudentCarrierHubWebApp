import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../"; // Adjust path if needed
import "./UniHeader.css";

const UniHeader = () => {
  const [username, setUsername] = useState("");
  const [university, setUniversity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details from localStorage
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails) {
      setUsername(userDetails.username || userDetails.name || "User");
      setUniversity(userDetails.university || "University");
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase sign-out
      localStorage.clear(); // Clear all stored data
      navigate("/"); // Redirect to Login page
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout Error: ", error.message);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="header">
      <div className="header-left">
        <span className="logo">
          Student Career Hub
        </span>
      </div>
      <div className="header-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UniHeader;
