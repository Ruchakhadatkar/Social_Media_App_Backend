const express = require('express')
// const requireAuth = require('../middleware/requireAuth')
const {userPost} = require("../controller/postController")
const router = express.Router()

router.post("/", userPost )

module.exports = router
