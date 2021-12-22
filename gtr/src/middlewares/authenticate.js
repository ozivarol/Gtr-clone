const hs = require("http-status");
const JWT = require("jsonwebtoken");

const authenticateToken = (req,res,next) =>{
    const authHeader = req.headers["authorization"];

    const token = req.headers?.token;

    if(!token){
       return res.status(hs.UNAUTHORIZED).send({error:"Bu işlemi yapmak için giriş yapmalısınız.."});
    }
    JWT.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY,(err,user)=>{
        if(err){
            return res.status(hs.FORBIDDEN).send({err:err});
        }
        req.user = user;
        next();
    })

}



module.exports = authenticateToken;