const mongoose = require('mongoose');
const Room = require('./models/Room');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGO_URI;

const seedRooms = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB for seeding.');

    // Clear existing rooms (optional)
    await Room.deleteMany({});
    console.log('🧹 Existing rooms deleted.');

    // Create new rooms
    const rooms = [
      { name: 'India 🇮🇳', description: 'Explore Indian culture and traditions.' },
      { name: 'Japan 🇯🇵', description: 'Experience the beauty of Japanese lifestyle.' },
      { name: 'Global Foodies 🍱', description: 'Share recipes and food culture from around the world.' },
      { name: 'Music & Dance 🎶', description: 'Exchange musical and dance traditions globally.' },
      { name: 'Festivals Around the World 🎉', description: 'Discover global festivals and celebrations.' },
    ];

    await Room.insertMany(rooms);
    console.log('🌟 Dummy rooms inserted successfully.');

    process.exit(0); // Success
  } catch (error) {
    console.error('❌ Error seeding rooms:', error);
    process.exit(1); // Failure
  }
};

// Run the seeder
seedRooms();
