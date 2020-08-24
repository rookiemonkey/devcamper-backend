const router = require('express').Router({ mergeParams: true });
const getCourses = require('../controllers/courses/getCourses');

// ROOT: /api/v1/courses

router.route('/')
  .get(getCourses)

module.exports = router;
