const Bootcamp = require('../../models/Bootcamp');

/**
 * @DESC delete a bootcamp
 * @PATH DELETE /api/v1/bootcamps/:bootcampId
 */

const deleteBootcamp = async (req, res, next) => {
  try {
    const foundBootcamp = await Bootcamp.findByIdAndDelete(req.params.bootcampId)
    if (!foundBootcamp) { return next(new ErrorResponse(`Bootcamp doesn't exists`, 400)) }

    res
      .status(200)
      .json({ success: true, data: {} });
  }

  catch (error) {
    next(error)
  }
};

module.exports = deleteBootcamp;
