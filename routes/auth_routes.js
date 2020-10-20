const express = require('express');
const router = express.Router();
const passport = require("passport");
const { authRedirect } = require("../middleware/authorisation_middleware");
const {
    registerNew,
    registerCreate,
    logout,
    loginNew
} = require('../controllers/auth_controller');


// custom routes
router.get('/register', authRedirect, registerNew);
router.post('/register', registerCreate);

router.get('/login', authRedirect, loginNew)

router.get('/logout', logout);

// passport routes
router.post("/login", 
passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/user/login"
}));


module.exports = router;