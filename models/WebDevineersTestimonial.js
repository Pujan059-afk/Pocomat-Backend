const mongoose = require('mongoose');

const wdTestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, default: '' },
  image: { type: String, default: '' },
  rating: { type: Number, default: 5 },
  text: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('WebDevineersTestimonial', wdTestimonialSchema);
