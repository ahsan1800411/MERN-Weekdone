const asyncHandler = require('express-async-handler');

exports.getGoals = asyncHandler(async (req, res) => {});

exports.createGoal = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw new Error('Please add all the text Fields');
  }
});

exports.updateGoal = asyncHandler(async (req, res) => {});

exports.deleteGoal = asyncHandler(async (req, res) => {});
