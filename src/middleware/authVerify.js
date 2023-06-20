const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.authVerify = (req, res, next) => {
    const token = req.headers.token;
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decode) => {
        if (err) {
            res.status(400).json({ status: "unAuthorized" });
        } else {
            const email = decode.data;
            req.headers.email = email;
            next()
        }
    })

};