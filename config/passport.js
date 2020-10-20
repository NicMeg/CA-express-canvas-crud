const passport = require("passport");
const LocalStrategy = require("passport-local");
const UserModel = require("./../models/user");

passport.serializeUser((user, done) => {
    // attaches the logged in 'user._id' to 'req.session.passport.user' - this is in the cookie
    done(null, user._id);
});

// uses the ID from the cookie put there by serializeUser()
// it retrieves user information based on this ID
passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

passport.use(new LocalStrategy({
        // normally takes arguments username/password
        // here we're changing username to 'email' as this login form requires the users email address
        // can also change the password field to anything as well ie. passwordField: 'passwd'
        usernameField: "email"
    },
    // verify callback 
    // passes in arguments which were the inputs submitted via the login form
    async (email, password, done) => {
        // searches database in collection 'user' (based on the model), looking for a document matching the email field
        const user = await UserModel.findOne({ email })
            .catch(done);
        // verifyPasswordSync() is a bcrypt function
        if (!user || !user.verifyPasswordSync(password)) {
            // returns null/false if the user credentials are invalid
            // done() is the passport equivalent of next()
            return done(null, false);
        }
        // validation successful and returns the user
        return done(null, user);
    }
));