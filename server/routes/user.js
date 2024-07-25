const express = require("express");

// controller functions
const { loginUser, signupUser, addCollaborator } = require("../controllers/userController");

const router = express.Router();

// login route
router.post("", loginUser);

// signup route
router.post("/signup", signupUser);

// adding main document owner to collaborators
router.patch("/blogs/create", addCollaborator)

module.exports = router;
