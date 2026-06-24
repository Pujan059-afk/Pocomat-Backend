const mongoose = require('mongoose');

const caCourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: String, default: '' },
  duration: { type: String, default: '' },
  certification: { type: String, default: '' },
  overview: { type: String, default: '' },
  highlights: [String],
  curriculum: [{ step: String, title: String }],
  image: { type: String, default: '' },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  students: { type: String, default: '0' },
}, { timestamps: true });

module.exports = mongoose.model('ComputerAcademyCourse', caCourseSchema);
