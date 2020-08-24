const Bootcamp = require('../../models/Bootcamp');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC get all bootcamp
 * @PATH GET /api/v1/bootcamps/
 */

const getBootcamps = toHandleAsync(async (req, res, next) => {

  // user query eg: bootcamps?averageCost[lte]=1000
  let queryString = JSON.stringify(req.query);

  // transform into eg: {"averageCost":{"$lte":"1000"}}
  queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  const foundBootcamps = await Bootcamp.find(JSON.parse(queryString))

  res
    .status(200)
    .json({ success: true, count: foundBootcamps.length, data: foundBootcamps });
});

module.exports = getBootcamps;