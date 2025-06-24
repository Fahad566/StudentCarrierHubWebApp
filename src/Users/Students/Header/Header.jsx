import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { signOut } from "firebase/auth"; // Import signOut from Firebase
import { auth } from "../../../index"; // Adjust the path to your firebase file
import { LogOut } from 'lucide-react';
import './Header.css';

const Header = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [username, setUsername] = useState(""); // State to store username

  useEffect(() => {
    // Get the username from localStorage when the component mounts
    const storedUsername = localStorage.getItem("username:"); // Fetch from localStorage using 'username' key
    if (storedUsername) {
      setUsername(storedUsername); // Set the username if found
    } 
  }, [navigate]); // Only run on initial render or when navigate changes

  // Handle logout logic
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebase Authentication
      console.log("User logged out successfully");
      localStorage.removeItem("username:"); // Remove username from localStorage on logout
      navigate('/'); // Redirect to login page after successful logout
    } catch (error) {
      console.error("Error logging out: ", error.message); // Handle logout errors
    }
  };

  return (
    <header className="header1">
      <div className="welcome-message1">
        <h2>Welcome, {username || "Student"}</h2> {/* Show "Student" if no username */}
      </div>
      
      <div className="profile-actions1">
        <button className="logout-btn1" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
