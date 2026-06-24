const mongoose = require('mongoose');

const abroadContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  age: { type: String, default: '' },
  subject: { type: String, default: 'Abroad Study Inquiry' },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('AbroadContact', abroadContactSchema);
