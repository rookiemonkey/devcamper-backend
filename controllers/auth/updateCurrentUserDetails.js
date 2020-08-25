const User = require('../../models/User');
const toHandleAsync = require('../../middlewares/toHandleAsync');
const ErrorResponse = require('../../utils/class_error');

/**
 * @DESC update details of currently logged in user
 * @PATH PUT /api/v1/auth/me/update_details
 */

const updateCurrentUserDetails = toHandleAsync(async (req, res, next) => {
    const { name, email } = req.body;

    const updatedUser = await User
        .findByIdAndUpdate(
            req.user._id,
            { name, email },
            { new: true, runValidators: true }
        );

    if (!updatedUser) { return next(new ErrorResponse(`Incorrect email and password`, 401)); }

    res
        .status(200)
        .json({ success: true, data: updatedUser })
});

module.exports = updateCurrentUserDetails;