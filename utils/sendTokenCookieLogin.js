const sendTokenCookieLogin = (user, statusCode, response) => {

    const token = user.getToken();

    const options = {};

    options.expires = new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000);

    options.httpOnly = true;
    // for security: https://owasp.org/www-community/HttpOnly

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
        // for security: https://owasp.org/www-community/controls/SecureFlag
    }

    const currentUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    response
        .status(statusCode)
        .cookie('token', token, options)
        .json({ success: true, token, currentUser });
}

module.exports = sendTokenCookieLogin;