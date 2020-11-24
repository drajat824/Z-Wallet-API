require('dotenv').config()
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const bearerToken = req.header('auth')

    if(!bearerToken){
        res.status(404).send({
            success: false,
            message: "Not Found",
          });
    } else{
   jwt.verify(bearerToken, process.env.SECRET_KEY, (err, decode) => {
       if(!err){
           if(decode.role_id == 21 || decode.role_id == 20){
               req.role = decode.role_id
               req.id = decode.id
               next()
           } else {
            res.status(404).send({
                success: false,
                message: "Not Found",
              });
           }
       } else {
        res.status(404).send({
            success: false,
            message: "Not Found",
          });
       }
   })

    }

   
}
