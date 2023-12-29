const Likes = require("../models/likedModel");

const likePost = async (req, res) => {
  const { userId, postId } = req.body;
  try {
    // Check if the user has already liked the post
    const existingLike = await Likes.findOne({
      postId: postId,
      userId: userId,
    });
    if (existingLike) {
      return res.status(400).json({ message: "User already liked the post" });
    }
    const data = new Likes({ userId, postId });
    await data.save();
    res.json({ data, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

const disLikePost = async (req, res) => {
  const { postId, userId } = req.query;

  try {
    const existingLike = await Likes.findOne({ postId, userId });
    if (!existingLike) {
      return res.status(400).json({ message: "User has not liked the post" });
    }
    await existingLike.deleteOne();

    res.json({ data: existingLike, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

module.exports = {
  likePost,
  disLikePost,
};
