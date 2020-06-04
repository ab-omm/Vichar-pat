const Campground = require("../models/campground"),
    Comment = require('../models/comment')
const express = require('express'),
    router = express.Router({ mergeParams: true })
const v4Services = require("../services/vchar-services")

router.get("/new", v4Services.isLoggedIn, function(req, res){
    // const id = req.params.id
    // find camp
   Campground.findById(req.params.id).then(foundcampground => res.render("comments/new", {camp : foundcampground}))
    
})

router.post("", v4Services.isLoggedIn, async(req, res) =>{
    let rec_comment = {}
    rec_comment.text = req.body.comment
    let camp = await Campground.findById(req.params.id)
    // add username to comment
    rec_comment.author = {}
    rec_comment.author.id = req.user._id
    rec_comment.author.username = req.user.username
    //create comment
    let create_comment = await Comment.create(rec_comment)
    camp.comments.push(create_comment)
    await camp.save()
    res.redirect(`/campgrounds/${req.params.id}`)
})

router.get("/:comment_id/edit", v4Services.isCommentAssociated, async (req, res) => {
    foundCamp = await Campground.findById(req.params.id)
    foundComment = await Comment.findById(req.params.comment_id)
    // foundComment = foundCamp.comments.filter( comment => comment.author.id.equals(req.params.comment_id) )
    // if(foundComment.length === 1)
    res.render("comments/edit", { comment:foundComment , camp: foundCamp })
    // res.send("no comments found with this Id")
})

router.put("/:comment_id", v4Services.isCommentAssociated, async (req, res) => {
    updatedComment = await Comment.findByIdAndUpdate( req.params.comment_id, {text : req.body.comment })
    res.redirect(`/campgrounds/${req.params.id}`)
} )

router.delete("/:comment_id", v4Services.isCommentAssociated, async (req, res) => {
    try{
        await Comment.findByIdAndDelete(req.params.comment_id)
    }catch(e){
        console.log()
        res.send("not able to delete your comment")
    }
    res.redirect(`/campgrounds/${req.params.id}`)
})
module.exports = router