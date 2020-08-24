const toCatchError = (error, req, res, next) => {
    let errorResponse = {}

    if (error.name === 'ErrorResponse') {
        errorResponse.message = error.message
        errorResponse.status = error.statusCode
    }

    if (error.name === 'CastError') {
        errorResponse.message = `Resource not found`
        errorResponse.status = 404
    }

    res
        .status(errorResponse.status || 500)
        .json({ success: false, msg: `${errorResponse.message}` });
}

module.exports = toCatchError;