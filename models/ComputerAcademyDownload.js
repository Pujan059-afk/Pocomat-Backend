const mongoose = require('mongoose');

const caDownloadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  link: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('ComputerAcademyDownload', caDownloadSchema);
