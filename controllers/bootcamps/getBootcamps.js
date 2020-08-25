const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC get all bootcamp
 * @PATH GET /api/v1/bootcamps/
 */

const getBootcamps = toHandleAsync(async (req, res, next) => {

  // res.advancedResults from toGetAdvancedResults middleware
  if (!res.advancedResults) { return next(new ErrorResponse(`Bootcamp doesn't exists`, 400)) }

  res
    .status(200)
    .json(res.advancedResults);
});

module.exports = getBootcamps;