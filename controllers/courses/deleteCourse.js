const Course = require('../../models/Course');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC delete a course
 * @PATH DELETE /api/v1/courses/:courseId
 */

const deleteCourse = toHandleAsync(async (req, res, next) => {
    const deletedCourse = await Course.findById(req.params.courseId)
    if (!deletedCourse) { return next(new ErrorResponse(`Course doesn't exists`, 400)) }

    await deletedCourse.remove();

    res
        .status(200)
        .json({ success: true, data: {} });

});

module.exports = deleteCourse;