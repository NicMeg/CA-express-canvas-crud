const express = require('express')
const mongoose = require('mongoose')
const Drawing = require('./models/drawing')
const drawingRouter = require('./routes/drawings')
const methodOverride = require('method-override')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')(expressSession);
const passport = require('passport');

// imported routes
const authRouter = require('./routes/auth_routes');

const app = express()

// express session
app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { expires: 600000 },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

const dbConn = 'mongodb://localhost/canvas_app'
// Set three properties to avoid deprecation warnings:
// useNewUrlParser: true
// useUnifiedTopology: true
// useFileAndModify: false
mongoose.connect(dbConn, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    (err) => {
        if (err) {
            console.log('Error connecting to database', err);
        } else {
            console.log('Connected to database!');
        }
    });

// passport
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// ejs
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.use(express.static('public'))

app.get('/', async (req, res) => {
  const drawings = await Drawing.find().sort({ createdAt: 'desc'})
  res.render('drawings/index', { drawings: drawings, loggedIn: req.user, current_user: req.session.passport.user })
})

app.use('/drawings', drawingRouter)

// Authorisation routes
app.use('/user', authRouter);

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Blog express app listening on port ${port}`);
});