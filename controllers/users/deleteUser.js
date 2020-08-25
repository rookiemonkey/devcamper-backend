const User = require('../../models/User');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC delete a user
 * @PATH DELETE /api/v1/users/:userId
 * @ACCESS Admin only
 */

const deleteUser = toHandleAsync(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.userId);

    res
        .status(200)
        .json({ success: true, data: {} })
});

module.exports = deleteUser;