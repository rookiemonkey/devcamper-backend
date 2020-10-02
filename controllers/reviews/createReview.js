const Review = require('../../models/Review');
const Bootcamp = require('../../models/Bootcamp');
const ErrorResponse = require('../../utils/class_error');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC create a review
 * @PATH GET /api/v1/bootcamps/:bootcampId/reviews
 */

const createReview = toHandleAsync(async (req, res, next) => {
    const foundBootcamp = await Bootcamp.findById(req.params.bootcampId);

    if (!foundBootcamp) {
        return next(new ErrorResponse(`Bootcamp doesn't exists`, 400))
    };

    if (JSON.stringify(foundBootcamp.user) == JSON.stringify(req.user._id)) {
        return next(new ErrorResponse(`Cannot leave a review on your own bootcamp`, 400))
    }

    req.body.bootcamp = req.params.bootcampId;
    req.body.user = req.user._id;
    const createdReview = await Review.create(req.body);

    res
        .status(201)
        .json({ success: true, data: createdReview });
});

module.exports = createReview;