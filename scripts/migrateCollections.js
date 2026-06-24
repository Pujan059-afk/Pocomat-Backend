const mongoose = require('mongoose');
const config = require('../config/config');

const Contact = require('../models/Contact');
const News = require('../models/News');
const Testimonial = require('../models/Testimonial');
const SeatBooking = require('../models/SeatBooking');

const CAContact = require('../models/ComputerAcademyContact');
const CANews = require('../models/ComputerAcademyNews');
const CATestimonial = require('../models/ComputerAcademyTestimonial');
const WDContact = require('../models/WebDevineersContact');
const WDNews = require('../models/WebDevineersNews');
const WDTestimonial = require('../models/WebDevineersTestimonial');
const AbroadContact = require('../models/AbroadContact');
const AbroadNews = require('../models/AbroadNews');
const AbroadTestimonial = require('../models/AbroadTestimonial');
const AbroadSeatBooking = require('../models/AbroadSeatBooking');

async function migrate() {
  await mongoose.connect(config.mongoUri);
  console.log('Connected to MongoDB\n');

  const db = mongoose.connection.db;

  // ── MIGRATE contacts ──
  const contacts = await Contact.find({});
  console.log(`contacts: ${contacts.length} documents`);
  if (contacts.length) {
    const ca = contacts.filter(c => c.brand === 'computer-academy').map(c => ({ name: c.name, email: c.email, phone: c.phone, subject: c.subject, message: c.message, read: c.read, createdAt: c.createdAt, updatedAt: c.updatedAt }));
    const wd = contacts.filter(c => c.brand === 'web-devineers').map(c => ({ name: c.name, email: c.email, phone: c.phone, subject: c.subject, message: c.message, read: c.read, createdAt: c.createdAt, updatedAt: c.updatedAt }));
    const as = contacts.filter(c => c.brand === 'abroad-study').map(c => ({ name: c.name, email: c.email, phone: c.phone, subject: c.subject, message: c.message, read: c.read, createdAt: c.createdAt, updatedAt: c.updatedAt }));
    if (ca.length) { await CAContact.insertMany(ca); console.log(`  → ${ca.length} to computeracademycontacts`); }
    if (wd.length) { await WDContact.insertMany(wd); console.log(`  → ${wd.length} to webdevineerscontacts`); }
    if (as.length) { await AbroadContact.insertMany(as); console.log(`  → ${as.length} to abroadcontacts`); }
  }
  await db.dropCollection('contacts').catch(() => {});
  console.log('  → dropped contacts\n');

  // ── MIGRATE news ──
  const news = await News.find({});
  console.log(`news: ${news.length} documents`);
  if (news.length) {
    const ca = news.filter(n => n.brand === 'computer-academy').map(n => ({ title: n.title, description: n.description, content: n.content, tag: n.tag, image: n.image, date: n.date, createdAt: n.createdAt, updatedAt: n.updatedAt }));
    const wd = news.filter(n => n.brand === 'web-devineers').map(n => ({ title: n.title, description: n.description, content: n.content, tag: n.tag, image: n.image, date: n.date, createdAt: n.createdAt, updatedAt: n.updatedAt }));
    const as = news.filter(n => n.brand === 'abroad-study').map(n => ({ title: n.title, description: n.description, content: n.content, tag: n.tag, image: n.image, date: n.date, createdAt: n.createdAt, updatedAt: n.updatedAt }));
    if (ca.length) { await CANews.insertMany(ca); console.log(`  → ${ca.length} to computeracademynews`); }
    if (wd.length) { await WDNews.insertMany(wd); console.log(`  → ${wd.length} to webdevineersnews`); }
    if (as.length) { await AbroadNews.insertMany(as); console.log(`  → ${as.length} to abroadnews`); }
  }
  await db.dropCollection('news').catch(() => {});
  console.log('  → dropped news\n');

  // ── MIGRATE testimonials ──
  const testimonials = await Testimonial.find({});
  console.log(`testimonials: ${testimonials.length} documents`);
  if (testimonials.length) {
    const ca = testimonials.filter(t => t.brand === 'computer-academy').map(t => ({ name: t.name, title: t.title, company: t.company, image: t.image, rating: t.rating, text: t.text, createdAt: t.createdAt, updatedAt: t.updatedAt }));
    const wd = testimonials.filter(t => t.brand === 'web-devineers').map(t => ({ name: t.name, title: t.title, company: t.company, image: t.image, rating: t.rating, text: t.text, createdAt: t.createdAt, updatedAt: t.updatedAt }));
    const as = testimonials.filter(t => t.brand === 'abroad-study').map(t => ({ name: t.name, title: t.title, company: t.company, image: t.image, rating: t.rating, text: t.text, createdAt: t.createdAt, updatedAt: t.updatedAt }));
    if (ca.length) { await CATestimonial.insertMany(ca); console.log(`  → ${ca.length} to computeracademytestimonials`); }
    if (wd.length) { await WDTestimonial.insertMany(wd); console.log(`  → ${wd.length} to webdevineerstestimonials`); }
    if (as.length) { await AbroadTestimonial.insertMany(as); console.log(`  → ${as.length} to abroadtestimonials`); }
  }
  await db.dropCollection('testimonials').catch(() => {});
  console.log('  → dropped testimonials\n');

  // ── MIGRATE seatbookings ──
  const bookings = await SeatBooking.find({});
  console.log(`seatbookings: ${bookings.length} documents`);
  if (bookings.length) {
    await AbroadSeatBooking.insertMany(bookings.map(b => ({
      fullName: b.fullName, phone: b.phone, email: b.email, location: b.location,
      preferredBatch: b.preferredBatch, course: b.course, type: b.type, message: b.message,
      createdAt: b.createdAt, updatedAt: b.updatedAt,
    })));
    console.log(`  → ${bookings.length} to abroadseatbookings`);
  }
  await db.dropCollection('seatbookings').catch(() => {});
  console.log('  → dropped seatbookings\n');

  console.log('Migration complete. Old collections dropped: contacts, news, testimonials, seatbookings');
  console.log('Kept: downloads, enrollments, courses, students');
  await mongoose.disconnect();
}

migrate().catch(err => { console.error(err); process.exit(1); });
