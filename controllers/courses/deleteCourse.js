const Course = require('../../models/Course');
const toHandleAsync = require('../../middlewares/toHandleAsync');
const ErrorResponse = require('../../utils/class_error');

/**
 * @DESC delete a course
 * @PATH DELETE /api/v1/courses/:courseId
 */

const deleteCourse = toHandleAsync(async (req, res, next) => {
    const foundCourse = await Course.findById(req.params.courseId)
    if (!foundCourse) { return next(new ErrorResponse(`Course doesn't exists`, 400)) }

    if (foundCourse.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Unauthorize to update the course to this bootcamp`, 401));
    }

    await foundCourse.remove();

    res
        .status(200)
        .json({ success: true, data: {} });

});

module.exports = deleteCourse;