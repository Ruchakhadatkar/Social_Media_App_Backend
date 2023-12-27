const Request = require("../models/friendRequestModel");
const Friends = require("../models/friendsModel");

const sendFriendRequest = async (req, res) => {
  const { senderUserId, receiverUserId, status} = req.body;

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
  const { reqId } = req.body;

  try {
    if (!reqId) {
      return res.json({ error: "Request Id is required", success: false });
    }
    const data = await Request.findByIdAndDelete(reqId);
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
    const data = await Request.find({ receiverUserId: userId });
    return res.json({ data, success: true });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  getAllFriendRequest,
};
