const express = require('express')
//controller 
const {signupUser, loginUser} = require('../controller/userCotroller')
const router = express.Router()

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)


module.exports = router