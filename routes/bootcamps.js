const router = require('express')();
const courseRouters = require('./courses');
const getBootcamps = require('../controllers/bootcamps/getBootcamps');
const getBootcamp = require('../controllers/bootcamps/getBootcamp');
const createBootcamp = require('../controllers/bootcamps/createBootcamp');
const updateBootcamp = require('../controllers/bootcamps/updateBootcamp');
const deleteBootcamp = require('../controllers/bootcamps/deleteBootcamp');
const uploadBootcampPhoto = require('../controllers/bootcamps/uploadBootcampPhoto');
const getBootcampsWithinRadius = require('../controllers/bootcamps/getBootcampsRadius');

// MIDDLEWARES:
const isLoggedIn = require('../middlewares/isLoggedIn');
const toGetAdvancedResults = require('../middlewares/toGetAdvancedResults');
const Bootcamp = require('../models/Bootcamp');

// ROOT: /api/v1/bootcamps

// forward all prefix /:bootcampId/courses => course router as root
router.use('/:bootcampId/courses', courseRouters)

router.route('/radius/:zipcode/:distance')
  .get(getBootcampsWithinRadius)

router.route('/')
  .get(toGetAdvancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(isLoggedIn, createBootcamp);

router.route('/:bootcampId/photo')
  .put(isLoggedIn, uploadBootcampPhoto);

router.route('/:bootcampId')
  .get(getBootcamp)
  .put(isLoggedIn, updateBootcamp)
  .delete(isLoggedIn, deleteBootcamp);

module.exports = router;
