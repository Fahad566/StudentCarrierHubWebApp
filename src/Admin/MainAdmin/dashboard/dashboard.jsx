// import React, { useState, useEffect } from "react";
// import Layout from "../Layout/Layout";
// import { collection, getDocs } from "firebase/firestore"; // Import Firestore methods
// import { firestore } from "../../../"; // Import your Firestore configuration
// import "./Dashboard.css";

// const Dashboard = () => {
//   const [totalStudents, setTotalStudents] = useState(0);
//   const [totalTeachers, setTotalTeachers] = useState(0);
//   const [totalAdmins, setTotalAdmins] = useState(0);
//   const [totalUniversities, setTotalUniversities] = useState(0);
//   const [recentAdmins, setRecentAdmins] = useState([]);
//   const [recentUniversities, setRecentUniversities] = useState([]);

//   // Fetch total count and recent records
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         // Fetch total number of students, teachers, admins, and universities
//         const studentSnapshot = await getDocs(collection(firestore, "Students"));
//         setTotalStudents(studentSnapshot.size);

//         const teacherSnapshot = await getDocs(collection(firestore, "Teachers"));
//         setTotalTeachers(teacherSnapshot.size);

//         const adminSnapshot = await getDocs(collection(firestore, "UniAdmins"));
//         setTotalAdmins(adminSnapshot.size);

//         const universitySnapshot = await getDocs(collection(firestore, "Universities"));
//         setTotalUniversities(universitySnapshot.size);

//         // Fetch recent admins
//         const adminDocs = adminSnapshot.docs.slice(0, 5); // Get recent 5 admins
//         setRecentAdmins(adminDocs.map(doc => ({
//           name: doc.data().name,
//           email: doc.data().email,
//           date: doc.data().createdAt?.toDate().toLocaleDateString() || "N/A"
//         })));

