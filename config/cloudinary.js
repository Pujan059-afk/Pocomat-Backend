const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const config = require('./config');

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folderMap = {
      'computer-academy': 'Pocomat Computer Academy',
      'web-devineers': 'Pocomat Web Devineers',
      'abroad-study': 'Pocomat Abroad Study',
    };
    const brand = req.body.brand || 'computer-academy';
    const folder = folderMap[brand] || 'Pocomat Computer Academy';
    return {
      folder,
      resource_type: file.mimetype === 'application/pdf' ? 'raw' : 'image',
      public_id: `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, '')}`,
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf'],
    };
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, storage, upload };
