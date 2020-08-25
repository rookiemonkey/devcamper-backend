const router = require('express').Router({ mergeParams: true });
const getReviews = require('../controllers/reviews/getReviews');

// MIDDLEWARES:
const isLoggedIn = require('../middlewares/isLoggedIn');
const isAuthorized = require('../middlewares/isAuthorize');
const toGetAdvancedResults = require('../middlewares/toGetAdvancedResults');
const Review = require('../models/Review');

// ROOT: /api/v1/reviews

router.route('/')
  .get(toGetAdvancedResults(Review, { path: 'bootcamp', select: 'name description' }), getReviews)

module.exports = router;
