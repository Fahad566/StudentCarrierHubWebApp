import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore"; // Firestore methods
import { createUserWithEmailAndPassword, updatePassword } from "firebase/auth"; // Firebase Authentication methods
import { firestore, auth } from "../../.."; // Firebase configuration
import Layout from "../UniLayout/UniLayout";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./Companies.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome

const Companies = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editPopup, setEditPopup] = useState(false); // State for popup visibility
  const [editData, setEditData] = useState({
    id: "",
    companyName: "",
    hrName: "",
    hrEmail: "",
    password: "",
  }); // State for editing
  const [searchTerm, setSearchTerm] = useState(""); // Search state

  // Fetch companies data on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Companies"));
        const companies = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          companyName: doc.data().companyName || "Company Name",
          hrName: doc.data().hrName || "HR Name",
          hrEmail: doc.data().hrEmail || "hr@example.com",
          password: doc.data().password || "********", // Display password as it is
        }));

        setData(companies);
      } catch (err) {
        console.error("Error fetching Companies:", err);
        setError("Failed to fetch Companies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Open Edit Popup
  const openEditPopup = (id, companyName, hrName, hrEmail, password) => {
    setEditPopup(true);
    setEditData({ id, companyName, hrName, hrEmail, password });
  };

  // Handle Edit Save (save password without encryption)
  const handleEditSave = async () => {
    try {
      const companyDoc = doc(firestore, "Companies", editData.id);
      
      // If password has changed, update it in Firebase Authentication
      if (editData.password) {
        const user = await auth.getUserByEmail(editData.hrEmail);
        if (user) {
          await updatePassword(user, editData.password); // Update password in Firebase Auth
        }
      }

      // Update company details in Firestore with plain text password
      await updateDoc(companyDoc, {
        companyName: editData.companyName,
        hrName: editData.hrName,
        hrEmail: editData.hrEmail,
        password: editData.password, // Save password in plain text
      });
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editData.id ? { ...item, ...editData } : item
        )
      );
      setEditPopup(false);
    } catch (err) {
      console.error("Error updating Company:", err);
      setError("Failed to update Company. Please try again later.");
    }
  };

  // Handle Delete Company
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, "Companies", id));
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting Company:", err.message);
      setError("Failed to delete Company. Please try again later.");
    }
  };

  // Filter data based on search term
  const filteredData = data.filter((company) =>
    company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="companies">
        <h1>Company List</h1>

        {/* Search Bar and Add Button */}
        <div className="table-header">
          <Link to="/add-company" className="add-button">
            <i className="fas fa-plus-circle"></i> Add New Company
          </Link>
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search Company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Loading/Error States */}
        {loading ? (
          <p>Loading companies...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Company Name</th>
                  <th>HR Name</th>
                  <th>HR Email</th>
                  <th>Password</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="7">No companies found.</td>
                  </tr>
                ) : (
                  filteredData.map((row, index) => (
                    <tr key={row.id}>
                      <td>{index + 1}</td>
                      <td>{row.companyName}</td>
                      <td>{row.hrName}</td>
                      <td>{row.hrEmail}</td>
                      <td>{row.password}</td> {/* Display plain text password */}
                      <td>
                        <button
                          className="edit-button"
                          onClick={() =>
                            openEditPopup(
                              row.id,
                              row.companyName,
                              row.hrName,
                              row.hrEmail,
                              row.password
                            )
                          }
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                      </td>
                      <td>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(row.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Companies;
