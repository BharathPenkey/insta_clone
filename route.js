const express = require("express");
const router= express.Router();
const Post = require("./model");

async function fixLikes() {
  try {
    await Post.updateMany({}, [
      {
        $set: {
          likes: {
            $convert: { input: "$likes", to: "int", onError: 0, onNull: 0 }
          }
        }
      }
    ]);
    console.log("All likes fields converted to numbers ✅");
  } catch (err) {
    console.error("Error converting likes:", err);
  }
}

// Run fix once when server starts
fixLikes();

router.route("/posts").post(async (req,res)=>{
    
    try{
        const { name, location, likes, description, PostImage, date } = req.body;
         const newPost = new Post({
      name,
      location,
      likes: Number(likes) || 0,  // ✅ convert to number
      description,
      PostImage,
      date,
    });
   const createdPost = await Post.create(newPost);
    res.json({ status: "success", result: createdPost });
  } catch (e) {
    res.status(500).json({ status: "failed", result: e.message });
  }
});

router.route("/posts").get( async (req,res)=>{
   await Post.find()
    .then((data)=>res.json(data))
});


// put 

router.put("/post/:id/like", async (req, res) => {
  try {
    // Optional: Convert existing string likes to number before incrementing
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ status: "failed", result: "Post not found" });

    // Fix non-numeric likes if needed
    if (typeof post.likes !== "number") {
      post.likes = Number(post.likes) || 0;
      await post.save();
    }

    // Increment likes by 1
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    res.json({ status: "success", result: updatedPost });
  } catch (err) {
    res.status(500).json({ status: "failed", result: err.message });
  }
});

module.exports= router;


