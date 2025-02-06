import React from "react";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="sidebar">
      <div className="heading2">
        <h2>Main Admin Panel</h2>
      </div>
      <hr className="divider"/>
      <ul className="sidebar-menu">
        <li className={location.pathname === "/dashboard" ? "active" : ""}>
          <Link to="/dashboard">
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>
        </li>
        <li className={location.pathname === "/universities" ? "active" : ""}>
          <Link to="/universities">
            <i className="fas fa-university"></i> Universities
          </Link>
        </li>
        <li className={location.pathname === "/Uniadmin" ? "active" : ""}>
          <Link to="/Uniadmin">
            <i className="fas fa-user-shield"></i> UniAdmin
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

