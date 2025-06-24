import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { firestore } from "../../../index";
import "./ListedJobs.css"; // Adjust the path to your CSS file
import TeacherLayout from "../layout/TeacherLayout";

const ListedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsRef = collection(firestore, "jobs");
        const querySnapshot = await getDocs(jobsRef);
        const now = new Date();

        const updatedJobs = await Promise.all(
          querySnapshot.docs.map(async (docSnap) => {
            const data = docSnap.data();
            const endDate = new Date(data.endDate);
            const status = endDate < now ? "draft" : data.status || "active";

            // Auto-update expired job status to 'draft'
            if (data.status !== "draft" && endDate < now) {
              await updateDoc(doc(firestore, "jobs", docSnap.id), {
                status: "draft",
              });
            }

            return {
              id: docSnap.id,
              ...data,
              status,
            };
          })
        );

        setJobs(updatedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      await updateDoc(doc(firestore, "jobs", jobId), {
        status: newStatus,
      });

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId ? { ...job, status: newStatus } : job
        )
      );
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <TeacherLayout>
      <div className="jobs">
        <h1>All Job Listings</h1>

        <div className="table-header">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search jobs..."
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Link to="/add-job" className="add-button">
            <i className="fas fa-plus"></i> Add Job
          </Link>
        </div>

        {loading ? (
          <p>Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <div className="job-list">
            {filteredJobs.map((job) => (
              <div key={job.id} className="job-card">
                <h2>{job.title}</h2>
                <p>{job.description}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Type:</strong> {job.jobType}</p>
                <p><strong>Apply by:</strong> {new Date(job.endDate).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {job.status}</p>

                <div className="job-actions">
                  <button className="edit-button">Edit</button>
                  <button className="delete-button">Delete</button>

                  {/* Status Dropdown */}
                  <select
                    className="status-dropdown"
                    value={job.status}
                    onChange={(e) => handleStatusChange(job.id, e.target.value)}
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </TeacherLayout>
  );
};

export default ListedJobs;
