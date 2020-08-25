const router = require('express')();
const createUser = require('../controllers/auth/createUser');

// ROOT: /api/v1/auth

router.route('/signup')
  .post(createUser);

module.exports = router;
