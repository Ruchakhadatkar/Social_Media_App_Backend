const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const { sendFriendRequest, acceptFriendRequest, declineFriendRequest, getAllFriendRequest } = require('../controller/friendRequestController')

const router = express.Router()

router.post("/", sendFriendRequest )
router.put("/", acceptFriendRequest)
router.delete("/", declineFriendRequest)
router.get("/", getAllFriendRequest)

module.exports = router