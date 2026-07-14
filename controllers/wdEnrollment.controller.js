const WDEnrollment = require('../models/WebDevineersEnrollment');
const WDStudent = require('../models/WebDevineersStudent');

exports.getAll = async (req, res) => {
  try {
    const filter = req.query.course ? { course: req.query.course } : {};
    const enrollments = await WDEnrollment.find(filter).sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const enrollment = await WDEnrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
    res.json(enrollment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const enrollment = await WDEnrollment.create(req.body);
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const enrollment = await WDEnrollment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
    res.json(enrollment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const enrollment = await WDEnrollment.findByIdAndDelete(req.params.id);
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
    res.json({ message: 'Enrollment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.accept = async (req, res) => {
  try {
    const enrollment = await WDEnrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });

    const student = await WDStudent.create({
      name: enrollment.fullName,
      program: enrollment.course,
      verified: true,
    });

    enrollment.status = 'accepted';
    await enrollment.save();

    res.json({ enrollment, student });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.reject = async (req, res) => {
  try {
    const enrollment = await WDEnrollment.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected', rejectedAt: new Date() },
      { new: true }
    );
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
    res.json(enrollment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
