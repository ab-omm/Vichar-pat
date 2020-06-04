const Campground = require("../models/campground"),
    User = require("../models/user"),
    Comment = require("../models/comment")

const v4services = {}

v4services.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

v4services.isCampgroundAssociated = async (req, res, next) => {
    // find the current user own the campground
    // assume req params has the campground id
    try{
        let foundCampground =  await Campground.findById(req.params.id)
        if(req.user && foundCampground.author.id.equals(req.user._id)){
            return next()
        }
    }catch(e){
        console.log(e)
        return res.redirect("back")
    }
    return res.redirect("back")
}

v4services.isCommentAssociated = async (req, res, next) => {
    try{
        let foundComment = await Comment.findById(req.params.comment_id)
        if( req.user && foundComment.author.id.equals(req.user._id)){
            return next()
        }
    }catch(e){
        console.log(`error in isCommentAssociated : ${e}`)
    }
    return res.redirect("back")
}

module.exports = v4services