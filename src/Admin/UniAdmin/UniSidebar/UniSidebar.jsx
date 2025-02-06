import React from "react";
import "./UniSidebar.css";
import { Link, useLocation } from "react-router-dom";

const UniSidebar = () => {
  const location = useLocation();
  
  return (
    <div className="sidebar">
      <div className="heading2">
        <h2>Uni Admin Panel</h2>
      </div>
      <hr className="divider"/>
      <ul className="sidebar-menu">
        <li className={location.pathname === "/uniadmin-dashboard" ? "active" : ""}>
          <Link to="/uniadmin-dashboard">
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>
        </li>
        <li className={location.pathname === "/companies" ? "active" : ""}>
          <Link to="/companies">
        <i className="fas fa-building"></i> Companies
          </Link>
        </li>
        <li className={location.pathname === "/teacher" ? "active" : ""}>
          <Link to="/teacher">
            <i className="fas fa-chalkboard-teacher"></i> Teachers
          </Link>
        </li>
        <li className={location.pathname === "/student" ? "active" : ""}>
          <Link to="/student">
            <i className="fas fa-user-graduate"></i> Students
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UniSidebar;
