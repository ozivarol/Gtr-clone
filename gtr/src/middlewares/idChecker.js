const ApiError = require("../errors/ApiError");
const hs = require("http-status");

const idChecker = (req,res,next) =>{
    console.log(req.params.id)
    if (!req?.params?.id?.match(/^[0-9a-fA-F]{24}$/)){
        next(new ApiError("Lütfen geçerli bir ID girin",hs.BAD_REQUEST))
        return;
    };
    next();
   

}


module.exports = idChecker;