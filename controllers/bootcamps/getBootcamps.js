const Bootcamp = require('../../models/Bootcamp');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC get all bootcamp
 * @PATH GET /api/v1/bootcamps/
 */

const getBootcamps = toHandleAsync(async (req, res, next) => {
  const foundBootcamps = await Bootcamp.find({})

  res
    .status(200)
    .json({ success: true, count: foundBootcamps.length, data: foundBootcamps });
});

module.exports = getBootcamps;
