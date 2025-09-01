const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
    const token = req.cookies.token; //JWT token is inside cookie
    
    if(!token){
       return res.status(401).json({ error: 'Unauthorized: No token provided'});
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decode;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ error: 'Error: No token provided'});
    }
};

module.exports = verifyToken;