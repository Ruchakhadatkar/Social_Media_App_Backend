const Friends = require("../models/friendsModel");
const Post = require("../models/postModel");
const Likes = require("../models/likedModel");

const User = require("../models/userModels");

const userPost = async (req, res) => {
  const { caption, image, userId } = req.body;
  try {
    if (!userId) {
      return res.json({ error: "User required", success: false });
    }
    if (!caption && !image) {
      return res.json({ error: "Caption or Image required", success: false });
    }
    const data = Post({ caption, image, userId });
    await data.save();
    return res.json({ data, success: true });
  } catch (error) {
    return res.json({ error: error.message, success: false });
  }
};

const getPost = async (req, res) => {
  const userId = req.query.id;
  // replace with the user's ID
  const { limit, skip } = req.query;
  try {
    const user = await User.findById(userId);

    // Get friends' IDs from the Friendship table
    const friendIds = await Friends.find({
      $or: [{ userId1: userId }, { userId2: userId }],
    }).select("userId1 userId2 _id");

    const allFriendIds = friendIds.map((friendship) =>
      friendship.userId1.equals(userId)
        ? friendship.userId2
        : friendship.userId1
    );

    // Include the user's own ID
    allFriendIds.push(userId);

    // Find posts of friends and the user
    const posts = await Post.find({ userId: { $in: allFriendIds } })
      .sort({
        postDate: -1,
      })
      .populate("userId", "name profilePicture");

    // Populate the liked users for each post
    const postsWithLikes = await Promise.all(
      posts.map(async (post) => {
        const likedUsers = await Likes.find({ postId: post._id }).populate(
          "userId",
          "name _id"
        );
        return { ...post._doc, likedUsers };
      })
    );
    const newPostwithLikes = postsWithLikes.splice(skip, limit);
    res.json(newPostwithLikes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  userPost,
  getPost,
};
