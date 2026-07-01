const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const TeamMember = require('../models/WebDevineersTeamMember');
const Service = require('../models/WebDevineersService');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => { console.error(err); process.exit(1); });

const teamData = [
  { name: 'Aayush Poudel', age: 24, role: 'Project Manager', specialization: 'Full-Stack Development', image: 'https://ui-avatars.com/api/?name=Aayush+Poudel&background=16a34a&color=fff&size=128', instagram: 'https://instagram.com/aayushpoudel', order: 1 },
  { name: 'Pujan GC', age: 22, role: 'Lead Developer', specialization: 'MERN Stack Development', image: 'https://ui-avatars.com/api/?name=Pujan+GC&background=0284c7&color=fff&size=128', instagram: 'https://instagram.com/pujangc', order: 2 },
  { name: 'Anisha Thapa', age: 23, role: 'UI/UX Designer', specialization: 'Graphic Design & UI/UX', image: 'https://ui-avatars.com/api/?name=Anisha+Thapa&background=7c3aed&color=fff&size=128', instagram: 'https://instagram.com/anishathapa', order: 3 },
  { name: 'Roshan Karki', age: 25, role: 'SEO Specialist', specialization: 'SEO & Digital Marketing', image: 'https://ui-avatars.com/api/?name=Roshan+Karki&background=dc2626&color=fff&size=128', instagram: 'https://instagram.com/roshankarki', order: 4 },
  { name: 'Sneha Adhikari', age: 21, role: 'Frontend Developer', specialization: 'React & Next.js Development', image: 'https://ui-avatars.com/api/?name=Sneha+Adhikari&background=d97706&color=fff&size=128', instagram: 'https://instagram.com/snehaadhikari', order: 5 },
  { name: 'Bibek Sharma', age: 26, role: 'Backend Developer', specialization: 'Node.js & Database Architecture', image: 'https://ui-avatars.com/api/?name=Bibek+Sharma&background=0d9488&color=fff&size=128', instagram: 'https://instagram.com/bibeksharma', order: 6 },
];

const serviceData = [
  { title: 'Website Making', description: 'Custom responsive websites built with modern frameworks — from simple business sites to dynamic web platforms.', icon: 'FiGlobe', order: 1 },
  { title: 'UI/UX Design', description: 'User-centered interface designs that blend aesthetics with functionality for seamless digital experiences.', icon: 'FiLayout', order: 2 },
  { title: 'SEO Optimization', description: 'Data-driven strategies to boost your search rankings, drive organic traffic, and grow your online presence.', icon: 'FiSearch', order: 3 },
  { title: 'Graphic Design', description: 'Stunning visual designs including branding, social media graphics, brochures, and marketing collateral.', icon: 'FiImage', order: 4 },
  { title: 'Logo Design', description: 'Unique brand identities with custom logo design, color systems, typography, and complete brand guidelines.', icon: 'FiTerminal', order: 5 },
  { title: 'Basic Web Services', description: 'Domain registration, hosting setup, maintenance, SSL certificates, and ongoing technical support.', icon: 'FiSmartphone', order: 6 },
];

async function seed() {
  try {
    await TeamMember.deleteMany({});
    await Service.deleteMany({});
    await TeamMember.insertMany(teamData);
    await Service.insertMany(serviceData);
    console.log('Seed data inserted');
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();
