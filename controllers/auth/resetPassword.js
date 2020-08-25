const User = require('../../models/User');
const crypto = require('crypto');
const toHandleAsync = require('../../middlewares/toHandleAsync');
const ErrorResponse = require('../../utils/class_error');
const sendTokenCookie = require('../../utils/sendTokenCookie');

/**
 * @DESC process a reset password
 * @PATH PUT /api/v1/auth/resetPassword/:resetToken
 */

const resetPassword = toHandleAsync(async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resetToken)
        .digest('hex')

    const foundUser = await User
        .findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });
    if (!foundUser) { return next(new ErrorResponse(`Invalid token`, 400)); };

    foundUser.password = req.body.password;
    foundUser.resetPasswordToken = undefined;
    foundUser.resetPasswordExpire = undefined;
    await foundUser.save();

    sendTokenCookie(foundUser, 200, res);
});

module.exports = resetPassword;