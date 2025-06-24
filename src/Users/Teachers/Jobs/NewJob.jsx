import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../../index"; // Adjust path if needed
import { collection, addDoc } from "firebase/firestore";
import "./NewJob.css";
import TeacherLayout from "../layout/TeacherLayout";

const NewJob = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    jobType: "Full-Time",
    endDate: "",
    applyLink: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const requiredFields = [
      "title",
      "description",
      "salary",
      "location",
      "endDate",
      "applyLink",
    ];

    for (let field of requiredFields) {
      if (!job[field]) {
        alert(`Please fill out the ${field} field.`);
        return;
      }
    }

    setLoading(true);

    try {
      const jobCollectionRef = collection(firestore, "jobs");
      await addDoc(jobCollectionRef, {
        ...job,
        createdAt: new Date(),
      });

      alert("Job successfully added!");
      navigate("/listed-jobs");
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Something went wrong while adding the job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TeacherLayout>
      <div className="add-job-container">
        <h1 className="title">Add a New Job</h1>
        <form className="job-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job Title:</label>
            <input
              type="text"
              name="title"
              placeholder="Enter job title"
              value={job.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              placeholder="Enter job description"
              value={job.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Salary:</label>
            <input
              type="number"
              name="salary"
              placeholder="Enter salary"
              value={job.salary}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              placeholder="Enter job location"
              value={job.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Job Type:</label>
            <select name="jobType" value={job.jobType} onChange={handleChange}>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="form-group">
            <label>Job End Date:</label>
            <input
              type="date"
              name="endDate"
              value={job.endDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Apply Link:</label>
            <input
              type="url"
              name="applyLink"
              placeholder="Enter application URL"
              value={job.applyLink}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Post Job"}
          </button>
        </form>
      </div>
    </TeacherLayout>
  );
};

export default NewJob;
