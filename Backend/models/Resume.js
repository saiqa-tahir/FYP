const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
  },
  education: {
    institution: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    graduationYear: {
      type: String,
      required: true,
    },
  },
  skills: {
    type: String,
    required: true,
  },
  experience: [
    {
      companyName: {
        type: String,
        required: true,
      },
      jobTitle: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
        required: true,
      },
    },
  ],
  certifications: {
    type: String,
  },
  hobbies: {
    type: String,
  },
});

module.exports = mongoose.model('Resume', resumeSchema);
