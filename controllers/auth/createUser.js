const User = require('../../models/User');
const toHandleAsync = require('../../middlewares/toHandleAsync');
const sendTokenCookie = require('../../utils/sendTokenCookie');

/**
 * @DESC create a user
 * @PATH POST /api/v1/auth/signup
 */

const createUser = toHandleAsync(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const createdUser = await User.create({ name, email, password, role });

    sendTokenCookie(createdUser, 200, res);
});

module.exports = createUser;