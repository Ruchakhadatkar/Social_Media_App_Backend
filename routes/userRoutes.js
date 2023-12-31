const express = require("express");
//controller
const { signupUser, loginUser, getUserInfo, updateUseInfo } = require("../controller/userCotroller");
const { route } = require("./friendRequestRoute");
const router = express.Router();

//login route
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

router.get("/userInfo/:id", getUserInfo)

router.put("/:id", updateUseInfo)

module.exports = router;
