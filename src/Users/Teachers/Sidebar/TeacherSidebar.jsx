import React from "react";
import "./TeacherSidebar.css";
import { Link, useLocation } from "react-router-dom";

const TeacherSidebar = () => {
  const location = useLocation();
  
  return (
    <div className="sidebar">
      <div className="heading2">
        <h2>Teacher Panel</h2>
      </div>
      <hr className="divider"/>
      <ul className="sidebar-menu">
        <li className={location.pathname === "/teacher-dashboard" ? "active" : ""}>
          <Link to="/teacher-dashboard">
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>
        </li>
        <li className={location.pathname === "/listed-jobs" ? "active" : ""}>
          <Link to="/listed-jobs">
            <i className="fas fa-briefcase"></i> Jobs
          </Link>
        </li>
        <li className={location.pathname === "/events" ? "active" : ""}>
          <Link to="/events">
            <i className="fas fa-calendar-alt"></i> Events
          </Link>
        </li>
        <li className={location.pathname === "/projects" ? "active" : ""}>
          <Link to="/projects">
            <i className="fas fa-project-diagram"></i> Projects
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TeacherSidebar;