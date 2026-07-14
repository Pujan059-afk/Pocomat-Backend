const mongoose = require('mongoose');

const caCertificateSchema = new mongoose.Schema({
  certificateCode: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  course: { type: String, required: true },
  issueDate: { type: String, default: '' },
  nepaliDate: { type: String, required: true },
  nepaliStartDate: { type: String, default: '' },
  nepaliEndDate: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  description: { type: String, default: '' },
  photoUrl: { type: String, default: '' },
  status: { type: String, default: 'Verified', enum: ['Verified', 'Revoked'] },
}, { timestamps: true });

module.exports = mongoose.model('ComputerAcademyCertificate', caCertificateSchema);
