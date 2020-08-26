const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC logout a user and clear cookies
 * @PATH GET /api/v1/auth/logout
 */

const logoutUser = toHandleAsync(async (req, res, next) => {
    res
        .status(200)
        .cookie('token', 'none', { expires: new Date(Date.now() + 10 * 1000) })
        .json({ success: true, data: {} });
});

module.exports = logoutUser;