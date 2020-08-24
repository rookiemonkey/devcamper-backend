const Course = require('../../models/Course');
const Bootcamp = require('../../models/Bootcamp');
const ErrorResponse = require('../../utils/class_error');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC get a course for a specific bootcamp
 * @PATH POST /api/v1/bootcamps/:bootcampId/courses
 */

const createCourse = toHandleAsync(async (req, res, next) => {
    const foundBootcamp = await Bootcamp.findById(req.params.bootcampId);
    if (!foundBootcamp) { return next(new ErrorResponse(`Bootcamp doesn't exists`, 400)) }

    const createdCourse = await Course.create({ ...req.body, bootcamp: req.params.bootcampId })

    res
        .status(200)
        .json({ success: true, data: createdCourse });

});

module.exports = createCourse;