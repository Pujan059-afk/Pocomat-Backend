require('dotenv').config();

const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/pocomat',
  jwtSecret: process.env.JWT_SECRET || 'fallback_secret',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || 'dv6ozbosf',
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || '',
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || 'ijOZru4zIumHbvOJzsK3jo2bOYs',
  emailUser: process.env.EMAIL_USER || '',
  sendgridApiKey: process.env.SENDGRID_API_KEY || '',
  name: 'Pocomat API',
  version: '1.0.0',
};

module.exports = config;
