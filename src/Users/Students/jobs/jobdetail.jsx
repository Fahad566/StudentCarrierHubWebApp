import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams to get the job ID from URL
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../../index';  // Adjust the import to your firebase config
import StudentLayout from '../layout/StudentLayout';
import './jobdetail.css'; // You can reuse listedjob.css or create a new one for job detail

const JobDetail = () => {
  const { jobId } = useParams(); // Get the job ID from the URL params
  const [job, setJob] = useState(null); // To store the job data
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch job details from Firebase Firestore based on jobId
  const fetchJobDetail = async () => {
    try {
      const jobDoc = doc(firestore, 'jobs', jobId);
      const jobSnapshot = await getDoc(jobDoc);
      if (jobSnapshot.exists()) {
        setJob(jobSnapshot.data());  // Set job data in state
        setLoading(false); // Set loading to false once data is fetched
      } else {
        console.error('No such job!');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching job details: ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetail(); // Fetch the job details when the component mounts
  }, [jobId]);

  if (loading) {
    return <div>Loading...</div>; // Display loading text while fetching data
  }

  return (
    <StudentLayout>
      <div className="container">
        <div className="header10">
          <h1>Job Details</h1>
        </div>
        
        {job ? (
          <div className="job-detail-card">
            <div className="job-header">
              <h2 className="job-title">{job.title}</h2>
              <p className="company-name">{job.company}</p>
            </div>

            <div className="job-body">
              <p className="job-description">{job.description}</p>
              <div className="job-meta">
                <div className="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  {job.location}
                </div>
                <div className="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  Posted {new Date(job.createdAt.seconds * 1000).toLocaleDateString()}
                </div>
                <div className="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  {job.salary}
                </div>
                <div className="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                  Deadline: {job.endDate}
                </div>
              </div>
            </div>

            <div className="skills">
              {job.skills?.map((skill, index) => (
                <span className="skill" key={index}>{skill}</span>
              ))}
            </div>

            <div className="job-footer">
              <button
                className="apply-btn1"
                onClick={() => window.open(job.applyLink, "_blank")}
              >
                Apply Now
              </button>
              <span className="status">{job.status}</span>
            </div>
          </div>
        ) : (
          <p>Job not found</p>
        )}
      </div>
    </StudentLayout>
  );
};

export default JobDetail;
