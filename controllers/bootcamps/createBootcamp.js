const Bootcamp = require('../../models/Bootcamp');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC create a bootcamp
 * @PATH POST /api/v1/bootcamps/
 */

const createBootcamp = toHandleAsync(async (req, res, next) => {
    const createdBootcamp = await Bootcamp.create(req.body);

    res
        .status(201)
        .json({ success: true, data: createdBootcamp });

});

module.exports = createBootcamp;
