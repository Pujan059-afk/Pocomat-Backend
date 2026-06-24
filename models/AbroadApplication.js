const mongoose = require('mongoose');

const abroadApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  qualification: { type: String, required: true },
  gpa: { type: String, default: '' },
  completionYear: { type: String, default: '' },
  destination: { type: String, default: '' },
  intake: { type: String, default: '' },
  englishTest: { type: String, default: '' },
  testType: { type: String, default: '' },
  score: { type: String, default: '' },
  agreeToContact: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('AbroadApplication', abroadApplicationSchema);
