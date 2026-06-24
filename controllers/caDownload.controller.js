const CADownload = require('../models/ComputerAcademyDownload');

exports.getAll = async (req, res) => {
  try {
    const downloads = await CADownload.find().sort({ createdAt: -1 });
    res.json(downloads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const download = await CADownload.findById(req.params.id);
    if (!download) return res.status(404).json({ message: 'Download not found' });
    res.json(download);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const download = await CADownload.create(req.body);
    res.status(201).json(download);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const download = await CADownload.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!download) return res.status(404).json({ message: 'Download not found' });
    res.json(download);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const download = await CADownload.findByIdAndDelete(req.params.id);
    if (!download) return res.status(404).json({ message: 'Download not found' });
    res.json({ message: 'Download deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
