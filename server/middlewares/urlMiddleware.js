const FREE_USER_URL_COUNT = process.env["FREE_USER_URL_COUNT"];
const PREMIUM_USER_URL_COUNT = process.env["PREMIUM_USER_URL_COUNT"];

const urlLimitCheck = async (req, res, next) => {
  try {
    console.log("Checking")
    var userCheck = req.rootUser;
    if (!userCheck.isPremiumUser) {
      console.log("Checking1")
      if (userCheck.urlCount + 1 > FREE_USER_URL_COUNT) {
        console.log("Checking3")
        return res.status(400).json({
          error: "Maximum URL limit exceeded, Please upgrade your account.",
        });
      }
    } else {
      console.log("Checking2")
      if (userCheck.urlCount + 1 > PREMIUM_USER_URL_COUNT) {
        return res.status(400).json({
          error:
            "Premium Account maximum URL limit exceeded, Please delete existing links before creating new one!",
        });
      }
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const urlBannedCheck = async (req, res, next) => {
  try {
    var url = req.url;
    if (url.isBanned) {
        return res.status(400).json({
          error: "URL is banned, can't perform any actions!",
        });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const isOwnerOfUrl = async (req, res, next) => {
  try {
    if(req.userId == req.url.userID){
      next();
    }else{
      return res.status(401).json({
        error: "You are unauthorized to do this action!",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}

module.exports = { urlLimitCheck, urlBannedCheck, isOwnerOfUrl };
