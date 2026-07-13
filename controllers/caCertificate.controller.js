const Certificate = require('../models/ComputerAcademyCertificate');

const generateCode = async () => {
  const year = new Date().getFullYear();
  let code;
  let exists = true;
  while (exists) {
    const rand = Math.floor(1000 + Math.random() * 9000);
    code = `PCM-${year}-${rand}`;
    exists = await Certificate.findOne({ certificateCode: code });
  }
  return code;
};

exports.getAll = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) return res.status(404).json({ message: 'Certificate not found' });
    res.json(certificate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByCode = async (req, res) => {
  try {
    const code = req.params.code.trim().toUpperCase();
    const certificate = await Certificate.findOne({ certificateCode: code });
    if (!certificate) return res.status(404).json({ message: 'Certificate not found' });
    res.json(certificate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const certificateCode = await generateCode();
    const certificate = await Certificate.create({ ...req.body, certificateCode });
    res.status(201).json(certificate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!certificate) return res.status(404).json({ message: 'Certificate not found' });
    res.json(certificate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) return res.status(404).json({ message: 'Certificate not found' });
    res.json({ message: 'Certificate deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
