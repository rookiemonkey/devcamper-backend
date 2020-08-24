const Bootcamp = require('../../models/Bootcamp');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC update a bootcamp
 * @PATH PUT /api/v1/bootcamps/:bootcampId
 */

const updateBootcamp = toHandleAsync(async (req, res, next) => {
  const foundBootcamp = await Bootcamp.findByIdAndUpdate(
    req.params.bootcampId, req.body, { new: true, runValidators: true }
  )
  if (!foundBootcamp) { return next(new ErrorResponse(`Bootcamp doesn't exists`, 400)) }

  res
    .status(200)
    .json({ success: true, data: foundBootcamp });
});

module.exports = updateBootcamp;
