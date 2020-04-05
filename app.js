var express = require('express');
var app = express();
var PORT = 3000;
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended: true}));//this reads and parse form data
app.set("view engine", "ejs");
app.get("/", function(req, res){
    res.render("home.ejs");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name:"kili monjaro", image:"https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"},
        {name:"Hutri durga", image:"https://images.unsplash.com/photo-1500581276021-a4bbcd0050c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60"},
        {name:"Kala pani", image:"https://images.unsplash.com/photo-1528892677828-8862216f3665?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60"}
    ];
    res.render("campgrounds", {campgrounds_list: campgrounds});
});

app.post("/campgrounds", function(req, res){
    // get the data from form
    var name = req.body.name;
    var image = req.body.image;
    // redirect to campground page
});

app.get("/campgrounds/new", function(req, res){
    res.render("newCamp")
});
app.get("*", function(req, res){
    res.render("notFound")
})
app.listen(PORT, function(){
    console.log(`vichar patt server is listening on port : ${PORT}`);
})