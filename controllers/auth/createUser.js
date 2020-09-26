const User = require('../../models/User');
const toHandleAsync = require('../../middlewares/toHandleAsync');
const sendEmail = require('../../utils/sendEmail');
const sendTokenCookie = require('../../utils/sendTokenCookie');
const ErrorResponse = require('../../utils/class_error');

/**
 * @DESC create a user
 * @PATH POST /api/v1/auth/signup
 */

const createUser = toHandleAsync(async (req, res, next) => {
    const { name, email, password, passwordConfirm, role } = req.body;

    if (passwordConfirm !== password)
        return next(new ErrorResponse("Passwords doesn't match", 404))

    const createdUser = await User.create({ name, email, password, role });

    const confirmEmailToken = createdUser.getConfirmEmailToken();

    const confirmEmailURL = `${req.protocol}://${req.get(
        'host',
    )}/api/v1/auth/confirm?token=${confirmEmailToken}`;

    const message = `You are receiving this email because you need to confirm your email address. Please make a GET request to: \n\n ${confirmEmailURL}`;

    await createdUser.save({ validateBeforeSave: false });

    await sendEmail({
        email: createdUser.email,
        subject: 'Email confirmation token',
        message,
    });

    sendTokenCookie(createdUser, 200, res);
});

module.exports = createUser;