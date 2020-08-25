const User = require('../../models/User');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC create a user
 * @PATH POST /api/v1/auth/signup
 */

const createUser = toHandleAsync(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    const createdUser = await User.create(req.body)

    res
        .status(201)
        .json({ success: true })
});

module.exports = createUser;