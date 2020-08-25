const User = require('../../models/User');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC create a user
 * @PATH POST /api/v1/auth/signup
 */

const createUser = toHandleAsync(async (req, res, next) => {

    res
        .status(200)
        .json({ success: true })
});

module.exports = createUser;