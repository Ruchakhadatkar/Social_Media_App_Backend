const express = require("express");
const { likePost, disLikePost } = require("../controller/likeController");

const router = express.Router();

router.post("/", likePost)
router.delete("/", disLikePost)

module.exports = router;
