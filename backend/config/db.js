const mongoose = require('mongoose');

exports.connectDatabase = async (url) => {
  try {
    await mongoose.connect(url);
    console.log('Database connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
