const router = require('express')();
const createUser = require('../controllers/users/createUser');
const deleteUser = require('../controllers/users/deleteUser');
const getUser = require('../controllers/users/getUser');
const getUsers = require('../controllers/users/getUsers');
const updateUser = require('../controllers/users/updateUser');

// MIDDLEWARES:
const isLoggedIn = require('../middlewares/isLoggedIn');
const isAuthorized = require('../middlewares/isAuthorize');
const toGetAdvancedResults = require('../middlewares/toGetAdvancedResults');
const User = require('../models/User');

router.use(isLoggedIn);
router.use(isAuthorized('admin'));

// ROOT: /api/v1/users

router.route('/')
  .get(toGetAdvancedResults(User), getUsers)
  .post(createUser);

router.route('/:userId')
  .get(getUser)
  .delete(deleteUser)
  .put(updateUser);

module.exports = router;
