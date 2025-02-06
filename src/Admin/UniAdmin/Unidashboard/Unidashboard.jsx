import React, { useState, useEffect } from "react";
import Layout from "../UniLayout/UniLayout";
import { collection, getDocs } from "firebase/firestore"; // Import Firestore methods
import { firestore } from "../../.."; // Import your Firestore configuration
import "./Unidashboard.css";

const Unidashboard = () => {
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

        // Fetch recent admins (limit to 5)
        const adminDocs = adminSnapshot.docs.slice(0, 5); // Get recent 5 admins
        setRecentAdmins(adminDocs.map(doc => ({
          name: doc.data().name,
          email: doc.data().email,
          date: doc.data().createdAt?.toDate().toLocaleDateString() || "N/A"
        })));

        // Fetch recent universities (limit to 5)
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
      <div className="dashboard">
        {/* Top Cards Section */}
        <div className="cards-container">
          <div className="card">
            <h3>Total Students</h3>
            <p>{totalStudents}</p>
            <span>🟢 Up from yesterday</span>
          </div>
          <div className="card">
            <h3>Total Teachers</h3>
            <p>{totalTeachers}</p>
            <span>🟢 Up from yesterday</span>
          </div>
          <div className="card">
            <h3>Total Admins</h3>
            <p>{totalAdmins}</p>
            <span>🟢 Up from yesterday</span>
          </div>
          <div className="card">
            <h3>Total Universities</h3>
            <p>{totalUniversities}</p>
            <span>🟢 Up from yesterday</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bottom-section">
          {/* Recent Admins or Teachers Added */}
          <div className="recent-admins">
            <h3>Recent Admins Added</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Added On</th>
                </tr>
              </thead>
              <tbody>
                {recentAdmins.length === 0 ? (
                  <tr>
                    <td colSpan="3">No recent admins found.</td>
                  </tr>
                ) : (
                  recentAdmins.map((admin, index) => (
                    <tr key={index}>
                      <td>{admin.name}</td>
                      <td>{admin.email}</td>
                      <td>{admin.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Recent Universities Added */}
          <div className="recent-universities">
            <h3>Recent Universities Added</h3>
            <ul className="list">
              {recentUniversities.length === 0 ? (
                <li>No recent universities found.</li>
              ) : (
                recentUniversities.map((university, index) => (
                  <li key={index} className="innerlist">
                    <span>{university.name}</span>
                    <span>{university.date}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Unidashboard;
