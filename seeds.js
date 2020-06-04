var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

const config = require('./config'),
    // PORT = config.app.port,
    {db:{ user, password, dbname, protocol, host}} = config,
    connectionString = `${protocol}://${user}:${password}@${host}`
    mongoose.connect(connectionString, {useNewUrlParser: true, dbName: dbname});
var seeds = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
 
async function seedDB(){
    let t0 = Date.now()
   //Remove all campgrounds
   await Campground.deleteMany({})
   console.log("removed campgrounds!");
   await Comment.deleteMany({})
   console.log("removed comments!");
   for(let seed of seeds){
       let campground = await Campground.create(seed)
       console.log("added a campground");
        // create comment
        let comment = await Comment.create({
            text: "This place is great, but I wish there was internet",
            author: "Homer"
        })
        // add comment to that campground
        campground.comments.push(comment);
        await campground.save();
        console.log("Created new comment");
   }
   let t1 = Date.now()
   console.log("seeding took "+ (t1-t0) +" ms")
    //add a few comments
    await mongoose.connection.close()
}

module.exports = seedDB;