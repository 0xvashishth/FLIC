const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const secret_key = process.env['JWT_SECRET_ADMIN'];

const authAdmin = async (req, res, next) => {
    try {
        const authorizationHeader = req.header('Authorization');
        if (!authorizationHeader) {
            return res.status(401).json({ error: "Authentication Headers Not Found!" });
        }

        const token = authorizationHeader.replace('Bearer ', '');

        console.log("Auth Attempt!");

        const verifytoken = jwt.verify(token, secret_key);

        var rootAdmin = await Admin.findOne({ _id: verifytoken._id, "tokens.token": token });

        if (!rootAdmin) {
            return res.status(404).json({ error: "Admin Not Found!" });
        }

        req.rootAdmin = rootAdmin;
        req.adminId = rootAdmin._id;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: "Something went wrong!" });
    }
}

module.exports = authAdmin;
