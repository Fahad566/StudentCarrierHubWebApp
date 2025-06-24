import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../../index"; // Adjust if needed
import "./TeacherProjects.css";
import TeacherLayout from "../layout/TeacherLayout";

const TeacherProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const projectRef = collection(firestore, "projects");
      const querySnapshot = await getDocs(projectRef);
      const projectData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteDoc(doc(firestore, "projects", id));
        setProjects(projects.filter((project) => project.id !== id));
        alert("Project deleted successfully.");
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete the project.");
      }
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <TeacherLayout>
      <div className="projects">
        <h1 className="title">Project Listings</h1>

        <div className="table-header">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search projects..."
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Link to="/add-project" className="add-button">
            <i className="fas fa-plus"></i> Add Project
          </Link>
        </div>

        {loading ? (
          <p>Loading projects...</p>
        ) : filteredProjects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <div className="project-list">
            {filteredProjects.map((project) => (
              <div key={project.id} className="project-card">
                <h2>
                  <i className="fas fa-folder"></i> {project.title}
                </h2>
                <p>
                  <i className="fas fa-info-circle"></i> {project.description}
                </p>
                <p>
                  <i className="fas fa-calendar-alt"></i>{" "}
                  <strong>Deadline:</strong> {project.deadline}
                </p>
                <p>
                  <i className="fas fa-dollar-sign"></i>{" "}
                  <strong>Amount:</strong> {project.amount}
                </p>

                <div className="project-actions">
                  <button
                    className="edit-button"
                    onClick={() => navigate(`/edit-project/${project.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </TeacherLayout>
  );
};

export default TeacherProjects;
