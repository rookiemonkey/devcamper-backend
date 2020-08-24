const router = require('express')();
const courseRouters = require('./courses');
const getBootcamps = require('../controllers/bootcamps/getBootcamps');
const getBootcamp = require('../controllers/bootcamps/getBootcamp');
const createBootcamp = require('../controllers/bootcamps/createBootcamp');
const updateBootcamp = require('../controllers/bootcamps/updateBootcamp');
const deleteBootcamp = require('../controllers/bootcamps/deleteBootcamp');
const getBootcampsWithinRadius = require('../controllers/bootcamps/getBootcampsRadius');

// ROOT: /api/v1/bootcamps

// forward all prefix /:bootcampId/courses => course router as root
router.use('/:bootcampId/courses', courseRouters)

router.route('/radius/:zipcode/:distance')
  .get(getBootcampsWithinRadius)

router.route('/')
  .get(getBootcamps)
  .post(createBootcamp);

router.route('/:bootcampId')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
