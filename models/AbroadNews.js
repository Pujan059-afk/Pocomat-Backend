const mongoose = require('mongoose');

const abroadNewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, default: '' },
  tag: { type: String, default: 'General' },
  image: { type: String, default: '' },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('AbroadNews', abroadNewsSchema);
