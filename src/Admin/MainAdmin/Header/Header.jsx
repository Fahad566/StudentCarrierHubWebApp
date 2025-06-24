import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../"; // Adjust the path to your firebase file
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase sign-out method
      localStorage.removeItem("authToken"); // Clear any stored auth token
      navigate("/"); // Redirect to the Login page
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout Error: ", error.message);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="header">
      <div className="header-left">
        <span className="logo">Student Career Hub</span>
      </div>
      <div className="header-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
