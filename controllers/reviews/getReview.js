const Review = require('../../models/Review');
const ErrorResponse = require('../../utils/class_error');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC get a review
 * @PATH GET /api/v1/reviews/:reviewId
 */

const getReview = toHandleAsync(async (req, res, next) => {
    const foundReview = await Review
        .findById(req.params.reviewId)
        .populate({ path: 'bootcamp', select: 'name description' });

    if (!foundReview) { return next(new ErrorResponse(`Review doesn't exists`, 400)) }

    res
        .status(200)
        .json({ success: true, data: foundReview });
});

module.exports = getReview;