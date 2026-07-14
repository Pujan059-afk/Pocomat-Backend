const CAEnrollment = require('../models/ComputerAcademyEnrollment');
const CAStudent = require('../models/ComputerAcademyStudent');

exports.getAll = async (req, res) => {
  try {
    const filter = req.query.course ? { course: req.query.course } : {};
    const enrollments = await CAEnrollment.find(filter).sort({ createdAt: -1 });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const enrollment = await CAEnrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
    res.json(enrollment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const enrollment = await CAEnrollment.create(req.body);
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const enrollment = await CAEnrollment.findByIdAndUpdate(req.params.id, req.body, {
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
    const enrollment = await CAEnrollment.findByIdAndDelete(req.params.id);
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
    res.json({ message: 'Enrollment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.accept = async (req, res) => {
  try {
    const enrollment = await CAEnrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });

    const student = await CAStudent.create({
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
    const enrollment = await CAEnrollment.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
    res.json(enrollment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
