const User = require('../../models/User');
const toHandleAsync = require('../../middlewares/toHandleAsync');
const sendTokenCookie = require('../../utils/sendTokenCookie');
const ErrorResponse = require('../../utils/class_error');

/**
 * @DESC login a user
 * @PATH POST /api/v1/auth/login
 */

const loginUser = toHandleAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse(`Please provide email and password`, 400));
    }

    const foundUser = await User
        .findOne({ email })
        .select('+password'); // since select:false for password. this will override it

    if (!foundUser) {
        return next(new ErrorResponse(`Incorrect email and password`, 401));
    }

    const isMatch = await foundUser.checkPassword(password);
    if (!isMatch) {
        return next(new ErrorResponse(`Incorrect email and password`, 401));
    }

    sendTokenCookie(foundUser, 200, res);
});

module.exports = loginUser;