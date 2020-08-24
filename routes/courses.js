const router = require('express').Router({ mergeParams: true });
const getCourses = require('../controllers/courses/getCourses');
const getCourse = require('../controllers/courses/getCourse');

// ROOT: /api/v1/courses

router.route('/')
  .get(getCourses)

router.route('/:courseId')
  .get(getCourse)

module.exports = router;
