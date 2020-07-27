var express = require('express');
let router = express.Router();
let User  = require("../../models/user");

router.post("/register", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User with given Email already exist");
  user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
    user.password = req.body.password;
    
  await user.save();
  return res.send((user));
});
module.exports = router;