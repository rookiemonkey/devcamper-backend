const Bootcamp = require('../../models/Bootcamp');

/**
 * @DESC update a bootcamp
 * @PATH PUT /api/v1/bootcamps/:bootcampId
 */

const updateBootcamp = async (req, res, next) => {
  try {
    const foundBootcamp = await Bootcamp.findByIdAndUpdate(
      req.params.bootcampId, req.body, { new: true, runValidators: true }
    )
    if (!foundBootcamp) { return next(new ErrorResponse(`Bootcamp doesn't exists`, 400)) }

    res
      .status(200)
      .json({ success: true, data: foundBootcamp });
  }

  catch (error) {
    next(error)
  }
};

module.exports = updateBootcamp;
