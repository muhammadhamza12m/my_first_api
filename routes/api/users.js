var express = require('express');
let router = express.Router();
let { User } = require("../../Models/user");
var bcrypt = require("bcryptjs");
// const _ = require("lodash");
// const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://usman:usman@cluster0.gkwas.mongodb.net/hamza?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("hamza");
  var myobj = { name: req.body.name, email: req.body.course, password: req.body.name };
  dbo.collection("accounts").findOne({ email: req.body.name }, function (err, result) {
    console.log(result);
    if (!result)
    {
       dbo.collection("accounts").insertOne(myobj, function(err, res) {
   
    console.log("1 document inserted");
    //res.send(myobj);
    db.close();
  });
    }
    else  return res.status(400).send("User with given email  Already Exist");
  });
 
    });

});
router.post("/login", async (req, res) => {
  console.log("working");
});
module.exports = router;