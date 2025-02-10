const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const { getAllJobseekers, deleteJobseeker, toggleJobseekerStatus } = require('../controllers/JobseekerController');
router.post('/create', resumeController.createResume);
router.get('/', resumeController.getResumes);
router.get('/:id', resumeController.getResumeById);
router.get('/generate-pdf/:id', resumeController.generateResumePDF);
router.get('/download/:email', resumeController.generateResumePDF); // Change route to use email


// Manage jobseekers
router.get('/jobseekers', getAllJobseekers);
router.delete('/jobseekers/:id', deleteJobseeker);
router.put('/jobseekers/:id/toggle-status', toggleJobseekerStatus);
module.exports = router;
