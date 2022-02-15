const router = require('express').Router();
const {
  getGoals,
  createGoal,
  deleteGoal,
  updateGoal,
} = require('../controllers/goalControllers');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(protect, getGoals).post(protect, createGoal);
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
