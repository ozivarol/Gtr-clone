const JWT = require("jsonwebtoken");
const hs = require("http-status");



const authenticateToken = (req,res,next) =>{
    const token = req.headers?.token
    if(!token){
        return res.status(hs.UNAUTHORIZED).send({message:"Bu işlemi yapabilmek için admin olmanız ve giriş yapmanız gerekmektedir..."})
    }
    JWT.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY,(err,user)=>{
        if(err){
            return res.status(hs.FORBIDDEN).send({err});
        }
        if(!user?._doc?.isAdmin){
            return res.status(hs.UNAUTHORIZED).send({message:"Bu işlemi yapabilmek için admin olmanız gerekmektedir seni çakaaal :)"})
        }
        req.user = user?._doc;
        next();
    })
}

module.exports = authenticateToken;