const mongoose = require('mongoose');

const wdServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  icon: { type: String, default: 'FiGlobe' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('WebDevineersService', wdServiceSchema);
