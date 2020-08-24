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
  // needed to be removed becuase mongoose will think that its a field
  // but will add again on the query for Bootcamp
  const removeFields = ['select', 'sort', 'limit', 'page'];
  removeFields.forEach(param => delete requestQuery[param]);

  // convertto string: user query eg: bootcamps?averageCost[lte]=1000
  let queryString = JSON.stringify(requestQuery);

  // transform into eg: {"averageCost":{"$lte":"1000"}}
  queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // convert to Object and save the Query
  query = Bootcamp.find(JSON.parse(queryString));


  // ===== SELECT
  if (req.query.select) {
    // if req.query.select is initially requested, add it again
    // user query  eg: bootcamps?select=name,description
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields)
  }


  // ===== SORT
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy)
  }
  else { query = query.sort(`-createdAt`) } // default sort


  // ===== PAGINATION
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();
  query = query.skip(startIndex).limit(limit);

  // pagination result
  const pagination = {}

  // append paginate info on the request
  if (endIndex < total) { pagination.next = { page: page + 1, limit } }
  if (startIndex > 0) { pagination.msg = `Reached the last page` }
  if (endIndex < total && startIndex > 0) {
    pagination.next = { page: page + 1, limit }
    pagination.prev = { page: page - 1, limit }
  }

  // execute query
  const foundBootcamps = await query;

  res
    .status(200)
    .json({
      success: true,
      count: foundBootcamps.length,
      pagination,
      data: foundBootcamps
    });
});

module.exports = getBootcamps;