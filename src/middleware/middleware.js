const jwt = require("jsonwebtoken");

exports.authenthication = (req, res, next) => {
    try {
        const token = req.headers["authtoken"]
        console.log(token);
        if(!token){
            return res.status(401).send("no token, authorization denied")
        }
        const decoded = jwt.verify(token, "jwtSecret");

        console.log("middleware", decoded);
        next();
    } catch (err){
        console.log(err);
        res.status(401).send("Token Invalid!!");
    }
}