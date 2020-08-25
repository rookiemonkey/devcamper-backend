const router = require('express')();
const courseRouters = require('./courses');
const reviewRouters = require('./reviews');
const getBootcamps = require('../controllers/bootcamps/getBootcamps');
const getBootcamp = require('../controllers/bootcamps/getBootcamp');
const createBootcamp = require('../controllers/bootcamps/createBootcamp');
const updateBootcamp = require('../controllers/bootcamps/updateBootcamp');
const deleteBootcamp = require('../controllers/bootcamps/deleteBootcamp');
const uploadBootcampPhoto = require('../controllers/bootcamps/uploadBootcampPhoto');
const getBootcampsWithinRadius = require('../controllers/bootcamps/getBootcampsRadius');

// MIDDLEWARES:
const isLoggedIn = require('../middlewares/isLoggedIn');
const isAuthorized = require('../middlewares/isAuthorize');
const toGetAdvancedResults = require('../middlewares/toGetAdvancedResults');
const Bootcamp = require('../models/Bootcamp');

// ROOT: /api/v1/bootcamps

// forward all prefix /:bootcampId/courses
router.use('/:bootcampId/courses', courseRouters)
router.use('/:bootcampId/reviews', reviewRouters)

router.route('/radius/:zipcode/:distance')
  .get(getBootcampsWithinRadius)

router.route('/')
  .get(toGetAdvancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(isLoggedIn, isAuthorized('user', 'publisher'), createBootcamp);

router.route('/:bootcampId/photo')
  .put(isLoggedIn, isAuthorized('user', 'publisher'), uploadBootcampPhoto);

router.route('/:bootcampId')
  .get(getBootcamp)
  .put(isLoggedIn, isAuthorized('user', 'publisher'), updateBootcamp)
  .delete(isLoggedIn, isAuthorized('user', 'publisher'), deleteBootcamp);

module.exports = router;
