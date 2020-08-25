const User = require('../../models/User');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC create a user
 * @PATH POST /api/v1/auth/signup
 */

const createUser = toHandleAsync(async (req, res, next) => {
    const createdUser = await User.create(req.body);
    const token = createdUser.getToken();

    res
        .status(201)
        .json({ success: true, token })
});

module.exports = createUser;