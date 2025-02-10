const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/SeekerAuthRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const jobPostRoutes = require('./routes/jobPostRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// MongoDB connection
mongoose.connect('mongodb+srv://Zohaib:Zohaib@cluster0.v7oju4g.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/resumes', resumeRoutes);
app.use('/api/jobs', jobPostRoutes);
// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
