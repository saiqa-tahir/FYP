import React from 'react';
import SeekerNavbar from './SeekerNavbar';
import Jobs from './Jobs';

const JobSeekerDashboard = () => {
  return (
    <div>
      
      <SeekerNavbar />
      <div className="flex justify-center items-center mt-8">
        <h1 className="text-4xl font-bold text-gray-800">Jobs</h1>
      </div>
      <Jobs />
    </div>
  );
};

export default JobSeekerDashboard;
