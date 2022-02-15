const asyncHandler = require('express-async-handler');
const Goal = require('../models/Goal');
const User = require('../models/User');

// Get all the Goal >> Get Request
exports.getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// create a goal >>> Post Request
exports.createGoal = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw new Error('Please add all the text Fields');
  }
  const goal = await Goal.create({ text, user: req.user.id });

  res.status(201).json(goal);
});

// Updata a goal >>> Put Request
exports.updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not Authorized');
  }

  const goalUpdated = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json(goalUpdated);
});
// delete the goal >>> Delete Request
exports.deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (goal.user.toString() !== user._id) {
    res.status(401);
    throw new Error('User not Authorized');
  }

  await goal.remove();
  res.status(200).json({ id: req.params.id });
});
