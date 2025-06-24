import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';  // Import useLocation for current path
import './Sidebar.css';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const location = useLocation(); // Get the current location/path

  const navItems = [
    { id: 'Dashboard', icon: '📊', label: 'Dashboard', path: '/student-dashboard' },
    { id: 'JobBoard', icon: '💼', label: 'Job Board', path: '/Student-listed-jobs' },
    { id: 'AIResumeChecker', icon: '🤖', label: 'AI Resume Checker', path: '/resume-checker' },
    { id: 'Profile', icon: '👤', label: 'Profile', path: '/student-settings' },
  ];

  // Update active item based on the current path (only if the item is different)
  useEffect(() => {
    const currentPath = location.pathname;
    const currentNavItem = navItems.find(item => currentPath.includes(item.path));
    if (currentNavItem) {
      setActiveItem(currentNavItem.id);
    }
  }, [location.pathname]); // Run this effect when the location changes

  return (
    <aside className="sidebar">
      {navItems.map((item) => (
        <Link
          key={item.id}
          to={item.path}  // Change href to 'to' for routing
          className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
          onClick={() => {
            if (activeItem !== item.id) {
              setActiveItem(item.id);  // Set active tab only if it’s not the current one
            }
          }}
        >
          <div className="nav-icon">{item.icon}</div>
          <span>{item.label}</span>
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
