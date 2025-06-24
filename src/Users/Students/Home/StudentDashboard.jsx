import React, { useEffect, useState } from 'react';
import './StudentDashboard.css';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../../index.js';
import StudentLayout from '../layout/StudentLayout.jsx';

const StudentDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch jobs
        const jobsSnapshot = await getDocs(collection(firestore, 'jobs'));
        const jobsData = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setJobs(jobsData);

        // Fetch projects
        const projectsSnapshot = await getDocs(collection(firestore, 'projects'));
        const projectsData = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(projectsData);

        // Fetch events
        const eventsSnapshot = await getDocs(collection(firestore, 'events'));
        const eventsData = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <StudentLayout>
      <main className="main-content">
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <p className="welcome-text">Welcome back! Here's an overview of your career progress.</p>

          {/* Stats Cards */}
          <div className="stat-cards">
            <div className="stat-card">
              <div className="card-icon jobs-icon">💼</div>
              <div className="card-content">
                <h2>Total Jobs</h2>
                <p>{jobs.length}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="card-icon projects-icon">📁</div>
              <div className="card-content">
                <h2>Total Projects</h2>
                <p>{projects.length}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="card-icon events-icon">📅</div>
              <div className="card-content">
                <h2>Total Events</h2>
                <p>{events.length}</p>
              </div>
            </div>
          </div>

          {/* Jobs Section */}
          <div className="section">
  <div className="section-header">
    <h2 className="section-title">Job Opportunities</h2>
    <a href="#" className="view-all">View All</a>
  </div>

  <div className="jobs-grid">
    {jobs.length > 0 ? (
      jobs.map((job) => (
        <div key={job.id} className="job-card">
          <div className="job-header">
            <span className="company-name">{job.company}</span>
            <span className="posted-date">10 days ago</span> {/* You can make this dynamic */}
          </div>

          <h3 className="job-title">{job.title}</h3>

          <div className="job-info">
            <span>💰 {job.salary || '$50,000/year'}</span> {/* Default value if no salary */}
            <span>📄 {job.type || 'Full-time'}</span>
            <span>📍 {job.location}</span>
          </div>

          <div className="job-description">
            {job.description || "No description provided..."}
          </div>

          <div className="job-footer">
            <button className="suggest-btn">Suggest</button>
            <button className="favorite-btn">♡</button>
          </div>
        </div>
      ))
    ) : (
      <div className="table-message">No job postings found.</div>
    )}
  </div>
          </div>



          {/* Projects and Events Section */}
          <div className="two-column-layout">
            {/* Projects Column */}
            {/* Projects Section */}
<div className="section">
  <div className="section-header">
    <h2 className="section-title">Active Projects</h2>
    <a href="#" className="view-all">View All</a>
  </div>

  <div className="projects-grid">
    {projects.length > 0 ? (
      projects.map((project) => (
        <div key={project.id} className="project-card">
          <div className="project-header">
            <span className="project-name">{project.title}</span>
            <span className="due-date">{project.dueDate}</span> {/* You can make this dynamic */}
          </div>

          <h3 className="project-title">{project.title}</h3>

          <div className="project-info">
            <span>👥 {project.team || 'Team: N/A'}</span>
            <span>📍 {project.location}</span>
          </div>

          <div className="project-description">
            {project.description || "No description provided..."}
          </div>

          <div className="project-footer">
            <button className="suggest-btn">Suggest</button>
            <button className="favorite-btn">♡</button>
          </div>
        </div>
      ))
    ) : (
      <div className="table-message">No active projects found.</div>
    )}
  </div>
