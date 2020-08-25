const router = require('express').Router({ mergeParams: true });
const createCourse = require('../controllers/courses/createCourse');
const updateCourse = require('../controllers/courses/updateCourse');
const deleteCourse = require('../controllers/courses/deleteCourse');
const getCourses = require('../controllers/courses/getCourses');
const getCourse = require('../controllers/courses/getCourse');

// MIDDLEWARES:
const toGetAdvancedResults = require('../middlewares/toGetAdvancedResults');
const Course = require('../models/Course');

// ROOT: /api/v1/courses

router.route('/')

  // ROOT: /:bootcampId/courses && /api/v1/courses
  .get(toGetAdvancedResults(Course, { path: 'bootcamp', select: 'name description' }), getCourses)

  // ROOT: /:bootcampId/courses
  .post(createCourse);

router.route('/:courseId')
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
