import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null); // For modal popup

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch job posts.');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div>{error}</div>;

  // Close Modal
  const closeModal = () => {
    setSelectedJob(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white shadow-lg rounded-lg border border-gray-200 p-6 flex flex-col justify-between h-80"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600 font-semibold">
                    {job.companyName}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  Posted on {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {job.jobTitle}
              </h2>

              <p className="text-sm text-gray-600 mb-4">{job.location}</p>

              <div className="flex space-x-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-700">
                  {job.jobType}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-700">
                  ${job.salary} Per Year
                </span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-3 mb-6">
                {job.description}
              </p>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 inline-flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md">
                Quick Apply
              </button>
              <button
                className="flex-1 inline-flex justify-center items-center bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-md"
                onClick={() => setSelectedJob(job)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedJob && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100">
    <div className="bg-white mt-12 overflow-y-auto rounded-lg shadow-lg max-w-xl w-full p-6" style={{ maxHeight: '80vh' }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{selectedJob.jobTitle}</h2>
        <button
          className="text-gray-500 hover:text-gray-800"
          onClick={closeModal}
        >
          ✕
        </button>
      </div>
      <p>
        <strong>Company:</strong> {selectedJob.companyName}
      </p>
      <p>
        <strong>Location:</strong> {selectedJob.location}
      </p>
      <p>
        <strong>Job Type:</strong> {selectedJob.jobType}
      </p>
      <p>
        <strong>Salary:</strong> ${selectedJob.salary} Per Year
      </p>
      <hr className='mt-4'></hr>
      <p className="mt-4">
        <strong>Description:</strong> <br />{selectedJob.description}
      </p>
      <p className="mt-2">
        <strong>Project Details:</strong> <br />{selectedJob.projectDetails}
      </p>
      <p className="mt-2">
        <strong>Skills Required:</strong> <br />{selectedJob.skillsRequired}
      </p>
      <div className="mt-6 flex justify-end">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default Jobs;
