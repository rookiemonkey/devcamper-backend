const User = require('../../models/User');
const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC create a user
 * @PATH POST /api/v1/users
 * @ACCESS Admin only
 */

const createUser = toHandleAsync(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const createdUser = await User.create({ name, email, password, role });

    res
        .status(201)
        .json({ success: true, data: createdUser })
});

module.exports = createUser;