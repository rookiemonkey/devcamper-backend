const Course = require('../../models/Course');
const ErrorResponse = require('../../utils/class_error');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC get a course
 * @PATH GET /api/v1/courses/:courseId
 */

const getCourses = toHandleAsync(async (req, res, next) => {
    const foundCourse = await Course
        .findById(req.params.courseId)
        .populate({ path: 'bootcamp', select: 'name description' });

    if (!foundCourse) { return next(new ErrorResponse(`Course doesn't exists`, 400)) }

    res
        .status(200)
        .json({ success: true, count: foundCourse.length, data: foundCourse });

});

module.exports = getCourses;