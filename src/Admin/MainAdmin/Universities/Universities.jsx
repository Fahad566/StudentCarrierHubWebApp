// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { collection, getDocs } from "firebase/firestore"; // Firestore methods
// import { firestore } from "../../../"; // Import your Firestore configuration
// import Layout from "../Layout/Layout";
// import "./Universities.css";
// import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome

// const Universities = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true); // To handle loading state
//   const [error, setError] = useState(null); // To handle errors

//   useEffect(() => {
//     const fetchUniversities = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(firestore, "Universities"));
//         const universities = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           name: doc.data().name, // Assuming the field is `uniname`
//           email: doc.data().email,
//           teachers: "-", // Placeholder for teachers
//           students: "-", // Placeholder for students
//         }));
//         setData(universities);
//       } catch (err) {
//         console.error("Error fetching universities:", err);
//         setError("Failed to fetch universities. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUniversities();
//   }, []);

//   return (
//     <Layout>
//       <div className="universities">
//         <h1>University List</h1>

//         {/* Button and Search Bar */}
//         <div className="table-header">
//           <button className="add-button" onClick={() => navigate("/add-university")}>
//             <i className="fas fa-plus"></i> Add New University
//           </button>
//           <div className="search-container">
//             <i className="fas fa-search search-icon"></i>
//             <input type="text" placeholder="Search University" className="search-bar" />
//           </div>
//         </div>

//         {/* Loading/Error States */}
//         {loading ? (
//           <p>Loading universities...</p>
//         ) : error ? (
//           <p className="error">{error}</p>
//         ) : (
//           <div className="table-container">
//             <table>
//               <thead>
//                 <tr>
//                   <th>No.</th>
//                   <th>University Name</th>
//                   <th>University Email</th>
//                   <th>Number of Teacher</th>
//                   <th>Number of Students</th>
//                   <th>Edit</th>
//                   <th>Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.length === 0 ? (
//                   <tr>
//                     <td colSpan="7">No universities found.</td>
//                   </tr>
//                 ) : (
//                   data.map((row, index) => (
//                     <tr key={row.id}>
//                       <td>{index + 1}</td>
//                       <td>{row.name}</td>
//                       <td>{row.email}</td>
//                       <td>{row.teachers}</td>
//                       <td>{row.students}</td>
//                       <td>
//                         <button className="edit-button">
//                           <i className="fas fa-edit"></i>
//                         </button>
//                       </td>
//                       <td>
//                         <button className="delete-button">
//                           <i className="fas fa-trash"></i>
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default Universities;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore"; // Firestore methods
import { firestore } from "../../../"; // Import your Firestore configuration
import Layout from "../Layout/Layout";
import "./Universities.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome

const Universities = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editPopup, setEditPopup] = useState(false); // State for popup visibility
  const [editData, setEditData] = useState({ id: "", name: "", email: "" }); // State for editing

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Universities"));
        const universities = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          teachers: "-", // Placeholder
          students: "-", // Placeholder
        }));
        setData(universities);
      } catch (err) {
        console.error("Error fetching universities:", err);
        setError("Failed to fetch universities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  // Open Edit Popup
  const openEditPopup = (id, name, email) => {
    setEditPopup(true);
    setEditData({ id, name, email });
  };

  // Handle Edit Save
  const handleEditSave = async () => {
    try {
      const universityDoc = doc(firestore, "Universities", editData.id);
      await updateDoc(universityDoc, {
        uniname: editData.name,
        email: editData.email,
      });
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editData.id
            ? { ...item, name: editData.name, email: editData.email }
            : item
        )
      );
      setEditPopup(false);
    } catch (err) {
      console.error("Error updating university:", err);
      setError("Failed to update university. Please try again later.");
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, "Universities", id));
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting university:", err);
      setError("Failed to delete university. Please try again later.");
    }
  };

  return (
    <Layout>
      <div className="universities">
        <h1>University List</h1>

        {/* Button and Search Bar */}
        <div className="table-header">
          <button className="add-button" onClick={() => navigate("/add-university")}>
            <i className="fas fa-plus"></i> Add New University
          </button>
          <div className="search-container">
            <i className="fas fa-search search-icon"></i>
            <input type="text" placeholder="Search University" className="search-bar" />
          </div>
        </div>

        {/* Loading/Error States */}
        {loading ? (
          <p>Loading universities...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>University Name</th>
                  <th>University Email</th>
                  <th>Number of Teacher</th>
                  <th>Number of Students</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="7">No universities found.</td>
                  </tr>
                ) : (
                  data.map((row, index) => (
                    <tr key={row.id}>
                      <td>{index + 1}</td>
                      <td>{row.name}</td>
                      <td>{row.email}</td>
                      <td>{row.teachers}</td>
                      <td>{row.students}</td>
                      <td>
                        <button
                          className="edit-button"
                          onClick={() => openEditPopup(row.id, row.name, row.email)}
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
              <h2>Edit University</h2>
              <label>Name:</label>
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

export default Universities;
