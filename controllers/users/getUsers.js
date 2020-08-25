const toHandleAsync = require('../../middlewares/toHandleAsync');

/**
 * @DESC get all users
 * @PATH GET /api/v1/users
 * @ACCESS Admin only
 */

const getUsers = toHandleAsync(async (req, res, next) => {
    res
        .status(200)
        .json(res.advancedResults)
});

module.exports = getUsers;