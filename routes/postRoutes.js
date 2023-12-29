const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const { userPost, getPost } = require("../controller/postController");
const { route } = require("./friendRequestRoute");
const router = express.Router();

router.post("/", userPost);

router.get("/", getPost);

module.exports = router;

