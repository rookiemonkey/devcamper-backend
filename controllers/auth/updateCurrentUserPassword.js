const User = require('../../models/User');
const toHandleAsync = require('../../middlewares/toHandleAsync');
const ErrorResponse = require('../../utils/class_error');
const sendTokenCookie = require('../../utils/sendTokenCookie');

/**
 * @DESC update password of currently logged in user
 * @PATH PUT /api/v1/auth/me/update_password
 */

const updateCurrentUserPassword = toHandleAsync(async (req, res, next) => {
    const foundUser = await User
        .findById(req.user._id)
        .select('+password');

    const isMatch = await foundUser.checkPassword(req.body.currentPassword);
    if (!isMatch) { return next(new ErrorResponse(`Password incorrect`, 401)); }

    foundUser.password = req.body.newPassword;
    await foundUser.save();

    sendTokenCookie(foundUser, 200, res);
});

module.exports = updateCurrentUserPassword;