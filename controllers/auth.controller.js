const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Admin = require('../models/Admin');

const signToken = (admin) => {
  return jwt.sign(
    { id: admin._id, email: admin.email, role: admin.role, sections: admin.sections },
    config.jwtSecret,
    { expiresIn: '7d' }
  );
};

exports.register = async (req, res) => {
  try {
    const existing = await Admin.countDocuments();
    if (existing > 0) {
      return res.status(403).json({ message: 'Registration closed. Contact super admin.' });
    }
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    const admin = await Admin.create({
      name,
      email,
      password,
      role: 'super-admin',
      sections: ['ca', 'abroad', 'wd'],
    });
    const token = signToken(admin);
    res.status(201).json({ token, admin: admin.toJSON() });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: 'Email already registered' });
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) return res.status(401).json({ message: 'Invalid email or password' });
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });
    const token = signToken(admin);
    res.json({ token, admin: admin.toJSON() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMe = async (req, res) => {
  const admin = await Admin.findById(req.admin.id);
  if (!admin) return res.status(404).json({ message: 'Admin not found' });
  res.json(admin.toJSON());
};

exports.listAdmins = async (req, res) => {
  const admins = await Admin.find().sort('-createdAt');
  res.json(admins.map(a => a.toJSON()));
};

exports.addAdmin = async (req, res) => {
  try {
    const { name, email, password, sections } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    const admin = await Admin.create({
      name,
      email,
      password,
      role: 'admin',
      sections: sections || ['ca'],
    });
    res.status(201).json(admin.toJSON());
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: 'Email already registered' });
    res.status(500).json({ message: err.message });
  }
};

exports.removeAdmin = async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (!admin) return res.status(404).json({ message: 'Admin not found' });
  if (admin.role === 'super-admin') {
    return res.status(403).json({ message: 'Cannot delete super admin' });
  }
  await Admin.findByIdAndDelete(req.params.id);
  res.json({ message: 'Admin removed' });
};
