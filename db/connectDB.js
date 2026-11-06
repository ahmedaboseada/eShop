// const mongoose = require('mongoose');

// // MongoDB connection URI
// const mongoURI = process.env.MONGDB_URI || 'mongodb://localhost:27017/eShop';

// // Connection function
// const connectDB = async () => {
//     try {
//         await mongoose.connect(mongoURI, {
//             // No need for deprecated options like useNewUrlParser
//         });
//         console.log('MongoDB connected successfully');
//     } catch (error) {
//         console.error('MongoDB connection error:', error.message);
//         process.exit(1); // Exit process on failure
//     }
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/eShop';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
};

module.exports = connectDB;