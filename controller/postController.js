const Post = require("../models/postModel");

const User = require("../models/userModels");

const userPost = async (req, res) => {
  const { caption, image, userId } = req.body;

  try {
    if(!userId ){
      return res.json({error: "User required", success: false})

    }
    if( !caption || !image){
      return res.json({error: "Caption or Image required", success: false})
    }

    const data = Post({ caption, image, userId });

    await data.save();
    // console.log(data);
    return res.json(data);

  } catch (error) {
    return res.json({error: error.message, success: false} )
  }

 
};

// const getPost  = async (req, res)=>{
//   const data = await Post.find()

//   res.json(data)
// }

const getPost = async (req, res) => {
  
  try {
    const posts = await Post.find();

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

module.exports = {
  userPost,
  getPost,
};
