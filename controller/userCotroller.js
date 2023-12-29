const User = require("../models/userModels");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    //create Token
    const token = createToken(user._id);

    res.status(200).json({ email, token, id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
const signupUser = async (req, res) => {
  const { name, contact, email, dateofBirth, gender, city, password } =
    req.body;

  try {
    const user = await User.signup(
      name,
      contact,
      email,
      dateofBirth,
      gender,
      city,
      password
    );

    //create Token
    const token = createToken(user._id);

    res.status(200).json({ email, token, id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
