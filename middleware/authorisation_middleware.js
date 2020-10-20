function authRedirect(req, res, next) {
    if (req.user) {
        return res.redirect("/");
    }

    return next();
}

function authorise(req, res, next) {
    if (req.user) {
        return next();
    }

    return res.redirect("/");
}

module.exports = {
    authRedirect,
    authorise
}