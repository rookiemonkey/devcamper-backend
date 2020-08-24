const Bootcamp = require('../../models/Bootcamp');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC get all bootcamp
 * @PATH GET /api/v1/bootcamps/
 */

const getBootcamps = toHandleAsync(async (req, res, next) => {

  // init a query var
  let query;

  // create a copy of the query
  const requestQuery = { ...req.query };

  // exclude those not an operator gt|gte|lt|lte|in
  // but will add again later
  const removeFields = ['select', 'sort'];
  removeFields.forEach(param => delete requestQuery[param]);

  // convertto string: user query eg: bootcamps?averageCost[lte]=1000
  let queryString = JSON.stringify(requestQuery);

  // transform into eg: {"averageCost":{"$lte":"1000"}}
  queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // convert to Object and save the Query
  query = Bootcamp.find(JSON.parse(queryString));

  if (req.query.select) {
    // if req.query.select is initially requested, add it again
    // user query  eg: bootcamps?select=name,description
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields)
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy)
  }
  // default sort
  else { query = query.sort(`-createdAt`) }


  const foundBootcamps = await query;

  res
    .status(200)
    .json({ success: true, count: foundBootcamps.length, data: foundBootcamps });
});

module.exports = getBootcamps;