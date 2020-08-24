const router = require('express')();
const getCourses = require('../controllers/courses/getCourses');
const createCourse = require('../controllers/courses/createCourse');
const getBootcamps = require('../controllers/bootcamps/getBootcamps');
const getBootcamp = require('../controllers/bootcamps/getBootcamp');
const createBootcamp = require('../controllers/bootcamps/createBootcamp');
const updateBootcamp = require('../controllers/bootcamps/updateBootcamp');
const deleteBootcamp = require('../controllers/bootcamps/deleteBootcamp');
const getBootcampsWithinRadius = require('../controllers/bootcamps/getBootcampsRadius');

// ROOT: /api/v1/bootcamps

router.route('/radius/:zipcode/:distance')
  .get(getBootcampsWithinRadius)

router.route('/')
  .get(getBootcamps)
  .post(createBootcamp);

router.route('/:bootcampId/courses')
  .get(getCourses)
  .post(createCourse);

router.route('/:bootcampId')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
