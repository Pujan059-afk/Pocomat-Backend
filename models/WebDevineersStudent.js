const mongoose = require('mongoose');

const wdStudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: String, default: '' },
  symbolNo: { type: String, required: true },
  registrationNo: { type: String, default: '' },
  program: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  verified: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('WebDevineersStudent', wdStudentSchema);
