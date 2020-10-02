const Speakeasy = require("speakeasy");
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_KEY_OTP);
const User = require('../../models/User');
const toHandleAsync = require('../../middlewares/toHandleAsync');
const sendEmail = require('../../utils/sendEmail');
const ErrorResponse = require('../../utils/class_error');

/**
 * @desc    Reset OTP
 * @route   POST /api/v1/auth/otp/reset
 * @access  Private
 */
const resetOtp = toHandleAsync(async (req, res, next) => {
    const [foundUser] = await User.find({ email: req.body.email });

    // check if user with email is existing
    if (!foundUser) {
        return next(new ErrorResponse('Invalid Request', 400));
    }

    // check if otp it enabled on the account
    if (!foundUser.otp) {
        return next(new ErrorResponse('Invalid Request', 400));
    }

    // if turned on, generate an authenticator and save the user
    const secret = Speakeasy.generateSecret({ length: 20 });
    foundUser.otpKey = cryptr.encrypt(secret.base32);
    await foundUser.save();

    // send an email along with the authenticator key
    await sendEmail({
        email: req.body.email,
        subject: 'Dev Camper One-Time Password Reset',
        message: `Here is your new authenticator key: ${secret.base32}. On you authenticator app, Please make sure that you choose  'Time-Based' as a type of key.`
    });

    // logout the user
    return res
        .cookie('token', 'none', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true,
        })
        .status(200)
        .json({ success: true, msg: "Successfully reset your OTP Authenticator key. Please check your email" });

});

module.exports = resetOtp;