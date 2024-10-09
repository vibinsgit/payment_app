const { Pass } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    // console.log(Pass);

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(403).json({
            message: "Wrong token or incorrect token."
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, Pass);

        if(decoded.userId) {
            req.userId = decoded.userId;
            next();
        } else {
            return res.status(403).json({
                message: "JWT authentication failed."
            });
        }

    } catch (err) {
        return res.status(403).json({
            message: err
        });
    }
}

module.exports = {
    authMiddleware
}