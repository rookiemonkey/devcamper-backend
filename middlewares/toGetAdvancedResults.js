const toGetAdvancedResults = (model, populate) => async (req, res, next) => {
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
    // since we are using find, we can use model key filters in query strings
    // eg: user id, to find bootcamps created by a user
    query = model
        .find(JSON.parse(queryString))




    // ===== POPULATE
    if (populate) {
        query = query.populate(populate);
    }




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
    const total = await model.countDocuments();
    query = query.skip(startIndex).limit(limit);

    // pagination result
    const pagination = {}

    // append paginate info on the request
    if (endIndex < total) {
        pagination.next = { page: page + 1, limit }
    }

    if (endIndex < total && startIndex > 0) {
        pagination.next = { page: page + 1, limit }
        pagination.prev = { page: page - 1, limit }
    }

    if (startIndex > 0) {
        pagination.msg = `Reached the last page`
    }




    // ===== EXECUTE SEARCH
    const results = await query;

    // append the advancedResults to the response
    res.advancedResults = {
        success: true,
        count: results.length,
        pagination,
        data: results
    };



    next();
}

module.exports = toGetAdvancedResults;