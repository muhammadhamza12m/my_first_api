var express = require('express');
let router = express.Router();
let { User } = require("../../Models/user");
var bcrypt = require("bcryptjs");
// const _ = require("lodash");
// const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User with given Email already exist");
  user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  await user.generateHashedPassword();
  await user.save();

  return res.send(user);
});


router.post("/login", async (req, res) => {
  console.log("working");
});
module.exports = router;