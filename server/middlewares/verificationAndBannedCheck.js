const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secret_key = process.env['JWT_SECRET'];

const verificationAndBannedCheck = async (req, res, next) => {
    try {
        var userCheck = req.rootUser;

        if (!userCheck.isEmailVerified) {
            return res.status(401).json({ error: "Your email is not verified, Please check your email for verificatrion :)" });
        }

        if(userCheck.isBanned){
            return res.status(401).json({ error: "You are banned! Please contact developers!" });
        }
        
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: "Something went wrong!" });
    }
}

const verificationAndBannedCheckForLogin = async (user) => {
    try {
        var userCheck = user;

        if (!userCheck.isEmailVerified) {
            throw new Error("Your email is not verified, Please check your email for verification");
        }

        if(userCheck.isBanned){
            throw new Error("You are banned! Please contact developers!");
        }
        
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
}

module.exports = {verificationAndBannedCheck, verificationAndBannedCheckForLogin};
