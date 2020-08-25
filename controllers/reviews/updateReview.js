const Review = require('../../models/Review');
const ErrorResponse = require('../../utils/class_error');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC update a review
 * @PATH PUT /api/v1/reviews/:reviewId
 */

const updateReview = toHandleAsync(async (req, res, next) => {
    const foundReview = await Review.findById(req.params.reviewId);
    if (!foundReview) { return next(new ErrorResponse(`Review doesn't exists`, 400)) };

    const isOwner = foundReview.user.toString() !== req.user._id.toString();
    const isAdmin = req.user.rol !== 'admin';
    if (isOwner && isAdmin) {
        return next(new ErrorResponse(`Unauthorize to update the review`, 401))
    }

    const updatedReview = await Review
        .findByIdAndUpdate(req.params.reviewId, req.body, { new: true, runValidators: true });

    res
        .status(200)
        .json({ success: true, data: updatedReview });
});

module.exports = updateReview;