const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const TeamMember = require('../models/WebDevineersTeamMember');
const Service = require('../models/WebDevineersService');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => { console.error(err); process.exit(1); });

const teamData = [
  { name: 'Manu', role: 'Designer | Office Work Manager | Content Creator | Marketing Operator', image: 'https://ui-avatars.com/api/?name=Manu&background=16a34a&color=fff&size=128', order: 1 },
  { name: 'Rakshit', role: 'Designer | Social Media Handler | Marketing Operator', image: 'https://ui-avatars.com/api/?name=Rakshit&background=0284c7&color=fff&size=128', order: 2 },
  { name: 'Damu', role: 'Designer', image: 'https://ui-avatars.com/api/?name=Damu&background=7c3aed&color=fff&size=128', order: 3 },
  { name: 'Manisha', role: 'Designer | Social Media Handler | Office Work Manager | Content Creator', image: 'https://ui-avatars.com/api/?name=Manisha&background=d97706&color=fff&size=128', order: 4 },
  { name: 'Manju', role: 'Designer | Office Work Manager', image: 'https://ui-avatars.com/api/?name=Manju&background=0d9488&color=fff&size=128', order: 5 },
  { name: 'Chadani', role: 'SEO', image: 'https://ui-avatars.com/api/?name=Chadani&background=dc2626&color=fff&size=128', order: 6 },
  { name: 'Samana', role: 'SEO', image: 'https://ui-avatars.com/api/?name=Samana&background=7c3aed&color=fff&size=128', order: 7 },
  { name: 'Yosoda', role: 'SEO', image: 'https://ui-avatars.com/api/?name=Yosoda&background=d97706&color=fff&size=128', order: 8 },
  { name: 'Aayush', role: 'Social Media Handler | Content Creator | Editor', image: 'https://ui-avatars.com/api/?name=Aayush&background=16a34a&color=fff&size=128', order: 9 },
  { name: 'Rana', role: 'Editor', image: 'https://ui-avatars.com/api/?name=Rana&background=0284c7&color=fff&size=128', order: 10 },
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
