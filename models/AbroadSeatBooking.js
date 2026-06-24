const mongoose = require('mongoose');

const abroadSeatBookingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  location: { type: String, default: '' },
  preferredBatch: { type: String, default: 'Morning' },
  course: { type: String, required: true },
  type: { type: String, enum: ['language', 'test-prep'], required: true },
  message: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('AbroadSeatBooking', abroadSeatBookingSchema);
