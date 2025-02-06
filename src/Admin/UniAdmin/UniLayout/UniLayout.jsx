import React from "react";
import UniHeader from "../UniHeader/UniHeader";
import UniSidebar from "../UniSidebar/UniSidebar";
import "./UniLayout.css";

const UniLayout = ({ children }) => {
  return (
    <div className="uni-layout">
      <UniHeader />
      <div className="uni-layout-content">
        <UniSidebar />
        <div className="main-content">{children}</div>
      </div>
    </div>
  );
};

export default UniLayout;
