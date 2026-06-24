const mongoose = require('mongoose');
const Download = require('./models/Download');

const downloads = [
  { name: 'Photoshop', description: 'Photo editing & design software', link: 'https://www.adobe.com/products/photoshop.html', brand: 'computer-academy' },
  { name: 'MS PowerPoint', description: 'Presentation software for office use', link: 'https://www.microsoft.com/en-us/microsoft-365/powerpoint', brand: 'computer-academy' },
  { name: 'Sublime Text', description: 'Lightweight code editor', link: 'https://www.sublimetext.com/download', brand: 'computer-academy' },
  { name: 'XAMPP', description: 'Local server for PHP & MySQL', link: 'https://www.apachefriends.org/download.html', brand: 'computer-academy' },
  { name: 'Typeshala', description: 'Nepali typing tutor software', link: 'https://typeshala.com/download', brand: 'computer-academy' },
  { name: 'Antivirus', description: 'System protection software', link: 'https://www.avg.com/', brand: 'computer-academy' },
  { name: 'DaVinci Resolve', description: 'Professional video editing software', link: 'https://www.blackmagicdesign.com/products/davinciresolve', brand: 'computer-academy' },
  { name: 'Adobe Illustrator', description: 'Vector graphics & design software', link: 'https://www.adobe.com/products/illustrator.html', brand: 'computer-academy' },
  { name: 'VS Code', description: 'Powerful source code editor', link: 'https://code.visualstudio.com/download', brand: 'computer-academy' },
];

async function seed() {
  try {
    await mongoose.connect('mongodb://localhost:27017/pocomat');
    await Download.deleteMany({ brand: 'computer-academy' });
    await Download.insertMany(downloads);
    console.log('Seeded 9 downloads successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();
