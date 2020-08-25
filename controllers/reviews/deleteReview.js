const Review = require('../../models/Review');
const ErrorResponse = require('../../utils/class_error');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC delete a review
 * @PATH delete /api/v1/reviews/:reviewId
 */

const deleteReview = toHandleAsync(async (req, res, next) => {
    const foundReview = await Review.findById(req.params.reviewId);
    if (!foundReview) { return next(new ErrorResponse(`Review doesn't exists`, 400)) };

    const isOwner = foundReview.user.toString() !== req.user._id.toString();
    const isAdmin = req.user.rol !== 'admin';
    if (isOwner && isAdmin) {
        return next(new ErrorResponse(`Unauthorize to delete the review`, 401))
    }

    await foundReview.remove();

    res
        .status(200)
        .json({ success: true, data: {} });
});

module.exports = deleteReview;