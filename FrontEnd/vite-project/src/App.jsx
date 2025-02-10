import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecruiterAndJobSeeker from './Components/MainPage/RecruiterAndJobSeeker';
import SeekerSignup from './Components/Jobseeker/SeekerSignup';
import SeekerLogin from './Components/Jobseeker/SeekerLogin';
import RecruiterSignup from './Components/Recruiter/RecruiterSignup';
import RecruiterLogin from './Components/Recruiter/RecruiterLogin';
import JobSeekerDashboard from './Components/Jobseeker/JobSeekerDashboard';
import RecruiterDashboard from './Components/Recruiter/RecruiterDashboard';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminDashboard from './Components/Admin/AdminDashboard';
import Jobseekers from './Components/Admin/Jobseekers';
import Recruiters from './Components/Admin/Recruiters';
import './App.css'
function App() {
  return (
    <>
   <Router>    
      <Routes>
      <Route path="/" element={<RecruiterAndJobSeeker/>} />
      <Route path="/admin-login" element={<AdminLogin/>} />
      <Route path="/jobseeker-login" element={<SeekerLogin/>} />
      <Route path="/jobseeker-signup" element={<SeekerSignup/>} />
      <Route path="/recruiter-login" element={<RecruiterLogin/>} />
      <Route path="/recruiter-signup" element={<RecruiterSignup/>} />
      <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/jobseeker-dashboard" element={<JobSeekerDashboard/>} />
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard/>} />
        <Route path="/jobseekers" element={<Jobseekers/>} />
        <Route path="/recruiters" element={<Recruiters/>} />
      </Routes>
    </Router>
    </>
  
     
  )
}

export default App
