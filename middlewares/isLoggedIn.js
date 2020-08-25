const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/class_error');
const User = require('../models/User');
const toHandleAsync = require('./toHandleAsync');

const isLoggedIn = toHandleAsync(async (req, res, next) => {
    const isTokenPresent = req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    const isCookiePresent = req.cookies.token

    let token;
    if (isTokenPresent) { token = req.headers.authorization.split(' ')[1]; }
    // else if (isCookiePresent) { token = req.cookies.token; };

    if (!token) { return next(new ErrorResponse('Unauthorized', 401)) };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded._id);
        next();
    }

    catch { next(new ErrorResponse('Unauthorized', 401)) }
});

module.exports = isLoggedIn;