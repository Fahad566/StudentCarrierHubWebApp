import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore"; // Firestore methods
import { deleteUser } from "firebase/auth"; // Firebase Authentication delete method
import { firestore, auth } from "../../.."; // Firebase configuration
import Layout from "../UniLayout/UniLayout";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./Teachers.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome

const Teachers = () => {
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

  // Fetch teachers data on component mount
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        // Get the university from localStorage
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        const userUniversity = userDetails?.university || "";

        if (!userUniversity) {
          setError("University not found in local storage.");
          setLoading(false);
          return;
        }

        const querySnapshot = await getDocs(collection(firestore, "Teachers"));
        const teachers = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            name: doc.data().name || "Teacher Name",
            email: doc.data().email || "teacher@example.com",
            password: doc.data().password || "********",
            university: doc.data().university || "Demo University",
            userId: doc.data().userId || "",
          }))
          .filter((teacher) => teacher.university === userUniversity); // Filter by university

        setData(teachers);
      } catch (err) {
        console.error("Error fetching Teachers:", err);
        setError("Failed to fetch Teachers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Open Edit Popup
  const openEditPopup = (id, name, email, password, university) => {
    setEditPopup(true);
    setEditData({ id, name, email, password, university });
  };

  // Handle Edit Save
  const handleEditSave = async () => {
    try {
      const teacherDoc = doc(firestore, "Teachers", editData.id);
      await updateDoc(teacherDoc, {
        name: editData.name,
        email: editData.email,
        password: editData.password,
        university: editData.university,
      });
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editData.id ? { ...item, ...editData } : item
        )
      );
      setEditPopup(false);
    } catch (err) {
      console.error("Error updating Teacher:", err);
      setError("Failed to update Teacher. Please try again later.");
    }
  };

  // Handle Delete Teacher
  const handleDelete = async (id) => {
    try {
      const teacherDoc = doc(firestore, "Teachers", id);
      const teacherSnapshot = await getDoc(teacherDoc);

      if (!teacherSnapshot.exists()) {
        throw new Error("Teacher not found");
      }

      const teacherData = teacherSnapshot.data();
      const userId = teacherData.userId;

      await deleteDoc(teacherDoc);

      if (userId) {
        const user = auth.currentUser;

        if (user?.uid === userId) {
          await deleteUser(user);
        } else {
          console.error("User mismatch or not authenticated.");
        }
      }

      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting Teacher:", err.message);
      setError("Failed to delete Teacher. Please try again later.");
    }
  };

  // Filter data based on search term
  const filteredData = data.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="teachers">
        <h1>Teacher List</h1>

        {/* Search Bar and Add Button */}
        <div className="table-header">
          <Link to="/add-teacher" className="add-button">
            <i className="fas fa-plus-circle"></i> Add New Teacher
          </Link>
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search Teacher"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Loading/Error States */}
        {loading ? (
          <p>Loading teachers...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Teacher Name</th>
                  <th>Teacher Email</th>
                  <th>Password</th>
                  <th>University Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="7">No teachers found.</td>
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
              <h2>Edit Teacher</h2>
              <label>Teacher Name:</label>
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
                <button
                  className="cancel-button"
                  onClick={() => setEditPopup(false)}
                >
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

export default Teachers;

