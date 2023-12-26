const Request = require("../models/friendRequestModel");

const sendFriendRequest = async (req, res) => {
  const { senderUserId, receiverUserId, status, requestDate } = req.body;

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

const acceptFriendRequest = (req,res)=>{
   
}

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
};
