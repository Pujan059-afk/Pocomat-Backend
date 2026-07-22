const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const TeamMember = require('../models/WebDevineersTeamMember');
const Service = require('../models/WebDevineersService');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => { console.error(err); process.exit(1); });

const teamData = [
  { name: 'Manu', role: 'Designer', order: 1 },
  { name: 'Rakshit', role: 'Designer', order: 2 },
  { name: 'Damu', role: 'Designer', order: 3 },
  { name: 'Manisha', role: 'Designer', order: 4 },
  { name: 'Manju', role: 'Designer', order: 5 },
  { name: 'Chadani', role: 'SEO', order: 6 },
  { name: 'Samana', role: 'SEO', order: 7 },
  { name: 'Yosoda', role: 'SEO', order: 8 },
  { name: 'Rakshit', role: 'Social Media Handler', order: 9 },
  { name: 'Aayush', role: 'Social Media Handler', order: 10 },
  { name: 'Manisha', role: 'Social Media Handler', order: 11 },
  { name: 'Manju', role: 'Office Work', order: 12 },
  { name: 'Manu', role: 'Office Work', order: 13 },
  { name: 'Manisha', role: 'Office Work', order: 14 },
  { name: 'Aayush', role: 'Content Creator', order: 15 },
  { name: 'Manisha', role: 'Content Creator', order: 16 },
  { name: 'Manu', role: 'Content Creator', order: 17 },
  { name: 'Aayush', role: 'Editor', order: 18 },
  { name: 'Rana', role: 'Editor', order: 19 },
  { name: 'Rakshit', role: 'Marketing Operator', order: 20 },
  { name: 'Manu', role: 'Marketing Operator', order: 21 },
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
