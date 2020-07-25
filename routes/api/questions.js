const express = require('express');
let router = express.Router();
var question = require("../../Models/question");
const ObjectId = require("mongodb").ObjectID;

//ADD
router.get("/add/:name/:course", async (req, res) => {
    

    
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function (err, db) {
 
      var dbo = db.db("quizapp");
      
      dbo.collection("question").insertOne({name:req.params.name,course:req.params.course}, function (err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
    
            db.close();
        });
    });
    
   
    });

//show all

router.get("/", async (req, res) => {

  
    var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("quizapp");
  dbo.collection("question").find({}).toArray(function(err, result) {
    if (err) throw err;
      res.json(result);
    db.close();
  });
});
});

//search

router.get("/id/:id", async (req, res) => {
    
  console.log(req.params.id);
    var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {

  var dbo = db.db("quizapp");
  dbo.collection("question").findOne({_id:ObjectId(req.params.id)}, function(err, result) {
    if (err) throw err;
     
    
      res.json(result.name);
    db.close();
  });
});

});


//delete

router.get("/id/del/:id", async (req, res) => {

  

    var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("quizapp");
 
  dbo.collection("question").deleteOne({_id:ObjectId(req.params.id)}, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
     

    db.close();
  });
});

});

//update
router.get("/update/:name", async (req, res) => {


  var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("quizapp");
  var myquery = { name: req.params.name };
  var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };
  dbo.collection("question").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});


});



module.exports = router;

