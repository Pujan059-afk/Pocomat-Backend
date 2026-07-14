const mongoose = require('mongoose');

const wdEnrollmentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  qualification: { type: String, required: true },
  course: { type: String, required: true },
  preferredTime: { type: String, required: true },
  guardianName: { type: String, default: '' },
  notes: { type: String, default: '' },
  status: { type: String, default: 'pending', enum: ['pending', 'accepted', 'rejected'] },
  rejectedAt: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('WebDevineersEnrollment', wdEnrollmentSchema);
