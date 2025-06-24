import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Admin Routes
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
import Companies from "./Admin/UniAdmin/Companies/companies";
import CompaniesForm from "./Admin/UniAdmin/Companies/CompaniesForm";
import TeacherDashboard from "./Users/Teachers/Home/TeacherDashboard";
import ListedJobs from "./Users/Teachers/Jobs/ListedJobs";
import TeacherEvents from "./Users/Teachers/Events/TeacherEvents";
import TeacherProjects from "./Users/Teachers/Projects/TeacherProjects";
import NewJob from "./Users/Teachers/Jobs/NewJob";
import NewProject from "./Users/Teachers/Projects/NewProject";
import NewEvent from "./Users/Teachers/Events/NewEvent";

// Student Routes
import StudentDashboard from "./Users/Students/Home/studentdashboard";
import StudentListedjob from "./Users/Students/jobs/StudentListedjob";
import ResumeChecker from "./Users/Students/Resume checker/ResumeChecker";
import JobDetail from "./Users/Students/jobs/jobdetail";  // Import the JobDetail component

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/uniadmin" element={<UniAdmin />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/add-university" element={<UniversityForm />} />
        <Route path="/admin-form" element={<AdminForm />} />
        <Route path="/uniadmin-dashboard" element={<Unidashboard />} />
        <Route path="/teacher" element={<Teachers />} />
        <Route path="/add-teacher" element={<TeacherForm />} />
        <Route path="/student" element={<Students />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/add-company" element={<CompaniesForm />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/listed-jobs" element={<ListedJobs />} />
        <Route path="/events" element={<TeacherEvents />} />
        <Route path="/new-events" element={<NewEvent />} />
        <Route path="/projects" element={<TeacherProjects />} />
        <Route path="/add-job" element={<NewJob />} />
        <Route path="/add-project" element={<NewProject />} />
        
        {/* Student Portal Routes */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-listed-jobs" element={<StudentListedjob />} />
        <Route path="/job/:jobId" element={<JobDetail />} /> {/* Job Detail Page Route */}
        <Route path="/resume-checker" element={<ResumeChecker />} />
      </Routes>
    </Router>
  );
}

export default App;
