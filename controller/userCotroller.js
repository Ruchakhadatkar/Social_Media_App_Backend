const Friends = require("../models/friendsModel");
const Like = require("../models/likedModel");
const Post = require("../models/postModel");
const User = require("../models/userModels");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    //create Token
    const token = createToken(user._id);

    res.status(200).json({ email, token, id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
const signupUser = async (req, res) => {
  const { name, contact, email, dateofBirth, gender, city, password } =
    req.body;

  try {
    const user = await User.signup(
      name,
      contact,
      email,
      dateofBirth,
      gender,
      city,
      password
    );

    //create Token
    const token = createToken(user._id);

    res.status(200).json({ email, token, id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserInfo = async (req, res) => {
  const { id } = req.params
  try {
    // Get user's basic information
    const user = await User.findById(id).select("name email contact dateofBirth city _id");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get friends' IDs from the Friendship table
    const friendIds = await Friends.find({
      $or: [{ userId1: id }, { userId2: id }],
      status: "accepted",
    }).select("userId1 userId2 -_id");

    const allFriendIds = friendIds.map((friendship) =>
      friendship.userId1.equals(id)
        ? friendship.userId2
        : friendship.userId1
    );

    // Include the user's own ID
    allFriendIds.push(id);

    // Get user's friends
    const friends = await User.find({ _id: { $in: allFriendIds } }).select(
      "name email -_id"
    );

    // Get user's posts
    const posts = await Post.find({ userId: id }).sort({ postDate: -1 });

    // Populate the liked users for each post
    const postsWithLikes = await Promise.all(
      posts.map(async (post) => {
        const likedUsers = await Like.find({ postId: post._id }).populate(
          "userId",
          "name _id"
        );
        return { ...post._doc, likedUsers };
      })
    );

    res.json({
      user,
      friends,
      posts: postsWithLikes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const updateUseInfo= async(req,res)=>{
  const {id}= req.params
  const {profilePicture}= req.body
  try {
    const data = await User.findByIdAndUpdate(id, {profilePicture})
    res.json(data)
  } catch (error) {
    console.error(error);
  }

}

module.exports = { signupUser, loginUser, getUserInfo, updateUseInfo };

// app.get('/user-profile/:userId', async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     // Get user's basic information
//     const user = await User.findById(userId).select('username email -_id');

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Get friends' IDs from the Friendship table
//     const friendIds = await Friendship.find({
//       $or: [{ userID1: userId }, { userID2: userId }],
//       status: 'Accepted'
//     }).select('userID1 userID2 -_id');

//     const allFriendIds = friendIds.map(friendship => friendship.userID1.equals(userId) ? friendship.userID2 : friendship.userID1);

//     // Include the user's own ID
//     allFriendIds.push(userId);

//     // Get user's friends
//     const friends = await User.find({ _id: { $in: allFriendIds } }).select('username email -_id');

//     // Get user's posts
//     const posts = await Post.find({ userID: userId }).sort({ postDate: -1 });

//     // Populate the liked users for each post
//     const postsWithLikes = await Promise.all(posts.map(async post => {
//       const likedUsers = await Like.find({ postID: post._id }).populate('userID', 'username -_id');
//       return { ...post._doc, likedUsers };
//     }));

//     res.json({
//       user,
//       friends,
//       posts: postsWithLikes,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });
