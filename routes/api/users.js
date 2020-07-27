var express = require('express');
let router = express.Router();
let {User}  = require("../../Models/user");

router.post("/register", async (req, res) => {
  let user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
 // await user.generateHashedPassword();
  await user.save();
  return res.send(user);
});
module.exports = router;