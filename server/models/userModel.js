const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

// add time logged in or smth here, and then do not allow log in at new session if  (or basically figure this out)
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  collaborators: {
    type: [String],
    required: false
  }
});

// static signup method
userSchema.statics.signup = async function (username, password) {
  // validation
  console.log("hereee");
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  // Later on add email, and email verification & OAuth 2.0 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const exists = await this.findOne({ username });

  if (exists) {
    throw Error("Username already exists");
  }

  // higher number - more safe but more time
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw Error("Incorrect username");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);

// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const validator = require("validator");
// const { v4: uuidv4 } = require('uuid');

// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   collaborators: {
//     type: [String],
//     required: false
//   },
//   lastLoggedIn: {
//     type: Date,
//     required: false
//   },
//   sessionToken: {
//     type: String,
//     required: false
//   }
// });

// // static signup method
// userSchema.statics.signup = async function (username, password) {
//   // validation
//   if (!username || !password) {
//     throw Error("All fields must be filled");
//   }

//   if (!validator.isStrongPassword(password)) {
//     throw Error("Password not strong enough");
//   }

//   const exists = await this.findOne({ username });

//   if (exists) {
//     throw Error("Username already exists");
//   }

//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);

//   const user = await this.create({ username, password: hash });

//   return user;
// };

// // static login method
// userSchema.statics.login = async function (username, password) {
//   if (!username || !password) {
//     throw Error("All fields must be filled");
//   }

//   const user = await this.findOne({ username });

//   if (!user) {
//     throw Error("Incorrect username");
//   }

//   const match = await bcrypt.compare(password, user.password);

//   if (!match) {
//     throw Error("Incorrect password");
//   }

//   // Check if user is already logged in
//   if (user.sessionToken) {
//     throw Error("User already logged in from another session");
//   }

//   // Update last logged in time and session token
//   user.lastLoggedIn = new Date();
//   user.sessionToken = uuidv4();
//   await user.save();

//   return user;
// };

// // static logout method
// userSchema.statics.logout = async function (username) {
//   const user = await this.findOne({ username });

//   if (!user) {
//     throw Error("User not found");
//   }

//   // Invalidate the session token
//   user.sessionToken = null;
//   await user.save();

//   return user;
// };

// module.exports = mongoose.model("User", userSchema);
