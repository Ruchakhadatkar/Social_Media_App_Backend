const express = require("express");
const { likePost, disLikePost } = require("../controller/likeController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.post("/", requireAuth, likePost);
router.delete("/", requireAuth, disLikePost);

module.exports = router;
