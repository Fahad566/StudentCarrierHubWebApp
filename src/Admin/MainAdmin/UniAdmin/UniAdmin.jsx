// UniAdmin.js
import React, { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore"; // Firestore methods
import { firestore } from "../../../"; // Import your Firestore configuration
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./UniAdmin.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome

const UniAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editPopup, setEditPopup] = useState(false); // State for popup visibility
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    university: "",
  }); // State for editing
  const [searchTerm, setSearchTerm] = useState(""); // Search state

  useEffect(() => {
    const fetchUniAdmins = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "UniAdmins"));
        const uniAdmins = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || "Admin Name", // Demo data placeholders
          email: doc.data().email || "admin@example.com",
          password: doc.data().password || "********",
          university: doc.data().university || "Demo University",
        }));
        setData(uniAdmins);
      } catch (err) {
        console.error("Error fetching UniAdmins:", err);
        setError("Failed to fetch UniAdmins. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUniAdmins();
  }, []);

  // Open Edit Popup
  const openEditPopup = (id, name, email, password, university) => {
    setEditPopup(true);
    setEditData({ id, name, email, password, university });
  };

  // Handle Edit Save
  const handleEditSave = async () => {
    try {
      const adminDoc = doc(firestore, "UniAdmins", editData.id);
      await updateDoc(adminDoc, {
        name: editData.name,
        email: editData.email,
        password: editData.password,
        university: editData.university,
      });
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editData.id
            ? { ...item, ...editData }
            : item
        )
      );
      setEditPopup(false);
    } catch (err) {
      console.error("Error updating UniAdmin:", err);
      setError("Failed to update UniAdmin. Please try again later.");
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, "UniAdmins", id));
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting UniAdmin:", err);
      setError("Failed to delete UniAdmin. Please try again later.");
    }
  };

  // Filter data based on search term
  const filteredData = data.filter((admin) =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="uniadmin">
        <h1>University Admin List</h1>

        {/* Search Bar and Add Button */}
        <div className="table-header">
          <Link to="/admin-form" className="add-button">
            <i className="fas fa-plus-circle"></i> Add New Admin
          </Link>
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search Admin"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Loading/Error States */}
        {loading ? (
          <p>Loading admins...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Admin Name</th>
                  <th>Admin Email</th>
                  <th>Password</th>
                  <th>University Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="7">No admins found.</td>
                  </tr>
                ) : (
                  filteredData.map((row, index) => (
                    <tr key={row.id}>
                      <td>{index + 1}</td>
                      <td>{row.name}</td>
                      <td>{row.email}</td>
                      <td>{row.password}</td>
                      <td>{row.university}</td>
                      <td>
                        <button
                          className="edit-button"
                          onClick={() =>
                            openEditPopup(
                              row.id,
                              row.name,
                              row.email,
                              row.password,
                              row.university
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

        {/* Edit Popup */}
        {editPopup && (
          <div className="popup">
            <div className="popup-content">
              <h2>Edit Admin</h2>
              <label>Admin Name:</label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
              <label>Email:</label>
              <input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              />
              <label>Password:</label>
              <input
                type="password"
                value={editData.password}
                onChange={(e) => setEditData({ ...editData, password: e.target.value })}
              />
              <label>University Name:</label>
              <input
                type="text"
                value={editData.university}
                onChange={(e) =>
                  setEditData({ ...editData, university: e.target.value })
                }
              />
              <div className="popup-buttons">
                <button className="save-button" onClick={handleEditSave}>
                  Save
                </button>
                <button className="cancel-button" onClick={() => setEditPopup(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UniAdmin;
