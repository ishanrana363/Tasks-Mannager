const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports=(req,res,next)=>{
    let key = "lkfjdsfjkdsofdsjpfo"
    let token = req.headers["token"];
    jwt.verify(token,key,(error,decode)=>{
        if(error){
            res.status(401).send({
                status:"Unauthorized"
            })
        }else{
            let email = decode["email"];
            let id = decode["id"];
            req.headers.email = email;
            req.headers.id = id;
            next()
        }
    })
}