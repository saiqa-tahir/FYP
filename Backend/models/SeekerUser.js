// Model/SeekerUser.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const jobseekerUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAllowed: {
    type: Boolean,
    default: true, // Allowed by default
  },
});


// Hash password before saving the user
jobseekerUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  // Hash password
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords during login
jobseekerUserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('jobseekerUser', jobseekerUserSchema);
