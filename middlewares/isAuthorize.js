const ErrorResponse = require('../utils/class_error');

const isAuthorize = (req, res, next) => {

    const roles = ['publisher', 'admin'];

    if (!roles.includes(req.user.role)) {
        return next(new ErrorResponse(`Current role, '${req.user.role}' is unauthorize to do this`, 403))
    }

    next();
}

module.exports = isAuthorize;