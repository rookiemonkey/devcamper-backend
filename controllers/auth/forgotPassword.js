const User = require('../../models/User');
const toHandleAsync = require('../../middlewares/toHandleAsync');
const ErrorResponse = require('../../utils/class_error');
const sendEmail = require('../../utils/sendEmail');

/**
 * @DESC process a forgot password token to be emailed
 * @PATH POST /api/v1/auth/forgotPassword
 */

const forgotPassword = toHandleAsync(async (req, res, next) => {
    const foundUser = await User.findOne({ email: req.body.email })
    if (!foundUser) { return next(new ErrorResponse(`User doesn't exists`, 400)); }

    const resetToken = foundUser.getPasswordResetToken();

    await foundUser.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetPassword/${resetToken}`;
    const message = `A password reset has been requested. Please visit: ${resetUrl}`;

    try {
        await sendEmail({
            email: foundUser.email,
            subject: `Password Reset Token`,
            message
        })

        return res
            .status(200)
            .json({ success: true, data: `Password Reset email sent!` });
    }

    catch (error) {
        foundUser.resetPasswordToken = undefined;
        foundUser.resetPasswordExpire = undefined;
        await foundUser.save({ validateBeforeSave: false });
        return next(new ErrorResponse(`Something went wrong upon sending the token to your email. Please request again`, 400));
    }
});

module.exports = forgotPassword;