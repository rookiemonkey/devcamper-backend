const router = require('express')();
const createUser = require('../controllers/auth/createUser');
const loginUser = require('../controllers/auth/loginUser');

// ROOT: /api/v1/auth

router.route('/signup')
  .post(createUser);

router.route('/signin')
  .post(loginUser);

module.exports = router;
