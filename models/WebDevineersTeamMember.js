const mongoose = require('mongoose');

const wdTeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  specialization: { type: String, default: '' },
  image: { type: String, default: '' },
  instagram: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('WebDevineersTeamMember', wdTeamMemberSchema);
