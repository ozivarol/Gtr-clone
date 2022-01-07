module.exports = (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            code: error.code || -3,
            msg: error.msg || "Internal Server Error....",
        },
    });
};