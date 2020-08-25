const router = require('express')();
const createUser = require('../controllers/auth/createUser');
const loginUser = require('../controllers/auth/loginUser');
const getCurrentUser = require('../controllers/auth/getCurrentUser');
const forgotPassword = require('../controllers/auth/forgotPassword');
const resetPassword = require('../controllers/auth/resetPassword');
const updateCurrentUserDetails = require('../controllers/auth/updateCurrentUserDetails');
const updateCurrentUserPassword = require('../controllers/auth/updateCurrentUserPassword');

// MIDDLEWARES:
const isLoggedIn = require('../middlewares/isLoggedIn');

// ROOT: /api/v1/auth

router.route('/me')
  .get(isLoggedIn, getCurrentUser)

router.route('/me/update_details')
  .put(isLoggedIn, updateCurrentUserDetails);

router.route('/me/update_password')
  .put(isLoggedIn, updateCurrentUserPassword)

router.route('/forgotPassword')
  .post(forgotPassword);

router.route('/resetPassword/:resetToken')
  .put(resetPassword);

router.route('/signup')
  .post(createUser);

router.route('/signin')
  .post(loginUser);

module.exports = router;
