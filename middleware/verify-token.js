const jwt = require('jsonwebtoken');


module.exports = (req , res ,next) => {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token

    if (token){
        jwt.verify(token ,'yorumlaAppAPIWebtokenKey' , (err , decoded) => {
            if (err){
                res.json({
                    success : false , 
                    message : 'Failed auth'
                })
            }else {
                console.log(decoded); // email 
                req.decode = decoded;
                next();
            }
        })

    }else {
        res.json({
            success : false , 
            message : 'Auth token not found'
        })
    }
}