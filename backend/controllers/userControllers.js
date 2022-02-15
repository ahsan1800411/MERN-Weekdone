const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// register a user >>> Post Request
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill all fields');
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User Already Exists');
  }

  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid User Data');
  }
});

// Login a user >>> Post Request
exports.loginUser = asyncHandler(async (req, res) => {});

// get a user >>> Get Request
exports.getMe = asyncHandler(async (req, res) => {});
