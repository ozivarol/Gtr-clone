const hs = require("http-status");

const validate = (schema,source) => (req,res,next)=>{
    const {value,error} = schema.validate(req[source]);
    if(error){
        const errorMessage = error.details?.map(detail=>detail.message).join(", ");
        res.status(hs.BAD_REQUEST).json({error:errorMessage});
        return;
    }
    Object.assign(req,value);
    return next();

}


module.exports= validate;