const User = require('../models/user');

const existingUser = async (req, res, next) => {
    try {
        const { user }  = req.body;
        console.log("in existing user validation: ", req.body)
        const email = user.email;

        var userExist = await User.findOne({ email });

        if (userExist) {
            console.log("User already exist!")
            return res.status(409).json({ error: "User already exist!" });
        }
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong!" });
    }
}

module.exports = existingUser;
