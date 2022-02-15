const router = require('express').Router();
const {
  getGoals,
  createGoal,
  deleteGoal,
  updateGoal,
} = require('../controllers/goalControllers');

router.route('/').get(getGoals).post(createGoal);
router.route('/:id').put(updateGoal).delete(deleteGoal);

module.exports = router;
