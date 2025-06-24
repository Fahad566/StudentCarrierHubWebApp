import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../../index';  // Adjust the import to your firebase config
import StudentLayout from '../layout/StudentLayout';
import './StudentListedjob.css';

const StudentListedjob = () => {
  const [jobs, setJobs] = useState([]); // To store fetched jobs
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const navigate = useNavigate();

  // Fetch jobs from Firebase Firestore
  const fetchJobs = async () => {
    try {
      // Fetch documents from the 'jobs' collection
      const querySnapshot = await getDocs(collection(firestore, 'jobs'));
      const jobList = [];
      
      // Iterate through documents and collect job data
      querySnapshot.forEach((doc) => {
        const jobData = { id: doc.id, ...doc.data() };
        // Only add job if its status is not 'draft'
        if (jobData.status !== 'draft') {
          jobList.push(jobData);
        }
      });
      
      // Set jobs in state
      setJobs(jobList);
      setFilteredJobs(jobList); // Initially, show all jobs
    } catch (error) {
      console.error('Error fetching jobs: ', error);
    }
  };

  useEffect(() => {
    fetchJobs(); // Fetch jobs when the component mounts
  }, []);

  // Handle search and filtering
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = jobs.filter(job => 
      job.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
      job.company?.toLowerCase().includes(e.target.value.toLowerCase()) ||
      job.location?.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  // Handle job application
  const handleApply = (applyLink) => {
    window.open(applyLink, "_blank");
  };

  return (
    <StudentLayout>
      <div className="container">
        <div className="header10">
          <h1>Featured Opportunities</h1>
          
          {/* Search Bar */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search jobs by title, company, or location"
            className="search-bar"
          />
        </div>
        
        <div className="job-listings">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div className="job-card" key={job.id}>
                <div className="job-header">
                  <div>
                    {/* Link the job title to the job detail page */}
                    <Link to={`/job/${job.id}`} className="job-title-link">
                      <h2 className="job-title">{job.title}</h2>
                    </Link>
                    <p className="company-name">{job.company}</p>
                  </div>
                  <span className={`job-type ${job.jobType.toLowerCase().replace('-', '')}`}>
                    {job.jobType}
                  </span>
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
                
                <div className="job-footer">
                  <button
                    className="apply-btn"
                    onClick={() => handleApply(job.applyLink)}
                  >
                    Apply Now
                  </button>
                  <span className="status">{job.status}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No jobs found matching your search criteria.</p>
          )}
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentListedjob;
