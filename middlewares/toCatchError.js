const toCatchError = (error, req, res, next) => {
    let errorResponse = {}
    let requestPath = req.url
    let requestMethod = req.method

    console.log(error)

    // custom error
    if (error.name === 'ErrorResponse') {
        errorResponse.message = error.message
        errorResponse.status = error.statusCode
    }

    // Mongo Incorrect id Error
    if (error.name === 'CastError') {
        errorResponse.message = `Resource not found`
        errorResponse.status = 404
    }

    // Mongo Duplicate Key Error
    if (error.code === 11000 &&
        requestPath === '/api/v1/bootcamps' &&
        requestMethod === 'POST'
    ) {
        errorResponse.message = `Bootcamp is already existing`
        errorResponse.status = 400
    }

    // Mongo Validation Error
    if (error.name === 'ValidationError') {
        const message = Object.keys(error.errors).map(field => field)
        errorResponse.message = `The following fields are required: ${message}`
        errorResponse.status = 400
    }

    res
        .status(errorResponse.status || 500)
        .json({ success: false, msg: `${errorResponse.message}` || `This error is new` });
}

module.exports = toCatchError;