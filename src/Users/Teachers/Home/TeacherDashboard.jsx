import React, { useState, useEffect } from "react";
import TeacherLayout from "../layout/TeacherLayout";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../..";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0); // <-- ADD this
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [recentJobs, setRecentJobs] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const studentSnapshot = await getDocs(collection(firestore, "students"));
        setTotalStudents(studentSnapshot.size);

        const jobsSnapshot = await getDocs(collection(firestore, "jobs"));
        setTotalJobs(jobsSnapshot.size);

        const eventsSnapshot = await getDocs(collection(firestore, "events"));
        setTotalEvents(eventsSnapshot.size);

        const projectsSnapshot = await getDocs(collection(firestore, "projects"));
        setTotalProjects(projectsSnapshot.size);

        const jobDocs = jobsSnapshot.docs.slice(0, 5); // Only get 5 recent jobs
        setRecentJobs(
          jobDocs.map((doc) => ({
            title: doc.data().title,
            company: doc.data().company,
            postedOn: doc.data().createdAt?.toDate().toLocaleDateString() || "N/A",
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const cardData = [,
    { title: "Total Jobs", count: totalJobs, icon: "💼" },
    { title: "Total Events", count: totalEvents, icon: "📅" },
    { title: "Total Projects", count: totalProjects, icon: "📂" }
  ];

  return (
    <TeacherLayout>
      <div className="dashboard-container">
        <div className="page-title">
          <h1>Dashboard Overview</h1>
          <p>Welcome back! Here's an overview of your data.</p>
        </div>

        <div className="stats-cards">
          {cardData.map((card, index) => (
            <div className="card" key={index}>
              <div className="card-icon">{card.icon}</div>
              <div className="card-content">
                <h2 className="card-count">{card.count}</h2>
                <p className="card-title">{card.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="table-section">
          <div className="section-header">
            <h2>Recent Job Postings</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="table-container">
            <table className="jobs-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Posted On</th>
                </tr>
              </thead>
              <tbody>
                {recentJobs.length === 0 ? (
                  <tr>
                    <td colSpan="3">No recent jobs found.</td>
                  </tr>
                ) : (
                  recentJobs.map((job, index) => (
                    <tr key={index}>
                      <td>{job.title}</td>
                      <td>{job.company}</td>
                      <td>{job.postedOn}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherDashboard;
