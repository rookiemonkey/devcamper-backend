const Bootcamp = require('../../models/Bootcamp');
const ErrorResponse = require('../../utils/class_error');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC delete a bootcamp
 * @PATH DELETE /api/v1/bootcamps/:bootcampId
 */

const deleteBootcamp = toHandleAsync(async (req, res, next) => {
  const foundBootcamp = await Bootcamp.findByIdAndDelete(req.params.bootcampId)
  if (!foundBootcamp) { return next(new ErrorResponse(`Bootcamp doesn't exists`, 400)) }

  res
    .status(200)
    .json({ success: true, data: {} });
});

module.exports = deleteBootcamp;
