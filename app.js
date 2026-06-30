const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const connectDB = require('./config/database');

const app = express();

connectDB();

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    const allowed = [
      config.clientUrl,
      'http://localhost:5173', 'http://127.0.0.1:5173',
      'http://localhost:3000', 'http://localhost:4173',
      'https://pocomat-frontend.vercel.app', 'https://www.pocomat.com', 'https://pocomat.com',
    ];
    if (!origin || allowed.includes(origin)) return callback(null, true);
    callback(null, true); // allow all in dev
  },
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    name: config.name,
    port: config.port,
    version: config.version,
    status: 'OK',
  });
});

app.use('/api/ca-courses', require('./routes/caCourse.routes'));
app.use('/api/wd-courses', require('./routes/wdCourse.routes'));
app.use('/api/ca-enrollments', require('./routes/caEnrollment.routes'));
app.use('/api/wd-enrollments', require('./routes/wdEnrollment.routes'));
app.use('/api/abroad-applications', require('./routes/abroadApplication.routes'));
app.use('/api/ca-contacts', require('./routes/caContact.routes'));
app.use('/api/wd-contacts', require('./routes/wdContact.routes'));
app.use('/api/abroad-contacts', require('./routes/abroadContact.routes'));
app.use('/api/ca-news', require('./routes/caNews.routes'));
app.use('/api/wd-news', require('./routes/wdNews.routes'));
app.use('/api/abroad-news', require('./routes/abroadNews.routes'));
app.use('/api/ca-students', require('./routes/caStudent.routes'));
app.use('/api/wd-students', require('./routes/wdStudent.routes'));
app.use('/api/ca-testimonials', require('./routes/caTestimonial.routes'));
app.use('/api/wd-testimonials', require('./routes/wdTestimonial.routes'));
app.use('/api/abroad-testimonials', require('./routes/abroadTestimonial.routes'));
app.use('/api/abroad-seat-bookings', require('./routes/abroadSeatBooking.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/ca-downloads', require('./routes/caDownload.routes'));
app.use('/api/wd-downloads', require('./routes/wdDownload.routes'));
app.use('/api/upload', require('./routes/upload.routes'));

// Error handling middleware for multer/upload errors
app.use((err, req, res, next) => {
  console.error('Error:', err.message || err);
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'File too large' });
  }
  if (err.name === 'MulterError') {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: err.message || 'Upload failed' });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
