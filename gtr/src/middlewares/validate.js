const hs = require("http-status");
const ApiError = require("../errors/ApiError")
const validate = (schema, source) => (req, res, next) => {
    const { value, error } = schema.validate(req[source]);
    if (error) {
        const errorMessage = error.details?.map(detail => detail.message).join(", ");
        next(new ApiError(errorMessage, hs.BAD_REQUEST))
        return;
    }
    Object.assign(req, value);
    next();

}


module.exports = validate;