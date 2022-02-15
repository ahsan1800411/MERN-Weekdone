const router = require('express').Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userControllers');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(getMe);

module.exports = router;
