const Review = require('../../models/Review');
const ErrorResponse = require('../../utils/class_error');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC get all reviews
 * @PATH GET /api/v1/reviews
 *
 * @DESC get all courses for a specific bootcamp
 * @PATH GET /api/v1/bootcamps/:bootcampId/reviews
 */

const getReviews = toHandleAsync(async (req, res, next) => {

    // for /api/v1/bootcamps/:bootcampId/reviews
    if (req.params.bootcampId) {
        const foundReviews = await Review
            .find({ bootcamp: req.params.bootcampId })
            .populate({ path: 'bootcamp', select: 'name description' })
            .populate({ path: 'user', select: 'name' })

        if (!foundReviews) { return next(new ErrorResponse(`Reviews doesn't exists`, 400)) }

        res
            .status(200)
            .json({ success: true, count: foundReviews.length, data: foundReviews });
    }


    // for /api/v1/reviews/
    else {

        // res.advancedResults from toGetAdvancedResults middleware
        if (!res.advancedResults) {
            return next(new ErrorResponse(`Reviews doesn't exists`, 400))
        }

        res
            .status(200)
            .json(res.advancedResults);
    }

});

module.exports = getReviews;