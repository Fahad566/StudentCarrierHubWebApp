
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Admin/MainAdmin/dashboard/dashboard";
import Signup from "./Auth/Signup/Signup";
import Login from "./Auth/login/Login";
import Universities from "./Admin/MainAdmin/Universities/universities";
import UniAdmin from "./Admin/MainAdmin/UniAdmin/Uniadmin";
import UniversityForm from "./Admin/MainAdmin/Universities/UniversityForm";
import AdminForm from "./Admin/MainAdmin/UniAdmin/AdminForm";
import Unidashboard from "./Admin/UniAdmin/Unidashboard/Unidashboard";
import Students from "./Admin/UniAdmin/Students/Students";
import TeacherForm from "./Admin/UniAdmin/Teachers/TeacherForm";
import Teachers from "./Admin/UniAdmin/Teachers/Teachers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/uniadmin" element={<UniAdmin />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/add-university" element={<UniversityForm />} />
        <Route path="/admin-form" element={<AdminForm />} />
        <Route path="/uniadmin-dashboard" element={<Unidashboard />} />
        <Route path="/teacher" element={<Teachers />} />
        <Route path="/add-teacher" element={<TeacherForm />} />
        <Route path="/student" element={<Students />} />

      </Routes>
    </Router>
  );
}
export default App;
