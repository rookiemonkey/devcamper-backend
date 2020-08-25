const User = require('../../models/User');
const toHandleAsync = require('../../middlewares/toHandleAsync');
const ErrorResponse = require('../../utils/class_error');

/**
 * @DESC update a user
 * @PATH PUT /api/v1/users/:userId
 * @ACCESS Admin only
 */

const updateUser = toHandleAsync(async (req, res, next) => {
    if (req.body.password) {
        return next(new ErrorResponse(`Cannot change a user's password`, 400))
    }

    const updatedUser = await User
        .findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true })

    res
        .status(201)
        .json({ success: true, data: updatedUser })
});

module.exports = updateUser;