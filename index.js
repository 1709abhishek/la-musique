const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportGithub = require("./config/passport-github-oAuth2-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const CustomMware = require("./config/middleware");

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//mongo store is used to store the session cookie in the db
app.use(
    session({
        name: "laMusique",
        // TODO change the secret before deployment in production mode
        secret: "blahsomething",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 100,
        },
        store: new MongoStore(
            {
                mongooseConnection: db,
                autoRemove: "disabled",
            },
            function (err) {
                console.log(err || "connect-mongo all set");
            }
        ),
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// flash messages middleware
app.use(flash());
app.use(CustomMware.setFlash);

// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
