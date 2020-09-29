const User = require('../../models/User');
const toHandleAsync = require('../../middlewares/toHandleAsync');
const sendTokenCookieLogin = require('../../utils/sendTokenCookieLogin');
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

    if (foundUser.otp) {
        return next(new ErrorResponse('Please login using One-time password token', 400));
    }

    const isMatch = await foundUser.checkPassword(password);
    if (!isMatch) {
        return next(new ErrorResponse(`Incorrect email and password`, 401));
    }

    sendTokenCookieLogin(foundUser, 200, res);
});

module.exports = loginUser;