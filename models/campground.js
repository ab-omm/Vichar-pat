const mongoose = require("mongoose")
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        username: String
    }
})
module.exports = mongoose.model("Campground", campgroundSchema)