const router = require('express')();
const createUser = require('../controllers/auth/createUser');
const loginUser = require('../controllers/auth/loginUser');
const getCurrentUser = require('../controllers/auth/getCurrentUser');

// MIDDLEWARES:
const isLoggedIn = require('../middlewares/isLoggedIn');

// ROOT: /api/v1/auth

router.route('/me')
  .get(isLoggedIn, getCurrentUser);

router.route('/signup')
  .post(createUser);

router.route('/signin')
  .post(loginUser);

module.exports = router;
