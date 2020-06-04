const express = require('express')
var router = express.Router({mergeParams: true})
const Campground = require('../models/campground')
const vcharServices = require('../services/vchar-services')
router.get("", function(req, res){
    Campground.find({}, (err, campgrounds) => {
        if(err){
            console.log('error: '+ err)
            //handle error and show on the front-end
        }else{
            res.render("campgrounds/campgrounds", {campgrounds_list: campgrounds});
        }
    })
    
});

router.post("", vcharServices.isLoggedIn, function(req, res){
    // validate what's coming in campground
    // validateCampground(req.body.campground)
    console.log(JSON.stringify(req.body))
    var tempAuthor = {
        id: req.user._id,
        username: req.user.username
    }
    
    var tempCampground = { 
        name: req.body.campground.name,
        image: req.body.campground.image,
        description: req.body.campground.description,
        author: tempAuthor
    }
    Campground.create(
       tempCampground
    , (err, newcampground) => {
        if(err){
            console.log(err)
            // handle error
        }else{
            console.log(newcampground)
            // redirect to campground page
            res.redirect("/campgrounds")  
            //when fully restful it will return the json itself for the created campground      
        }
    })
    
    
});

router.get("/new",vcharServices.isLoggedIn, function(req, res){
    res.render("campgrounds/new")
});
router.get("/:id", function(req, res){
    // show the information about particular campground
    //find the camground with the id
    const id = req.params.id
    Campground.findById(id).populate("comments").exec( (err, rcampground) => {
        if(err){
            console.log("error: " + err)
            //give 404 page or some kind of error page
            res.render("notFound")
        }else{
            // console.log(rcampground)
            res.render( "campgrounds/show", {camp: rcampground})
        }
    })
})
router.get("/:id/edit",vcharServices.isCampgroundAssociated, (req, res)=>{
   
    Campground.findById(req.params.id, (err, foundcampground)=>{
        if(err){
            console.log("error in get edit : " + err)
            res.render("notFound")
        }else{
            res.render("campgrounds/edit",{camp: foundcampground})
        }
    })
    
})

router.put("/:id",vcharServices.isCampgroundAssociated, (req, res) => {
    
    // find the campground and update with the information given
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err){
            console.log("error in campground put request : " + err)
            res.render("notFound")
        }else{
            res.redirect(`/campgrounds/${req.params.id}`)
        }
    })
})

router.delete("/:id",vcharServices.isCampgroundAssociated, (req, res) => {
    Campground.findByIdAndDelete(req.params.id, (err, removedCampground) => {
         if(err){
            console.log("error in campground delete request: " + err)   
        }else{
            console.log("successfully deleted : " + removedCampground._id)
         }
         res.redirect("/campgrounds")
     })
 })
module.exports = router