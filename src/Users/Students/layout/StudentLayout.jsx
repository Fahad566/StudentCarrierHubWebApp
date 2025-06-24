import React, { useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './StudentLayout.css';

const StudentLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const studentName = "Alex Johnson";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="student-layout">
      <Header 
        toggleSidebar={toggleSidebar}
        studentName={studentName}
      />
      
      <div className="layout-content">
        <Sidebar isOpen={isSidebarOpen} />
        
        <main className="layout-main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;