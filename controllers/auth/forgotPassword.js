const Speakeasy = require("speakeasy");
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_KEY_OTP);
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

    if (foundUser.otp) {
        const secret = Speakeasy.generateSecret({ length: 20 });
        foundUser.otpKey = cryptr.encrypt(secret.base32);
        await foundUser.save();

        await sendEmail({
            email: foundUser.email,
            subject: 'Dev Camper New One-Time Password Authenticator Key',
            message: `Here is your new authenticator key: ${secret.base32}. On you authenticator app, Please make sure that you choose  'Time-Based' as a type of key.`
        });

        return res
            .status(200)
            .json({ sucess: true, data: "Account OTP is enabled. Hence, OTP Authenticator key reset was done instead. Please check your email" });
    }

    const resetToken = foundUser.getPasswordResetToken();

    await foundUser.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL}/password_update?token=${resetToken}`;
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