const Bootcamp = require('../../models/Bootcamp');
const ErrorResponse = require('../../utils/class_error');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC update a bootcamp
 * @PATH PUT /api/v1/bootcamps/:bootcampId
 */

const updateBootcamp = toHandleAsync(async (req, res, next) => {
  let foundBootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!foundBootcamp) {
    return next(new ErrorResponse(`Bootcamp doesn't exists`, 400));
  }

  if (foundBootcamp.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Unauthorize to update the bootcamp`, 401));
  }

  foundBootcamp = await Bootcamp.findByIdAndUpdate(req.params.bootcampId, req.body,
    { new: true, runValidators: true }
  )

  res
    .status(200)
    .json({ success: true, data: foundBootcamp });
});

module.exports = updateBootcamp;
