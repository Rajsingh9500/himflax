const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Banner = require('../models/Banner');
const Occasion = require('../models/Occasion');

dotenv.config({ path: './.env' });

const banners = [
  {
    title: 'Future of Technology Starts Here.',
    subtitle: 'Himflax empowers businesses with cutting-edge IT solutions, from custom software to digital transformation. We don\'t just build technology; we build your future.',
    badgeText: 'Modern IT Excellence',
    ctaText: 'Get Started',
    ctaLink: '/contact',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    overlayTheme: 'dark',
    isActive: true,
    order: 1,
  },
  {
    title: 'Transform Your Digital Landscape.',
    subtitle: 'Leverage our expertise in cloud architecture, AI, and enterprise software to scale your business securely and efficiently.',
    badgeText: 'Cloud Solutions',
    ctaText: 'Explore Services',
    ctaLink: '/services',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    overlayTheme: 'blue',
    isActive: true,
    order: 2,
  }
];

const occasions = [
  {
    name: 'Diwali 2024',
    emoji: '🪔',
    title: 'Happy Diwali!',
    message: 'Wishing you a festival of lights filled with joy and prosperity. Check out our special holiday offers.',
    ctaText: 'View Offers',
    ctaLink: '/services',
    ctaColor: '#f97316', // orange-500
    isLive: true,
  }
];

async function seedFeatures() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Banner.deleteMany();
    await Occasion.deleteMany();

    await Banner.insertMany(banners);
    await Occasion.insertMany(occasions);

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedFeatures();
