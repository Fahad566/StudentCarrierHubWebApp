import React from "react";
import TeacherHeader from "../Header/TeacherHeader";
import TeacherSidebar from "../Sidebar/TeacherSidebar";
import "./TeacherLayout.css";

const TeacherLayout = ({ children }) => {
  return (
    <div className="teacher-layout">
      <TeacherHeader />
      <div className="teacher-layout-content">
        <TeacherSidebar />
        <div className="main-content">{children}</div>
      </div>
    </div>
  );
};

export default TeacherLayout;
