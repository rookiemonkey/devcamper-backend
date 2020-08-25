const Bootcamp = require('../../models/Bootcamp');
const ErrorResponse = require('../../utils/class_error');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC create a bootcamp
 * @PATH POST /api/v1/bootcamps/
 * 
 * ROLE: Admin - can add many
 * ROLE: Publisher - can add only 1
 * ROLE: User - cannot add
 */

const createBootcamp = toHandleAsync(async (req, res, next) => {
    const publishedBootcamp = await Bootcamp.findOne({ user: req.user._id });

    // if published and not an admin
    if (publishedBootcamp && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Publishers can only add 1 bootcamp`, 400))
    }

    const createdBootcamp = await Bootcamp.create({ ...req.body, user: req.user._id });

    res
        .status(201)
        .json({ success: true, data: createdBootcamp });

});

module.exports = createBootcamp;
