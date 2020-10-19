const express = require('express')
const app = express()
const port = process.env.port || 3009;
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// routes
const authRoutes = require('./routes/auth_routes')



app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.render('home'))

app.use('/register', authRoutes )

app.listen(port, () => console.log(`Example app listening on port ${port}!`))