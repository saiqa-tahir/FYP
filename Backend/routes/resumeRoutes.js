const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

router.post('/create', resumeController.createResume);
router.get('/', resumeController.getResumes);
router.get('/:id', resumeController.getResumeById);
router.get('/generate-pdf/:id', resumeController.generateResumePDF);

module.exports = router;
