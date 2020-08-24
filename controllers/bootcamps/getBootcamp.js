const Bootcamp = require('../../models/Bootcamp');
const ErrorResponse = require('../../utils/class_error');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC get a bootcamp
 * @PATH GET /api/v1/bootcamps/:bootcampId
 */

const getBootcamp = toHandleAsync(async (req, res, next) => {
  const foundBootcamp = await Bootcamp.findById(req.params.bootcampId)
  if (!foundBootcamp) { return next(new ErrorResponse(`Bootcamp doesn't exists`, 400)) }

  res
    .status(200)
    .json({ success: true, data: foundBootcamp });
});

module.exports = getBootcamp;
