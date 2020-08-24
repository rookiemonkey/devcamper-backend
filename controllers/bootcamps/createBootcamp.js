const Bootcamp = require('../../models/Bootcamp');

/**
 * @DESC create a bootcamp
 * @PATH POST /api/v1/bootcamps/
 */

const createBootcamp = async (req, res, next) => {
    try {
        const createdBootcamp = await Bootcamp.create(req.body);
        res
            .status(201)
            .json({ success: true, data: createdBootcamp });
    }


    catch (error) {
        next(error)
    }
};

module.exports = createBootcamp;
