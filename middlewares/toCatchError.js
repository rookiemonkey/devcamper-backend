const chalk = require('chalk')

const toCatchError = (error, req, res, next) => {
    let errorResponse = {}

    // check any undocumented errors to be added if needed
    if (process.env.NODE_ENV === 'development' &&
        error.name !== 'ValidationError' &&
        error.name !== 'ErrorResponse' &&
        error.name !== 'CastError' &&
        error.code !== 11000
    ) {
        console.log(chalk.redBright.underline('[toCatchError.js]: An undocumented error occured'))
        console.log(error)
    }

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
    if (error.code === 11000) {
        errorResponse.message = `Resource is already existing`
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