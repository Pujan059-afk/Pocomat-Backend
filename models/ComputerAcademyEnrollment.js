const mongoose = require('mongoose');

const caEnrollmentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  qualification: { type: String, required: true },
  course: { type: String, required: true },
  preferredTime: { type: String, required: true },
  guardianName: { type: String, default: '' },
  notes: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('ComputerAcademyEnrollment', caEnrollmentSchema);
