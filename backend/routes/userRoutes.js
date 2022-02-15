const router = require('express').Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(protect, getMe);

module.exports = router;
