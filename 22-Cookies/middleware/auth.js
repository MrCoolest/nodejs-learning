const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.headers['authorization'];
    // console.log(userUid)
    if (!userUid) return res.redirect("/login");
    const token = userUid.split("Bearer ")[1];
    const user = getUser(token);

    if (!user) return res.redirect("/login");
    req.user = user;
    next();
}


module.exports = {
    restrictToLoggedinUserOnly
}