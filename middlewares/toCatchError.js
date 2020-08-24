const toCatchError = (error, req, res, next) => {
    res
        .status(400)
        .json({ success: false, msg: `${error.message}` });
}

module.exports = toCatchError;