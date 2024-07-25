const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user - (need to add unique username validator !!!)
const signupUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.signup(username, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addCollaborator = async (req, res) => {
  const { mainCollaborator, subCollaborator } = req.body
  try {
    const subUser = await User.findOne({ username: subCollaborator });
    if (!subUser) {
      return res.status(404).json({ error: "No such blog" });
    }
    if (subUser.collaborators.includes(mainCollaborator)) {
      return res.status(404).json({ error: "Already a collaborator" })
    }
    else {
      subUser.collaborators.push(mainCollaborator);
      await subUser.save();
      res.status(200).json(subUser);
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { loginUser, signupUser, addCollaborator };
