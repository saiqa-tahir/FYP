import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Jobseekers.css';
import AdminNavbar from './AdminNavbar';
const Jobseekers = () => {
  const [jobseekers, setJobseekers] = useState([]);

  useEffect(() => {
    fetchJobseekers();
  }, []);

  const fetchJobseekers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/jobseekers');
      setJobseekers(response.data);
    } catch (error) {
      console.error('Error fetching jobseekers:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/jobseekers/${id}`);
      setJobseekers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const toggleStatus = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/auth/jobseekers/${id}/toggle-status`);
      fetchJobseekers(); // Refresh the list
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  return (
    <div>
      <AdminNavbar/>
      <div className="flex justify-center items-center mt-8">
  <h1 className="text-4xl font-bold text-gray-800 p-4">JobSeeker</h1>
</div>

      <div className="jobseekers-container">
  {jobseekers.map((jobseeker) => (
    <div key={jobseeker._id} className="jobseeker-card">
      <h3>{jobseeker.email}</h3>
      <p>Status: {jobseeker.isAllowed ? 'Allowed' : 'Disallowed'}</p>
  <div style={{display:'flex'}}>  <button onClick={() => deleteUser(jobseeker._id)} style={{marginRight:'5%'}}>Delete</button>
      <button onClick={() => toggleStatus(jobseeker._id)} >
        {jobseeker.isAllowed ? 'Disallow' : 'Allow'}
      </button></div>
    
    </div>
  ))}
</div>

    </div>
  );
};

export default Jobseekers;
