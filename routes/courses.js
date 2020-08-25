const router = require('express').Router({ mergeParams: true });
const createCourse = require('../controllers/courses/createCourse');
const updateCourse = require('../controllers/courses/updateCourse');
const getCourses = require('../controllers/courses/getCourses');
const getCourse = require('../controllers/courses/getCourse');

// ROOT: /api/v1/courses

router.route('/')
  .get(getCourses)      // ROOT: /:bootcampId/courses && /api/v1/courses
  .post(createCourse);  // ROOT: /:bootcampId/courses

router.route('/:courseId')
  .get(getCourse)
  .put(updateCourse)

module.exports = router;
