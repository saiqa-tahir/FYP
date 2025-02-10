import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Recruiters.css'; // Optional for styling
import AdminNavbar from './AdminNavbar';
const Recruiters = () => {
  const [recruiters, setRecruiters] = useState([]);

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const fetchRecruiters = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/recruiters');
      setRecruiters(response.data);
    } catch (error) {
      console.error('Error fetching recruiters:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/recruiters/${id}`);
      setRecruiters((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error('Error deleting recruiter:', error);
    }
  };

  const toggleStatus = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/auth/recruiters/${id}/toggle-status`);
      fetchRecruiters(); // Refresh the list
    } catch (error) {
      console.error('Error toggling recruiter status:', error);
    }
  };

  return (
    <div>
      <AdminNavbar/>
      <div className="flex justify-center items-center mt-8">
      <h1 className="text-4xl font-bold text-gray-800 p-4">Recruiters</h1>
      </div>
      <div className="recruiters-container">
  {recruiters.map((recruiter) => (
    <div key={recruiter._id} className="recruiters-card">
      <h3>{recruiter.email}</h3>
      <p>Status: {recruiter.isAllowed ? 'Allowed' : 'Disallowed'}</p>
      <div style={{ display: 'flex' }}>
        <button onClick={() => deleteUser(recruiter._id)} style={{ marginRight: '5%' }}>Delete</button>
        <button onClick={() => toggleStatus(recruiter._id)}>
          {recruiter.isAllowed ? 'Disallow' : 'Allow'}
        </button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default Recruiters;