</div>


            {/* Events Column */}
            <div className="section responsive-table-container">
              <div className="section-header">
                <h2 className="section-title">Upcoming Events</h2>
                <a href="#" className="view-all">View All</a>
              </div>

              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>Date & Time</th>
                      <th>Location</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.length > 0 ? (
                      events.map((event) => (
                        <tr key={event.id}>
                          <td data-label="Event">{event.title}</td>
                          <td data-label="Date & Time">{`${event.date}, ${event.time}`}</td>
                          <td data-label="Location">{event.location}</td>
                          <td data-label="Type">
                            <span className={`event-type-badge ${event.type === 'Online' ? 'online' : 'in-person'}`}>
                              {event.type}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="table-message">
                          No upcoming events found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
    </StudentLayout>
//     <div className="app">
//       <Header />
//       <div className="container">
//         <Sidebar />
//         <main className="main-content">
//           <h1 className="dashboard-title">Dashboard Overview</h1>
//           <p className="welcome-text">Welcome back! Here's an overview of your career progress.</p>

//           {/* Stats Cards */}
//           <div className="stat-cards">
//             <div className="stat-card">
//               <div className="card-icon jobs-icon">💼</div>
//               <div className="card-content">
//                 <h2>Total Jobs</h2>
//                 <p>{jobs.length}</p>
//               </div>
//             </div>

//             <div className="stat-card">
//               <div className="card-icon projects-icon">📁</div>
//               <div className="card-content">
//                 <h2>Total Projects</h2>
//                 <p>{projects.length}</p>
//               </div>
//             </div>

//             <div className="stat-card">
//               <div className="card-icon events-icon">📅</div>
//               <div className="card-content">
//                 <h2>Total Events</h2>
//                 <p>{events.length}</p>
//               </div>
//             </div>
//           </div>

//           {/* Jobs Section */}
//           <div className="section">
//   <div className="section-header">
//     <h2 className="section-title">Job Opportunities</h2>
//     <a href="#" className="view-all">View All</a>
//   </div>

//   <div className="jobs-grid">
//     {jobs.length > 0 ? (
//       jobs.map((job) => (
//         <div key={job.id} className="job-card">
//           <div className="job-header">
//             <span className="company-name">{job.company}</span>
//             <span className="posted-date">10 days ago</span> {/* You can make this dynamic */}
//           </div>

//           <h3 className="job-title">{job.title}</h3>

//           <div className="job-info">
//             <span>💰 {job.salary || '$50,000/year'}</span> {/* Default value if no salary */}
//             <span>📄 {job.type || 'Full-time'}</span>
//             <span>📍 {job.location}</span>
//           </div>

//           <div className="job-description">
//             {job.description || "No description provided..."}
//           </div>

//           <div className="job-footer">
//             <button className="suggest-btn">Suggest</button>
//             <button className="favorite-btn">♡</button>
//           </div>
//         </div>
//       ))
//     ) : (
//       <div className="table-message">No job postings found.</div>
//     )}
//   </div>
//           </div>



//           {/* Projects and Events Section */}
//           <div className="two-column-layout">
//             {/* Projects Column */}
//             {/* Projects Section */}
// <div className="section">
//   <div className="section-header">
//     <h2 className="section-title">Active Projects</h2>
//     <a href="#" className="view-all">View All</a>
//   </div>

//   <div className="projects-grid">
//     {projects.length > 0 ? (
//       projects.map((project) => (
//         <div key={project.id} className="project-card">
//           <div className="project-header">
//             <span className="project-name">{project.title}</span>
//             <span className="due-date">{project.dueDate}</span> {/* You can make this dynamic */}
//           </div>

//           <h3 className="project-title">{project.title}</h3>

//           <div className="project-info">
//             <span>👥 {project.team || 'Team: N/A'}</span>
//             <span>📍 {project.location}</span>
//           </div>

//           <div className="project-description">
//             {project.description || "No description provided..."}
//           </div>

//           <div className="project-footer">
//             <button className="suggest-btn">Suggest</button>
//             <button className="favorite-btn">♡</button>
//           </div>
//         </div>
//       ))
//     ) : (
//       <div className="table-message">No active projects found.</div>
//     )}
//   </div>
// </div>


//             {/* Events Column */}
//             <div className="section responsive-table-container">
//               <div className="section-header">
//                 <h2 className="section-title">Upcoming Events</h2>
//                 <a href="#" className="view-all">View All</a>
//               </div>

//               <div className="table-responsive">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>Event</th>
//                       <th>Date & Time</th>
//                       <th>Location</th>
//                       <th>Type</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {events.length > 0 ? (
//                       events.map((event) => (
//                         <tr key={event.id}>
//                           <td data-label="Event">{event.title}</td>
//                           <td data-label="Date & Time">{`${event.date}, ${event.time}`}</td>
//                           <td data-label="Location">{event.location}</td>
//                           <td data-label="Type">
//                             <span className={`event-type-badge ${event.type === 'Online' ? 'online' : 'in-person'}`}>
//                               {event.type}
//                             </span>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="4" className="table-message">
//                           No upcoming events found.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>

//         </main>
//       </div>
//     </div>
  );
};

export default StudentDashboard;
