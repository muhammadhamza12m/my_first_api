var express = require('express');
let router = express.Router();
let { User } = require("../../Models/user");
var bcrypt = require("bcryptjs");
const { result } = require('lodash');
// const _ = require("lodash");
// const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://usman:usman@cluster0.gkwas.mongodb.net/hamza?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("hamza");
  var myobj = { name: req.body.name, email: req.body.email, password: req.body.password };
  dbo.collection("accounts").findOne({ email: req.body.email }, async function (err, result) {
    console.log(result);
    if (!result)
    {
        
      let salt = await bcrypt.genSalt(1);
      console.log(myobj.password);
      myobj.password = await bcrypt.hash(myobj.password, salt);
       dbo.collection("accounts").insertOne(myobj, function(err, res) {
   
    console.log("1 document inserted");
   // return res.send(myobj);
    db.close();
  });
    }
    else  return res.status(400).send("User with given email  Already Exist");
  });
 
    });

});





router.post("/login", async (req, res) => {
 
  


  var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://usman:usman@cluster0.gkwas.mongodb.net/hamza?retryWrites=true&w=majority";

MongoClient.connect(url, async function(err, db) {
  if (err) throw err;
  
  var dbo = await db.db("hamza");
  await dbo.collection("accounts").findOne({email:req.body.email }, async function(err, result) {
  
   
    if (!result) return res.status(400).send("User Not Registered");
    let isValid = await bcrypt.compare(req.body.password, result.password);
    console.log(isValid);
    if (!isValid)  res.status(401).send("Invalid Password");
    else res.send("logged In");
    console.log(result);
    db.close();
  });
}); 

  console.log("working");
});
module.exports = router;