const crypto = require('crypto');
const User = require('../../models/User');
const toHandleAsync = require('../../middlewares/toHandleAsync');
const sendTokenCookie = require('../../utils/sendTokenCookie');
const ErrorResponse = require('../../utils/class_error');

/**
 * @desc    Confirm Email
 * @route   POST /api/v1/auth/confirm
 * @access  Public
 */
const confirmEmail = toHandleAsync(async (req, res, next) => {
    const rawToken = req.body.token

    if (!rawToken) { return next(new ErrorResponse('Invalid Token', 400)); }

    const token = rawToken.split('.')[0];
    const confirmEmailToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

    const foundUser = await User.findOne({
        confirmEmailToken,
        isEmailConfirmed: false,
    });

    if (!foundUser) { return next(new ErrorResponse('Invalid Token', 400)); }

    foundUser.confirmEmailToken = undefined;
    foundUser.isEmailConfirmed = true;
    await foundUser.save({ validateBeforeSave: false });

    sendTokenCookie(foundUser, 200, res);
});

module.exports = confirmEmail;