const Speakeasy = require("speakeasy");
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_KEY_OTP);
const User = require('../../models/User');
const toHandleAsync = require('../../middlewares/toHandleAsync');
const sendTokenCookieLogin = require('../../utils/sendTokenCookieLogin');
const ErrorResponse = require('../../utils/class_error');

/**
 * @desc    Login via OTP
 * @route   POST /api/v1/auth/otp
 * @access  Public
 */
const loginOtp = toHandleAsync(async (req, res, next) => {
    const foundUser = await User
        .findOne({ email: req.body.email })
        .select('+otpKey');

    if (!foundUser) { return next(new ErrorResponse("Invalid Email/Token", 404)) }
    if (!foundUser.otp) { return next(new ErrorResponse("Account OTP is not enabled", 400)) }
    if (!req.body.token) { return next(new ErrorResponse("Invalid Email/Token", 400)) }

    const isVerified = Speakeasy.totp.verify({
        secret: cryptr.decrypt(foundUser.otpKey),
        token: req.body.token,
        encoding: "base32",
        window: 0
    })

    if (!isVerified) { return next(new ErrorResponse("Invalid token", 400)) }

    sendTokenCookieLogin(foundUser, 200, res);
});

module.exports = loginOtp;