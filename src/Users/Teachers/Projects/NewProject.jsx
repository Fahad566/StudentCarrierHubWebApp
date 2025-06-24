import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../../index"; // Adjust the path to your firebase setup
import "./NewProject.css";
import TeacherLayout from "../layout/TeacherLayout";

const NewProject = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState({
    title: "",
    description: "",
    amount: "",
    location: "",
    projectType: "Web Development",
    deadline: "",
    applyLink: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const requiredFields = [
      "title",
      "description",
      "amount",
      "location",
      "deadline",
      "applyLink",
    ];
    for (let field of requiredFields) {
      if (!project[field]) {
        alert(`Please fill out the ${field} field.`);
        return;
      }
    }

    setLoading(true);

    try {
      // Add to Firestore
      const projectRef = collection(firestore, "projects");
      await addDoc(projectRef, {
        ...project,
        createdAt: new Date(),
        status: "Active", // Default status
      });

      alert("Project successfully added!");
      navigate("/projects");
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Something went wrong while adding the project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TeacherLayout>
      <div className="add-project-container">
        <h1 className="title">Add a New Project</h1>
        <form className="project-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Project Title:</label>
            <input
              type="text"
              name="title"
              placeholder="Enter project title"
              value={project.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              placeholder="Enter project description"
              value={project.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              placeholder="Enter project budget"
              value={project.amount}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              placeholder="Enter project location"
              value={project.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Project Type:</label>
            <select
              name="projectType"
              value={project.projectType}
              onChange={handleChange}
            >
              <option value="Web Development">Web Development</option>
              <option value="Mobile App">Mobile App</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Blockchain">Blockchain</option>
            </select>
          </div>

          <div className="form-group">
            <label>Project Deadline:</label>
            <input
              type="date"
              name="deadline"
              value={project.deadline}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Apply Link:</label>
            <input
              type="url"
              name="applyLink"
              placeholder="Enter application URL"
              value={project.applyLink}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Post Project"}
          </button>
        </form>
      </div>
    </TeacherLayout>
  );
};

export default NewProject;
