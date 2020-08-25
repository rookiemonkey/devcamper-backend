const router = require('express').Router({ mergeParams: true });
const createReview = require('../controllers/reviews/createReview');
const getReviews = require('../controllers/reviews/getReviews');
const getReview = require('../controllers/reviews/getReview');

// MIDDLEWARES:
const isLoggedIn = require('../middlewares/isLoggedIn');
const isAuthorized = require('../middlewares/isAuthorize');
const toGetAdvancedResults = require('../middlewares/toGetAdvancedResults');
const Review = require('../models/Review');

// ROOT: /api/v1/reviews

router.route('/')
  // ROOT: /api/v1/bootcamps/:bootcampId/reviews && /api/v1/reviews
  .get(toGetAdvancedResults(Review, { path: 'bootcamp', select: 'name description' }), getReviews)

  // ROOT: /api/v1/bootcamps/:bootcampId/reviews
  .post(isLoggedIn, isAuthorized('users', 'admins'), createReview)

router.route('/:reviewId')
  .get(getReview);

module.exports = router;
