const User = require('../../models/User');
const toHandleAsync = require('../../middlewares/toHandleAsync');
const sendEmail = require('../../utils/sendEmail');

/**
 * @DESC update a user
 * @PATH PUT /api/v1/users/:userId
 * @ACCESS Admin only
 */

const updateUser = toHandleAsync(async (req, res, next) => {
    const { name, email } = req.body;

    const foundUser = await User.findById(req.user._id);

    // if the email was changed
    if (email !== foundUser.email) {
        const confirmEmailToken = foundUser.getConfirmEmailToken();

        const confirmEmailURL = `${process.env.FRONTEND_URL}/auth/confirm?token=${confirmEmailToken}`;

        const message = `You are receiving this email because you changed your email for your DevCamper account. Please make a GET request to: \n\n ${confirmEmailURL}`;

        await sendEmail({
            email: email,
            subject: 'Email Change confirmation token',
            message,
        });

        foundUser.isEmailConfirmed = false;
        foundUser.role = 'publisher';
        await foundUser.save()
    }

    const updatedUser = await User
        .findByIdAndUpdate(req.params.userId, { name, email }, { new: true, runValidators: true })

    res
        .status(201)
        .json({ success: true, data: updatedUser })
});

module.exports = updateUser;