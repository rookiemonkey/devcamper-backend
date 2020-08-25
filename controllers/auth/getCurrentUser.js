const User = require('../../models/User');
const toHandleAsync = require('../../middlewares/toHandleAsync');
const ErrorResponse = require('../../utils/class_error');

/**
 * @DESC get currently logged in user
 * @PATH GET /api/v1/auth/me
 */

const getCurrentUser = toHandleAsync(async (req, res, next) => {
    const foundUser = await User.findById(req.user._id);
    if (!foundUser) { return next(new ErrorResponse(`Incorrect email and password`, 401)); }

    res
        .status(200)
        .json({ success: true, data: foundUser })
});

module.exports = getCurrentUser;