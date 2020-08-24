const Course = require('../../models/Course');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC get all courses
 * @PATH GET /api/v1/courses/
 * 
 * @DESC get all courses for a specific bootcamp
 * @PATH GET /api/v1/bootcamps/:bootcampId/courses
 */

const getCourses = toHandleAsync(async (req, res, next) => {
    let query;

    if (req.params.bootcampId) {
        query = Course
            .find({ bootcamp: req.params.bootcampId })
            .populate({ path: 'bootcamp', select: 'name description' })
    }
    else {
        query = Course
            .find()
            .populate({ path: 'bootcamp', select: 'name description' })
    }

    const foundCourses = await query;

    res
        .status(200)
        .json({ success: true, count: foundCourses.length, data: foundCourses });

});

module.exports = getCourses;