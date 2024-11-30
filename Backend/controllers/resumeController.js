const Resume = require('../models/Resume');
const PDFDocument = require('pdfkit'); 
// Create a new resume
exports.createResume = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      linkedin,
      education,
      skills,
      experience,
      certifications,
      hobbies,
    } = req.body;

    const newResume = new Resume({
      fullName,
      email,
      phoneNumber,
      linkedin,
      education,
      skills,
      experience,
      certifications,
      hobbies,
    });

    await newResume.save();
    res.status(201).json({ message: 'Resume created successfully', resume: newResume });
  } catch (error) {
    res.status(500).json({ message: 'Error creating resume', error: error.message });
  }
};

// Get all resumes
exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resumes', error: error.message });
  }
};


exports.generateResumePDF = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const doc = new PDFDocument();
    const filename = `${resume.fullName.replace(/\s+/g, '_')}_Resume.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=${filename}`);

    // Generate PDF content
    doc.text(`Name: ${resume.fullName}`, { align: 'left' });
    doc.text(`Email: ${resume.email}`, { align: 'left' });
    doc.text(`Phone: ${resume.phoneNumber}`, { align: 'left' });
    doc.text(`Education: ${resume.education.degree} from ${resume.education.institution} (${resume.education.graduationYear})`, { align: 'left' });
    doc.text(`Skills: ${resume.skills}`, { align: 'left' });
    doc.text(`Certifications: ${resume.certifications}`, { align: 'left' });
    doc.text(`Hobbies: ${resume.hobbies}`, { align: 'left' });

    resume.experience.forEach((exp, index) => {
      doc.text(`Experience ${index + 1}:`, { align: 'left', underline: true });
      doc.text(`- ${exp.jobTitle} at ${exp.companyName} (${exp.duration})`, { align: 'left' });
    });

    doc.end();
    doc.pipe(res);
  } catch (error) {
    res.status(500).json({ message: 'Error generating PDF', error: error.message });
  }
};



exports.getResumeById = async (req, res) => {
    try {
      const { id } = req.params;
      const resume = await Resume.findById(id);
      if (!resume) {
        return res.status(404).json({ message: 'Resume not found' });
      }
      res.status(200).json(resume);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching resume', error: error.message });
    }
  };
  