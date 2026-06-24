const mongoose = require('mongoose');

const abroadTestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, default: '' },
  image: { type: String, default: '' },
  rating: { type: Number, default: 5 },
  text: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('AbroadTestimonial', abroadTestimonialSchema);
