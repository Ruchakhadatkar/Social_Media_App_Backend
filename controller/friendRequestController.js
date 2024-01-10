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
      await Request.findByIdAndDelete(reqId);
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

    // Combine IDs of current friends and requested friends to exclude them
    const excludedFriendIds = [
      ...currentFriendIds,
      ...requestedFriendIds,
      userId,
    ];

    // Find users who are not current friends or requested friends
    const potentialFriends = await User.find({
      _id: { $nin: excludedFriendIds },
      name: { $regex: searchQuery, $options: "i" },
    }).select("name email _id profilePicture");

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
