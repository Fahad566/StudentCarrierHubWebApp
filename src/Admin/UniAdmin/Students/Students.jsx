// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore"; // Firestore methods
// import { firestore } from "../../.."; // Import your Firestore configuration
// import UniLayout from "../UniLayout/UniLayout";
// import "./Students.css";
// import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome

// const Students = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editPopup, setEditPopup] = useState(false); // State for popup visibility
//   const [editData, setEditData] = useState({ id: "", name: "", email: "" }); // State for editing

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(firestore, "Students"));
//         const students = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           name: doc.data().name,
//           email: doc.data().email,
//           teachers: "-", // Placeholder
//           students: "-", // Placeholder
//         }));
//         setData(students);
//       } catch (err) {
//         console.error("Error fetching students:", err);
//         setError("Failed to fetch students. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudents();
//   }, []);

//   // Open Edit Popup
//   const openEditPopup = (id, name, email) => {
//     setEditPopup(true);
//     setEditData({ id, name, email });
//   };

//   // Handle Edit Save
//   const handleEditSave = async () => {
//     try {
//       const studentDoc = doc(firestore, "Students", editData.id);
//       await updateDoc(studentDoc, {
//         name: editData.name,
//         email: editData.email,
//       });
//       setData((prevData) =>
//         prevData.map((item) =>
//           item.id === editData.id
//             ? { ...item, name: editData.name, email: editData.email }
//             : item
//         )
//       );
//       setEditPopup(false);
//     } catch (err) {
//       console.error("Error updating student:", err);
//       setError("Failed to update student. Please try again later.");
//     }
//   };

//   // Handle Delete
//   const handleDelete = async (id) => {
//     try {
//       await deleteDoc(doc(firestore, "Students", id));
//       setData((prevData) => prevData.filter((item) => item.id !== id));
//     } catch (err) {
//       console.error("Error deleting student:", err);
//       setError("Failed to delete student. Please try again later.");
//     }
//   };

//   return (
//     <UniLayout>
//       <div className="students">
//         <h1>Student List</h1>

//         {/* Button and Search Bar */}
//         <div className="table-header">
//           <button className="add-button" onClick={() => navigate("/add-student")}>
//             <i className="fas fa-plus"></i> Add New Student
//           </button>
//           <div className="search-container">
//             <i className="fas fa-search search-icon"></i>
//             <input type="text" placeholder="Search Student" className="search-bar" />
//           </div>
//         </div>

//         {/* Loading/Error States */}
//         {loading ? (
//           <p>Loading students...</p>
//         ) : error ? (
//           <p className="error">{error}</p>
//         ) : (
//           <div className="table-container">
//             <table>
//               <thead>
//                 <tr>
//                   <th>No.</th>
//                   <th>Student Name</th>
//                   <th>Student Email</th>
//                   <th>Number of Teacher</th>
//                   <th>Number of Students</th>
//                   <th>Edit</th>
//                   <th>Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.length === 0 ? (
//                   <tr>
//                     <td colSpan="7">No students found.</td>
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
//                         <button
//                           className="edit-button"
//                           onClick={() => openEditPopup(row.id, row.name, row.email)}
//                         >
//                           <i className="fas fa-edit"></i>
//                         </button>
//                       </td>
//                       <td>
//                         <button
//                           className="delete-button"
//                           onClick={() => handleDelete(row.id)}
//                         >
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

//         {/* Edit Popup */}
//         {editPopup && (
//           <div className="popup">
//             <div className="popup-content">
//               <h2>Edit Student</h2>
//               <label>Name:</label>
//               <input
//                 type="text"
//                 value={editData.name}
//                 onChange={(e) => setEditData({ ...editData, name: e.target.value })}
//               />
//               <label>Email:</label>
//               <input
//                 type="email"
//                 value={editData.email}
//                 onChange={(e) => setEditData({ ...editData, email: e.target.value })}
//               />
//               <div className="popup-buttons">
//                 <button className="save-button" onClick={handleEditSave}>
//                   Save
//                 </button>
//                 <button className="cancel-button" onClick={() => setEditPopup(false)}>
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </UniLayout>
//   );
// };

// export default Students;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore"; // Firestore methods
import { firestore } from "../../.."; // Import your Firestore configuration
import UniLayout from "../UniLayout/UniLayout";
import "./Students.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome

const Students = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editPopup, setEditPopup] = useState(false); // State for popup visibility
  const [editData, setEditData] = useState({ id: "", name: "", email: "", password: "", batch: "" }); // State for editing
  const [university, setUniversity] = useState("");

  useEffect(() => {
    // Fetch university details from localStorage
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails && userDetails.university) {
      setUniversity(userDetails.university);
    } else {
      setError("University details not found. Please log in again.");
    }
  }, []);

  useEffect(() => {
    if (!university) return;

    const fetchStudents = async () => {
      try {
        setLoading(true);

        // Query students based on university name
        const studentQuery = query(collection(firestore, "students"), where("university", "==", university));
        const querySnapshot = await getDocs(studentQuery);

        const students = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().username,
          email: doc.data().email,
          password: doc.data().password,
          batch: doc.data().batch,
        }));

        setData(students);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to fetch students. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [university]);

  // Open Edit Popup
  const openEditPopup = (id, name, email, password, batch) => {
    setEditPopup(true);
    setEditData({ id, name, email, password, batch });
  };

  // Handle Edit Save
  const handleEditSave = async () => {
    try {
      const studentDoc = doc(firestore, "Students", editData.id);
      await updateDoc(studentDoc, {
        name: editData.name,
        email: editData.email,
        password: editData.password,
        batch: editData.batch,
      });
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editData.id
            ? {
                ...item,
                name: editData.name,
                email: editData.email,
                password: editData.password,
                batch: editData.batch,
              }
            : item
        )
      );
      setEditPopup(false);
    } catch (err) {
      console.error("Error updating student:", err);
      setError("Failed to update student. Please try again later.");
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, "Students", id));
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting student:", err);
      setError("Failed to delete student. Please try again later.");
    }
  };

  return (
    <UniLayout>
      <div className="students">
        <h1>Student List</h1>

        {/* Button and Search Bar */}
        <div className="table-header">
          <div className="search-container">
            <i className="fas fa-search search-icon"></i>
            <input type="text" placeholder="Search Student" className="search-bar" />
          </div>
        </div>

        {/* Loading/Error States */}
        {loading ? (
          <p>Loading students...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Batch</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="7">No students found.</td>
                  </tr>
                ) : (
                  data.map((row, index) => (
                    <tr key={row.id}>
                      <td>{index + 1}</td>
                      <td>{row.name}</td>
                      <td>{row.email}</td>
                      <td>{row.password}</td>
                      <td>{row.batch}</td>
                      <td>
                        <button
                          className="edit-button"
                          onClick={() => openEditPopup(row.id, row.name, row.email, row.password, row.batch)}
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
              <h2>Edit Student</h2>
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
              <label>Password:</label>
              <input
                type="text"
                value={editData.password}
                onChange={(e) => setEditData({ ...editData, password: e.target.value })}
              />
              <label>Batch:</label>
              <input
                type="text"
                value={editData.batch}
                onChange={(e) => setEditData({ ...editData, batch: e.target.value })}
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
    </UniLayout>
  );
};

export default Students;
