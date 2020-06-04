const express = require('express'),
    router = express.Router({mergeParams: true}),
    passport = require('passport'),
    User = require('../models/user')

router.get("/", function(req, res){
    res.render("home");
});
// signup route
router.get("/register", function(req, res){
    res.render("register")
})
router.post("/register", function(req, res){
    var userNew = new User({username: req.body.username})
    User.register(userNew, req.body.password, (err, user) => {
        if(err){
            console.log(err)
            return res.redirect("/register")
        }
        console.log(user)
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds")
        })
    })
})
// login routes
router.get("/login", function(req, res) {
    res.render("login")
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),(req, res) => {   
})

// logout
router.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/campgrounds")
})

module.exports = router