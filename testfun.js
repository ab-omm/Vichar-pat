// function seedDBPromise(){
    //     // let t0 = Date.now()
    //    //Remove all campgrounds
    //    Campground.deleteMany({}).
    //     then(()=>console.log("removed campgrounds!")).
    //     catch((err) => console.log(`error in deleting campground ${err}`))
    //    Comment.deleteMany({}).
    //     then(()=>console.log("removed Comments!")).
    //     catch((err) => console.log(`error in deleting comment ${err}`))
    //    for(let seed of seeds){
    //        Campground.create(seed).then(campground => {
    //         console.log("added a campground");
    //         Comment.create({
    //             text: "This place is great, but I wish there was internet",
    //             author: "Homer"
    //             }).then(comment => {
    //                 campground.comments.push(comment);
    //                 campground.save().then(()=>{
    //                     console.log("Created new comment");
    //                 })
    //             }).
    //             catch((err) => console.log(`error in creating comment ${err}`))
    //        }).catch((err) => console.log(`error in creating campground ${err}`))
    //    }
    // //    let t1 = Date.now()
    // //    console.log("seeding took "+ (t1-t0) +" ms")
    //     //add a few comments
    //     mongoose.connection.close().then(()=>{
    //         console.log("connection closed")
    //     })
    // }
    // seedDB()
let t0 = Date.now()
seedDBPromise()
let t1 = Date.now()
console.log("seeding took "+ (t1-t0) +" ms")
