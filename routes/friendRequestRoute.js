const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  getAllFriendRequest,
  findFriendRequest,
  findFriend,
} = require("../controller/friendRequestController");

const router = express.Router();

router.post("/", sendFriendRequest);
router.put("/", acceptFriendRequest);
router.delete("/:id", declineFriendRequest);
router.get("/", getAllFriendRequest);
router.get("/findFriend", findFriend);

module.exports = router;
