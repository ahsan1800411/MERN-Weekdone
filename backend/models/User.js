const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add the required fields'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please add the required fields'],
    },
    password: {
      type: String,
      required: [true, 'Please add the required fields'],
    },
  },
  { timestamps: true }
);

// Encrypting a password before registering a user

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', userSchema);
