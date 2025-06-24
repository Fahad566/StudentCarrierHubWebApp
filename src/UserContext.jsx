import React, { createContext, useContext, useState } from "react";

// Create the context
const UserContext = createContext();

// Context Provider Component
export const UserProvider = ({ children }) => {
  // Initialize user details from localStorage or default to null values
  const initialDetails = JSON.parse(localStorage.getItem("userDetails")) || {
    role: null, // Possible values: "Admin", "Teacher", "Student"
    name: null,
    email: null,
    password: null,
    university: null,
    additionalInfo: {}, // Any other details specific to roles
  };

  const [userDetails, setUserDetails] = useState(initialDetails);

  // Update user details
  const updateUserDetails = (details) => {
    const updatedDetails = { ...userDetails, ...details };
    setUserDetails(updatedDetails);
    localStorage.setItem("userDetails", JSON.stringify(updatedDetails)); // Save to localStorage
  };

  // Clear user details (e.g., on logout)
  const clearUserDetails = () => {
    setUserDetails({
      role: null,
      name: null,
      email: null,
      password: null,
      university: null,
      additionalInfo: {},
    });
    localStorage.removeItem("userDetails"); // Clear localStorage
  };

  return (
    <UserContext.Provider
      value={{
        userDetails,
        updateUserDetails,
        clearUserDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
