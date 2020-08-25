const Course = require('../../models/Course');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC update a course
 * @PATH PUT /api/v1/courses/:courseId
 */

const updateCourse = toHandleAsync(async (req, res, next) => {
    const foundCourse = await Course.findById(req.params.courseId);
    if (!foundCourse) { return next(new ErrorResponse(`Course doesn't exists`, 400)) }

    if (foundCourse.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Unauthorize to update the course to this bootcamp`, 401));
    }

    const updatedCourse = await Course.findByIdAndUpdate(
        req.params.courseId, req.body, { new: true, runValidators: true }
    )
    if (!updatedCourse) { return next(new ErrorResponse(`Course doesn't exists`, 400)) }

    res
        .status(200)
        .json({ success: true, data: updatedCourse });

});

module.exports = updateCourse;