// backend/scripts/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User');
const Job = require('../models/Job');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/himflax';

const sampleJobs = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Himflax Information Technology',
    location: 'Bangalore, India',
    type: 'Full-time',
    experience: '4-6 years',
    salary: '₹18,00,000 - ₹28,00,000 / year',
    description:
      'We are looking for a Senior Full Stack Developer proficient in React.js, Node.js, and MongoDB. You will be responsible for building scalable web applications, designing RESTful APIs, mentoring junior developers, and contributing to architectural decisions. Experience with cloud platforms (AWS/GCP) and CI/CD pipelines is a plus.',
    skills: ['React.js', 'Node.js', 'MongoDB', 'TypeScript', 'AWS', 'Docker'],
    lastDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    isActive: true,
  },
  {
    title: 'UI/UX Designer',
    company: 'Himflax Information Technology',
    location: 'Hyderabad, India',
    type: 'Full-time',
    experience: '2-4 years',
    salary: '₹10,00,000 - ₹16,00,000 / year',
    description:
      'Join our design team to create beautiful, intuitive user interfaces for web and mobile applications. You will conduct user research, build wireframes and prototypes in Figma, collaborate with developers, and ensure pixel-perfect implementation. A strong portfolio is required.',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
    lastDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
  {
    title: 'DevOps Engineer',
    company: 'Himflax Information Technology',
    location: 'Remote',
    type: 'Remote',
    experience: '3-5 years',
    salary: '₹15,00,000 - ₹24,00,000 / year',
    description:
      'We need a DevOps Engineer to manage our CI/CD pipelines, cloud infrastructure on AWS, container orchestration with Kubernetes, and monitoring with Grafana/Prometheus. You will also be responsible for security hardening, cost optimization, and incident response.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'Linux'],
    lastDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
  {
    title: 'Digital Marketing Specialist',
    company: 'Himflax Information Technology',
    location: 'Delhi, India',
    type: 'Full-time',
    experience: '1-3 years',
    salary: '₹6,00,000 - ₹10,00,000 / year',
    description:
      'Drive our digital marketing strategy across SEO, SEM, social media, and email campaigns. You will manage Google Ads and Meta Ads budgets, analyze campaign performance with Google Analytics, create content calendars, and optimize conversion funnels.',
    skills: ['SEO', 'Google Ads', 'Social Media Marketing', 'Google Analytics', 'Content Strategy'],
    lastDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
  {
    title: 'React Native Developer',
    company: 'Himflax Information Technology',
    location: 'Pune, India',
    type: 'Contract',
    experience: '2-4 years',
    salary: '₹12,00,000 - ₹20,00,000 / year',
    description:
      'Build cross-platform mobile applications using React Native. You will work with our product team to deliver high-performance apps for iOS and Android. Experience with native modules, state management (Redux/Zustand), and app store deployment is required.',
    skills: ['React Native', 'JavaScript', 'Redux', 'iOS', 'Android', 'REST APIs'],
    lastDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    console.log('🗑️  Cleared existing users');

    // Create admin user
    const admin = await User.create({
      email: 'admin@himflax.com',
      password: 'Admin@123',
      role: 'admin',
    });
    console.log('👤 Admin user created');

    // Insert sample jobs
    const jobs = sampleJobs.map((job) => ({ ...job, createdBy: admin._id }));
    await Job.deleteMany({});
    await Job.insertMany(jobs);
    console.log(`📋 ${jobs.length} sample jobs inserted`);

    console.log('\n✅ Seeding complete!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin credentials:');
    console.log('  Email:    admin@himflax.com');
    console.log('  Password: Admin@123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seed();
