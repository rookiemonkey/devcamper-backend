const User = require('../../models/User');
const toHandleAsync = require('../../middlewares/toHandleAsync');
const ErrorResponse = require('../../utils/class_error');

/**
 * @DESC process a forgot password token to be emailed
 * @PATH POST /api/v1/auth/login
 */

const forgotPassword = toHandleAsync(async (req, res, next) => {
    const foundUser = await User.findOne({ email: req.body.email })
    if (!foundUser) { return next(new ErrorResponse(`User doesn't exists`, 400)); }

    const resetToken = foundUser.getPasswordResetToken();

    await foundUser.save({ validateBeforeSave: false });

    res
        .status(200)
        .json({ success: true, data: foundUser });
});

module.exports = forgotPassword;