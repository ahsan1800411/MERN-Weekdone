const asyncHandler = require('express-async-handler');
const Goal = require('../models/Goal');

// Get all the Goal >> Get Request
exports.getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

// create a goal >>> Post Request
exports.createGoal = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw new Error('Please add all the text Fields');
  }
  const goal = await Goal.create({ text });

  res.status(201).json(goal);
});

// Updata a goal >>> Put Request
exports.updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
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

  await goal.remove();
  res.status(200).json({ id: req.params.id });
});
