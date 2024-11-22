const jwt  = require('jsonwebtoken');

const authMiddleWare = async (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log('verifiedToken:',verifiedToken);
        req.body.userId = verifiedToken.userId;
        next();
    }
    catch(err){
        res.status(401).json({message: "Token Invalid!"})
    }
}

module.exports = authMiddleWare;