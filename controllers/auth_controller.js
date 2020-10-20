const UserModel = require("../models/user");

function registerNew(req, res) {
    res.render("authentication/register", { loggedIn: req.user });
}

async function registerCreate(req, res, next) {
    const { email, password, display_name } = req.body;
    const user = await UserModel.create({ email, password, display_name });
    
    req.login(user, (err) => {
        if (err) {
            return next(err);
        }

        res.redirect("/");
    });
}

function logout(req, res) {
    req.logout();
    res.redirect("/");
}

function loginNew(req, res) {
    res.render("authentication/login", { loggedIn: req.user });
}

module.exports = {
    registerNew,
    registerCreate,
    logout,
    loginNew
}