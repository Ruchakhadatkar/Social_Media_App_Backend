const Post = require("../models/postModel");

const User = require("../models/userModels");

const userPost = async (req, res) => {
  const { caption, image, userId, content, likedUsers } = req.body;

  const data = Post({ caption, image, userId,content, likedUsers });

  await data.save();
  // console.log(data);
  res.json(data);
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
