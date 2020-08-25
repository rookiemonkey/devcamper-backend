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


    // for /api/v1/bootcamps/:bootcampId/courses
    if (req.params.bootcampId) {
        const foundCourses = await Course
            .find({ bootcamp: req.params.bootcampId })
            .populate({ path: 'bootcamp', select: 'name description' })

        if (!foundCourses) { return next(new ErrorResponse(`Courses doesn't exists`, 400)) }

        res
            .status(200)
            .json({ success: true, count: foundCourses.length, data: foundCourses });
    }


    // for /api/v1/courses/
    else {

        // res.advancedResults from toGetAdvancedResults middleware
        if (!res.advancedResults) { return next(new ErrorResponse(`Courses doesn't exists`, 400)) }

        res
            .status(200)
            .json(res.advancedResults);
    }
});

module.exports = getCourses;