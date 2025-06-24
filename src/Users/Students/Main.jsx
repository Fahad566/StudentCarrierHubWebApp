// App.jsx
import React from 'react';
import './Main.css';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import StudentDashboard from './Home/studentdashboard';

function Main() {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <Sidebar />
        <StudentDashboard />
      </div>
    </div>
  );
}

export default Main;