const Post = require("../models/postModel");

const User = require("../models/userModels");

const userPost = async (req, res) => {
  const { caption, image, userId, likedUsers } = req.body;

  const data = Post({ caption, image, userId, likedUsers });

  await data.save();
  console.log(data);
  res.json(data) 
};

module.exports = {
  userPost,
};
