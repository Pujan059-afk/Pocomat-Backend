const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Admin = require('../models/Admin');
const { sendEmail } = require('../utils/email');

const otpStore = new Map();

const signToken = (admin) => {
  return jwt.sign(
    { id: admin._id, email: admin.email, role: admin.role, sections: admin.sections },
    config.jwtSecret,
    { expiresIn: '7d' }
  );
};

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) return res.status(401).json({ message: 'No admin found with this email' });

    const otp = generateOtp();
    otpStore.set(email.toLowerCase(), { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

    await sendEmail({
      to: email,
      subject: 'Pocomat Admin Login OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #16a34a;">Pocomat Admin Login</h2>
          <p>Use the following OTP to log in. It expires in 5 minutes.</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; text-align: center; padding: 16px; background: #f0fdf4; border-radius: 8px; color: #16a34a;">
            ${otp}
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 24px;">If you did not request this, please ignore this email.</p>
        </div>
      `,
    });

    res.json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error('sendOtp error:', err.message);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

    const stored = otpStore.get(email.toLowerCase());
    if (!stored) return res.status(401).json({ message: 'No OTP requested. Please request a new OTP.' });
    if (Date.now() > stored.expiresAt) {
      otpStore.delete(email.toLowerCase());
      return res.status(401).json({ message: 'OTP expired. Please request a new one.' });
    }
    if (stored.otp !== otp) return res.status(401).json({ message: 'Invalid OTP' });

    otpStore.delete(email.toLowerCase());

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) return res.status(401).json({ message: 'Admin not found' });

    const token = signToken(admin);
    res.json({ token, admin: admin.toJSON() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
