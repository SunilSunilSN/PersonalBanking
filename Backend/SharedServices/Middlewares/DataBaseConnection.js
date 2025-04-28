const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.DB_NAME, // optional if not included in URI
    });
    console.log(`✅ Connected to MongoDB: ${process.env.DB_NAME}`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit process if DB connection fails
  }
};

module.exports = connectDB