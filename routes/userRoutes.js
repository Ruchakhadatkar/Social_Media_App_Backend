const express = require("express");
//controller
const {
  signupUser,
  loginUser,
  getUserInfo,
  updateUseInfo,
} = require("../controller/userCotroller");
const { route } = require("./friendRequestRoute");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

//login route
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

router.get("/userInfo/:id", requireAuth, getUserInfo);

router.put("/:id", requireAuth, updateUseInfo);

module.exports = router;
