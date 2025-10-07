const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    console.log("token")
    console.log(authHeader)
    const token = authHeader.split(' ')[1];
    console.log("token")
    console.log(token)
    jwt.verify(
        token,                                    /* MAIN               token */ 
        process.env.ACCESS_TOKEN_SECRET,          /* MAIN  ACCESS_TOKEN_SECRET*/
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}

module.exports = verifyJWT