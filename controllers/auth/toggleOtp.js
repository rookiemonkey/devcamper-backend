const Speakeasy = require("speakeasy");
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_KEY_OTP);
const User = require('../../models/User');
const toHandleAsync = require('../../middlewares/toHandleAsync');
const sendEmail = require('../../utils/sendEmail');
const ErrorResponse = require('../../utils/class_error');

/**
 * @desc    Toggle OTP
 * @route   PUT /api/v1/auth/otp
 * @access  Private
 */
const toggleOtp = toHandleAsync(async (req, res, next) => {
    const foundUser = await User.findById(req.user._id);

    // prevent login via otp if email is not confirmed
    if (!foundUser.isEmailConfirmed) {
        return next(new ErrorResponse('Please confirm your email first', 400));
    }

    // toggle otp
    foundUser.otp = !foundUser.otp

    // if turned off
    if (!foundUser.otp) {
        foundUser.otpKey = undefined;
        await foundUser.save();

        // logout the user
        return res
            .cookie('token', 'none', {
                expires: new Date(Date.now() + 10 * 1000),
                httpOnly: true,
            })
            .status(200)
            .json({ success: true, data: "Account OTP succesfully disabled!. Please login again. Setup your password again by using forgot password unless your remembered your old password" })
    }

    // if turned on, generate an authenticator and save the user
    const secret = Speakeasy.generateSecret({ length: 20 });
    foundUser.otpKey = cryptr.encrypt(secret.base32);
    await foundUser.save();

    // send an email along with the authenticator key
    await sendEmail({
        email: req.user.email,
        subject: 'Dev Camper One-Time Password Activated',
        message: `Here is your authenticator key: ${secret.base32}. On you authenticator app, Please make sure that you choose  'Time-Based' as a type of key.`
    });

    // logout the user
    return res
        .cookie('token', 'none', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true,
        })
        .status(200)
        .json({ success: true, data: "Account OTP succesfully enabled!. Please login again" });

});

module.exports = toggleOtp;