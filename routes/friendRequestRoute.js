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

router.post("/", requireAuth, sendFriendRequest);
router.put("/", requireAuth, acceptFriendRequest);
router.delete("/:id", requireAuth, declineFriendRequest);
router.get("/", requireAuth, getAllFriendRequest);
router.get("/findFriend", requireAuth, findFriend);

module.exports = router;
