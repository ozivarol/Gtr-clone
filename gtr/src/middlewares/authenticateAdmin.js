const JWT = require("jsonwebtoken");
const hs = require("http-status");
const ApiError = require("../errors/ApiError");


const authenticateToken = (req, res, next) => {
    const token = req.headers?.token
    if (!token) {
        return next(new ApiError("Sorun oldu"))
    }
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {

        if (!user?._doc?.isAdmin) {
            next(new ApiError("Bu işlemi yapabilmeniz için admin olmanı gerek"));
            return
        }
        if (err) {
            next(new ApiError("Sorun oluştu"));
            return
        }
        req.user = user?._doc;
        next();
    })
}

module.exports = authenticateToken;