const Certificate = require('../models/ComputerAcademyCertificate');

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
    const { certificateCode, ...rest } = req.body;
    if (!certificateCode || !certificateCode.trim()) {
      return res.status(400).json({ message: 'Certificate ID is required' });
    }
    const code = certificateCode.trim().toUpperCase();
    const exists = await Certificate.findOne({ certificateCode: code });
    if (exists) {
      return res.status(400).json({ message: 'Certificate ID already exists' });
    }
    const certificate = await Certificate.create({ ...rest, certificateCode: code });
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
