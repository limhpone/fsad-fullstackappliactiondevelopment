const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = 'mongodb://mongodb:27017/fullstack_demo';

    await mongoose.connect(mongoURI);

    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
