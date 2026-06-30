require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const mongoose = require('mongoose');
const config = require('./config/config');
const Admin = require('./models/Admin');

const seed = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    const existing = await Admin.findOne({ email: 'pocomatweb@gmail.com' });
    if (existing) {
      console.log('Super admin already exists');
      process.exit(0);
    }
    await Admin.create({
      name: 'Pujan Subedi',
      email: 'pocomatweb@gmail.com',
      password: 'admin123',
      role: 'super-admin',
      sections: ['ca', 'abroad', 'wd'],
    });
    console.log('Super admin created successfully');
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};

seed();
