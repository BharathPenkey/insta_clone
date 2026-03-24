const mongoose=require("mongoose");

const postSchema ={
    name:String,
    location:String,
    likes:Number,
    description:String,
    PostImage:String,
    date:String
}

const Post= mongoose.model("posts",postSchema);

module.exports = Post;
