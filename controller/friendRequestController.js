const Request = require("../models/friendRequestModel");
const Friends = require("../models/friendsModel");
const User = require("../models/userModels");

const sendFriendRequest = async (req, res) => {
  const { senderUserId, receiverUserId, status } = req.body;
  try {
    if (!senderUserId && !receiverUserId) {
      return res.json({ error: "Sender or Receiver required", success: false });
    }
    const data = new Request({
      senderUserId,
      receiverUserId,
      status,
    });
    await data.save();
    return res.json({ data, success: true });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const acceptFriendRequest = async (req, res) => {
  const { reqId, status } = req.body;

  try {
    const data = await Request.findByIdAndUpdate(reqId, { status });
    if (data) {
      const friend = new Friends({
        userId1: data.senderUserId,
        userId2: data.receiverUserId,
      });
      await friend.save();
      return res.json({ data: friend, success: true });
    }
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const declineFriendRequest = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      return res.json({ error: "Request Id is invalid", success: false });
    }
    const data = await Request.findByIdAndDelete(id);
    return res.json({ data, success: true });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const getAllFriendRequest = async (req, res) => {
  const userId = req.query.id;
  try {
    if (!userId) {
      return res.json({ error: "User Id is required", success: false });
    }
    const data = await Request.find({ receiverUserId: userId }).populate(
      "senderUserId"
    );
    return res.json({ data, success: true });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const findFriend = async (req, res) => {
  const userId = req.query.id;
  const searchQuery = req.query.q || ""; // Get the search query from the request parameters

  try {
    // Get the IDs of the user's current friends
    const currentFriends = await Friends.find({
      $or: [{ userId1: userId }, { userId2: userId }],
      status: "accepted",
    }).select("userId1 userId2 -_id");

    const currentFriendIds = currentFriends.map((friendship) =>
      friendship.userId1.equals(userId)
        ? friendship.userId2
        : friendship.userId1
    );

    const friendRequests = await Request.find({
      $or: [
        { senderUserId: userId, status: "pending" },
        { receiverUserId: userId, status: "pending" },
      ],
    }).select("senderUserId receiverUserId -_id");


    const requestedFriendIds = friendRequests.map((request) =>
    request.senderUserId.equals(userId)
      ? request.receiverUserId
      : request.senderUserId
  );
    // Get the IDs of users who have sent or received friend requests to/from the current user
    // const requestedFriendships = await Request.find({
    //   $or: [
    //     { senderUserId: userId },
    //     { receiverUserId: userId },
    //     { status: { $ne: "pending" } },
    //   ],
    // }).select("senderUserId receiverUserId -_id");

    // Combine IDs of current friends and requested friends to exclude them
    const excludedFriendIds = [
      ...currentFriendIds,
      ...requestedFriendIds,
      userId,
    ];

    // Find users who are not current friends or requested friends
    const potentialFriends = await User.find({
      _id: { $nin: excludedFriendIds },
    }).select("name email -_id");

    res.json({ data: potentialFriends, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  getAllFriendRequest,
  findFriend,
};

// app.get("/find-friends/:userId", async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     // Get the IDs of the user's current friends
//     const currentFriends = await Friendship.find({
//       $or: [{ userID1: userId }, { userID2: userId }],
//       status: "Accepted",
//     }).select("userID1 userID2 -_id");

//     const currentFriendIds = currentFriends.map((friendship) =>
//       friendship.userID1.equals(userId)
//         ? friendship.userID2
//         : friendship.userID1
//     );

//     // Get the IDs of users who have sent or received friend requests to/from the current user
//     const friendRequests = await FriendRequest.find({
//       $or: [
//         { senderUserID: userId, status: "Pending" },
//         { receiverUserID: userId, status: "Pending" },
//       ],
//     }).select("senderUserID receiverUserID -_id");

//     const requestedFriendIds = friendRequests.map((request) =>
//       request.senderUserID.equals(userId)
//         ? request.receiverUserID
//         : request.senderUserID
//     );

//     // Combine IDs of current friends and users with pending friend requests to exclude them
//     const excludedFriendIds = [
//       ...currentFriendIds,
//       ...requestedFriendIds,
//       userId,
//     ];

//     // Find users who are not current friends or have pending friend requests
//     const potentialFriends = await User.find({
//       _id: { $nin: excludedFriendIds },
//     }).select("username email -_id");

//     res.json(potentialFriends);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.get("/find-friends/:userId", async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     // Get the IDs of the user's current friends
//     const currentFriends = await Friendship.find({
//       $or: [{ userID1: userId }, { userID2: userId }],
//       status: "Accepted",
//     }).select("userID1 userID2 -_id");

//     const currentFriendIds = currentFriends.map((friendship) =>
//       friendship.userID1.equals(userId)
//         ? friendship.userID2
//         : friendship.userID1
//     );

//     // Get the IDs of users who have sent or received friend requests to/from the current user
//     const requestedFriendships = await FriendRequest.find({
//       $or: [{ senderUserID: userId }, { receiverUserID: userId }],
//       status: "Pending",
//     }).select("senderUserID receiverUserID -_id");

//     const requestedFriendIds = requestedFriendships.map((request) =>
//       request.senderUserID.equals(userId)
//         ? request.receiverUserID
//         : request.senderUserID
//     );

//     // Combine IDs of current friends and requested friends to exclude them
//     const excludedFriendIds = [
//       ...currentFriendIds,
//       ...requestedFriendIds,
//       userId,
//     ];

//     // Find users who are not current friends or requested friends
//     const potentialFriends = await User.find({
//       _id: { $nin: excludedFriendIds },
//     }).select("username email -_id");

//     res.json(potentialFriends);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });
