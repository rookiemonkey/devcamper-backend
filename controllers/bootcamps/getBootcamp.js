const Bootcamp = require('../../models/Bootcamp');
const ErrorResponse = require('../../utils/class_error');

/**
 * @DESC get a bootcamp
 * @PATH GET /api/v1/bootcamps/:bootcampId
 */

const getBootcamp = async (req, res, next) => {
  try {
    const foundBootcamp = await Bootcamp.findById(req.params.bootcampId)
    if (!foundBootcamp) { return next(new ErrorResponse(`Bootcamp doesn't exists`, 400)) }

    res
      .status(200)
      .json({ success: true, data: foundBootcamp });
  }

  catch (error) {
    next(error)
  }
};

module.exports = getBootcamp;
