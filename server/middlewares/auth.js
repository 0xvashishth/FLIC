const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secret_key = process.env['JWT_SECRET'];

const auth = async (req, res, next) => {
    try {
        const authorizationHeader = req.header('Authorization');
        if (!authorizationHeader) {
            return res.status(401).json({ error: "Authentication Headers Not Found!" });
        }

        const token = authorizationHeader.replace('Bearer ', ''); // Remove 'Bearer ' from the header value

        console.log("Auth Attempt!");

        const verifytoken = jwt.verify(token, secret_key);

        var rootUser = await User.findOne({ _id: verifytoken._id, "tokens.token": token });

        if (!rootUser) {
            return res.status(404).json({ error: "User Not Found!" });
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: "Unauthorized User!!" });
    }
}

module.exports = auth;
