import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../../index"; // Adjust path if needed
import Layout from "../UniLayout/UniLayout";
import "./Unidashboard.css"; // Adjust path if needed

const Unidasboard = () => {
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [recentCompanies, setRecentCompanies] = useState([]);
  const [recentTeachers, setRecentTeachers] = useState([]);
  const [university, setUniversity] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get university from localStorage
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        if (!userDetails?.university) {
          console.error("University not found in localStorage.");
          return;
        }
        setUniversity(userDetails.university);

        // Query based on university
        const companyQuery = query(collection(firestore, "Companies"), where("university", "==", userDetails.university));
        const teacherQuery = query(collection(firestore, "Teachers"), where("university", "==", userDetails.university));
        const studentQuery = query(collection(firestore, "students"), where("university", "==", userDetails.university));

        const [companySnapshot, teacherSnapshot, studentSnapshot] = await Promise.all([
          getDocs(companyQuery),
          getDocs(teacherQuery),
          getDocs(studentQuery),
        ]);

        // Set totals
        setTotalCompanies(companySnapshot.size);
        setTotalTeachers(teacherSnapshot.size);
        setTotalStudents(studentSnapshot.size);

        // Set recent companies (limit to 5)
        const recentCompanies = companySnapshot.docs
          .sort((a, b) => b.data().createdAt?.seconds - a.data().createdAt?.seconds)
          .slice(0, 5)
          .map(doc => ({
            name: doc.data().companyName,
            date: doc.data().createdAt?.toDate().toLocaleDateString() || "N/A",
          }));
        setRecentCompanies(recentCompanies);

        // Set recent teachers (limit to 5)
        const recentTeachers = teacherSnapshot.docs
          .sort((a, b) => b.data().createdAt?.seconds - a.data().createdAt?.seconds)
          .slice(0, 5)
          .map(doc => ({
            name: doc.data().name,
            email: doc.data().email,
            date: doc.data().createdAt?.toDate().toLocaleDateString() || "N/A",
          }));
        setRecentTeachers(recentTeachers);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Layout>
      <div className="unidasboard-container">
        <div className="dashboard-header">
          <div className="page-title">
            <h1>UnidasBoard Overview</h1>
            <p>Welcome back, here's an overview of your educational platform!</p>
          </div>
        </div>

        {/* Stats Cards Section */}
        <div className="stats-cards">
          <div className="stat-card">
            <div className="card-icon">🏢</div>
            <div className="card-content">
              <h2 className="card-count">{totalCompanies}</h2>
              <p className="card-title">Total Companies</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="card-icon">👨‍🏫</div>
            <div className="card-content">
              <h2 className="card-count">{totalTeachers}</h2>
              <p className="card-title">Total Teachers</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="card-icon">👨‍🎓</div>
            <div className="card-content">
              <h2 className="card-count">{totalStudents}</h2>
              <p className="card-title">Total Students</p>
            </div>
          </div>
        </div>

        {/* Data Tables Section */}
        <div className="data-tables">
          {/* Recent Companies Table */}
          <div className="table-section">
            <div className="section-header">
              <h2>Recent Companies Added</h2>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Added On</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCompanies.length === 0 ? (
                    <tr>
                      <td colSpan="2" className="empty-state">No recent companies found.</td>
                    </tr>
                  ) : (
                    recentCompanies.map((company, index) => (
                      <tr key={index}>
                        <td>{company.name}</td>
                        <td>{company.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Teachers Table */}
          <div className="table-section">
            <div className="section-header">
              <h2>Recent Teachers Added</h2>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Added On</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTeachers.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="empty-state">No recent teachers found.</td>
                    </tr>
                  ) : (
                    recentTeachers.map((teacher, index) => (
                      <tr key={index}>
                        <td>{teacher.name}</td>
                        <td>{teacher.email}</td>
                        <td>{teacher.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Unidasboard;
