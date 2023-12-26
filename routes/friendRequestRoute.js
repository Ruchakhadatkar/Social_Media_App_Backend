const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const { sendFriendRequest, acceptFriendRequest } = require('../controller/friendRequestController')

const router = express.Router()

router.post("/", sendFriendRequest )
router.put("/", acceptFriendRequest)

module.exports = router