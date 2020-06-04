var express = require('express'),
    app = express(), 
    bodyparser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    expressSession = require("express-session"),
    methodOverride = require("method-override")
const config = require('./config'),
    PORT = config.app.port,
    {db:{ user, password, dbname, protocol, host}} = config,
    connectionString = `${protocol}://${user}:${password}@${host}`

const Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user")
//useUnifiedTopology to use the server discovery and monitoring engine
    mongoose.connect(connectionString
    , {useNewUrlParser: true, useUnifiedTopology: true ,dbName: dbname}); 
// authentication related code
app.use(expressSession({
    secret:"ashdekjjnfdkdsrkccnnskdljrithjjsdf",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))//authenticate method is coming from passportLocalMongoose
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
// to read urlencoded request body like key1=value1&key2=value2 we also have for json raw and other formats
app.use(bodyparser.urlencoded({extended: true}));//this reads and parse form data
app.set("view engine", "ejs");
// adding a middleware to give user to every route
app.use( (req, res, next) => {
    res.locals.currentUser = req.user
    next()
})
// method override to use put and delete http methods
app.use(methodOverride("_method"))
// =====================
//       ROUTES
// =====================
const campgroundRoutes = require("./routes/campground"),
    indexRoutes = require("./routes/index"),
    commentRoutes = require("./routes/comment")

app.use(indexRoutes)
app.use("/campgrounds",campgroundRoutes)
app.use("/campgrounds/:id/comments",commentRoutes)

app.get("*", function(req, res){
    res.render("notFound")
})
app.listen(PORT, function(){
    console.log(`vichar patt server is listening on port : ${PORT}`);
})