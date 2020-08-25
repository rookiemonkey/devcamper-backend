const User = require('../../models/User');
const toHandleAsync = require('../../middlewares/toHandleAsync');
const ErrorResponse = require('../../utils/class_error');

/**
 * @DESC get a single user
 * @PATH GET /api/v1/users/:userId
 * @ACCESS Admin only
 */

const getUser = toHandleAsync(async (req, res, next) => {
    const foundUser = await User.findById(req.params.userId);
    if (!foundUser) { return next(new ErrorResponse(`User doesn't exists`, 400)) };

    res
        .status(200)
        .json({ success: true, data: foundUser })
});

module.exports = getUser;