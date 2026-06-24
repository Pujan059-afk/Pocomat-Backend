const WDDownload = require('../models/WebDevineersDownload');

exports.getAll = async (req, res) => {
  try {
    const downloads = await WDDownload.find().sort({ createdAt: -1 });
    res.json(downloads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const download = await WDDownload.findById(req.params.id);
    if (!download) return res.status(404).json({ message: 'Download not found' });
    res.json(download);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const download = await WDDownload.create(req.body);
    res.status(201).json(download);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const download = await WDDownload.findByIdAndUpdate(req.params.id, req.body, {
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
    const download = await WDDownload.findByIdAndDelete(req.params.id);
    if (!download) return res.status(404).json({ message: 'Download not found' });
    res.json({ message: 'Download deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