//         // Fetch recent universities
//         const universityDocs = universitySnapshot.docs.slice(0, 5); // Get recent 5 universities
//         setRecentUniversities(universityDocs.map(doc => ({
//           name: doc.data().name,
//           date: doc.data().createdAt?.toDate().toLocaleDateString() || "N/A"
//         })));
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   return (
//     <Layout>
//       <div className="dashboard">
//         {/* Top Cards Section */}
//         <div className="cards-container">
//           <div className="card">
//             <h3>Total Students</h3>
//             <p>{totalStudents}</p>
//             <span>🟢 Up from yesterday</span>
//           </div>
//           <div className="card">
//             <h3>Total Teachers</h3>
//             <p>{totalTeachers}</p>
//             <span>🟢 Up from yesterday</span>
//           </div>
//           <div className="card">
//             <h3>Total Admins</h3>
//             <p>{totalAdmins}</p>
//             <span>🟢 Up from yesterday</span>
//           </div>
//           <div className="card">
//             <h3>Total Universities</h3>
//             <p>{totalUniversities}</p>
//             <span>🟢 Up from yesterday</span>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="bottom-section">
//           {/* Recent Admins or Teachers Added */}
//           <div className="recent-sales">
//             <h3>Recent Admins Added</h3>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Added On</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recentAdmins.length === 0 ? (
//                   <tr>
//                     <td colSpan="3">No recent admins found.</td>
//                   </tr>
//                 ) : (
//                   recentAdmins.map((admin, index) => (
//                     <tr key={index}>
//                       <td>{admin.name}</td>
//                       <td>{admin.email}</td>
//                       <td>{admin.date}</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Recent Universities Added */}
//           <div className="top-products">
//             <h3>Recent Universities Added</h3>
//             <ul className="list">
//               {recentUniversities.length === 0 ? (
//                 <li>No recent universities found.</li>
//               ) : (
//                 recentUniversities.map((university, index) => (
//                   <li key={index} className="innerlist">
//                     <span>{university.name}</span>
//                     <span>{university.date}</span>
//                   </li>
//                 ))
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { collection, getDocs } from "firebase/firestore"; 
import { firestore } from "../../../"; 
import "./Dashboard.css";

const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalUniversities, setTotalUniversities] = useState(0);
  const [recentAdmins, setRecentAdmins] = useState([]);
  const [recentUniversities, setRecentUniversities] = useState([]);

  // Fetch total count and recent records
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch total number of students, teachers, admins, and universities
        const studentSnapshot = await getDocs(collection(firestore, "Students"));
        setTotalStudents(studentSnapshot.size);

        const teacherSnapshot = await getDocs(collection(firestore, "Teachers"));
        setTotalTeachers(teacherSnapshot.size);

        const adminSnapshot = await getDocs(collection(firestore, "UniAdmins"));
        setTotalAdmins(adminSnapshot.size);

        const universitySnapshot = await getDocs(collection(firestore, "Universities"));
        setTotalUniversities(universitySnapshot.size);

        // Fetch recent admins
        const adminDocs = adminSnapshot.docs.slice(0, 5); // Get recent 5 admins
        setRecentAdmins(adminDocs.map(doc => ({
          name: doc.data().name,
          email: doc.data().email,
          date: doc.data().createdAt?.toDate().toLocaleDateString() || "N/A"
        })));

        // Fetch recent universities
        const universityDocs = universitySnapshot.docs.slice(0, 5); // Get recent 5 universities
        setRecentUniversities(universityDocs.map(doc => ({
          name: doc.data().name,
          date: doc.data().createdAt?.toDate().toLocaleDateString() || "N/A"
        })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Layout>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="page-title">
            <h1>Dashboard Overview</h1>
            <p>Welcome back! Here's a summary of your educational platform.</p>
          </div>
        </div>
        
        {/* Stats Cards Section */}
        <div className="stats-cards">
          <div className="stat-card">
            <div className="card-icon">👨‍🎓</div>
            <div className="card-content">
              <h2 className="card-count">{totalStudents}</h2>
              <p className="card-title">Total Students</p>
              <span className="status-indicator positive">↑ Up from yesterday</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="card-icon">👨‍🏫</div>
            <div className="card-content">
              <h2 className="card-count">{totalTeachers}</h2>
              <p className="card-title">Total Teachers</p>
              <span className="status-indicator positive">↑ Up from yesterday</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="card-icon">👨‍💼</div>
            <div className="card-content">
              <h2 className="card-count">{totalAdmins}</h2>
              <p className="card-title">Total Admins</p>
              <span className="status-indicator positive">↑ Up from yesterday</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="card-icon">🏛</div>
            <div className="card-content">
              <h2 className="card-count">{totalUniversities}</h2>
              <p className="card-title">Total Universities</p>
              <span className="status-indicator positive">↑ Up from yesterday</span>
            </div>
          </div>
        </div>

        {/* Data Tables Section */}
        <div className="data-tables">
          {/* Recent Admins Table */}
          <div className="table-section">
            <div className="section-header">
              <h2>Recent Admins Added</h2>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Added On</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAdmins.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="empty-state">No recent admins found.</td>
                    </tr>
                  ) : (
                    recentAdmins.map((admin, index) => (
                      <tr key={index}>
                        <td>{admin.name}</td>
                        <td>{admin.email}</td>
                        <td>{admin.date}</td>
                        <td>
                          <div className="action-buttons">
                            <button className="edit-btn">Edit</button>
                            <button className="view-btn">View</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Universities List */}
          <div className="table-section universities-section">
            <div className="section-header">
              <h2>Recent Universities Added</h2>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="university-list-container">
              {recentUniversities.length === 0 ? (
                <div className="empty-state">No recent universities found.</div>
              ) : (
                <ul className="university-list">
                  {recentUniversities.map((university, index) => (
                    <li key={index} className="university-item">
                      <div className="university-info">
                        <div className="university-icon">🏛</div>
                        <div className="university-name">{university.name}</div>
                      </div>
                      <div className="university-date">{university.date}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;