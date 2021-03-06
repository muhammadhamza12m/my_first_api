const express = require("express");
let router = express.Router();
var {question, validate} = require("../../Models/question");
const {ObjectId} = require('mongodb');

router.get("/", async (req, res) => {
  let questions = await question.find();
  res.send(questions);
});
// get single 
router.get("/:id", async (req, res) => {

  try {
    let q = await question.findById(req.params.id);
    if (!question) return res.status(400).send("ID in not available");
    res.send(q);
  } catch (err) {
    
    return res.status(400).send("INVALID ID");
  }
  
});

//update
router.put("/", async (req, res) => {
     
  var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://usman:usman@cluster0.gkwas.mongodb.net/hamza?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("hamza");
  var myquery = { question: req.body.question };
  var newvalues = { $set: {question: "hamzabbb", address: "bbbbbbbbbbbbbbbbbbb" } };
  dbo.collection("questions").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});
});

//Insert
router.post("/", async (req, res) => {

 // console.log(req.body.name);
  //  let  errorr  = validate(req.body);
  // if(errorr) return res.send(errorr);
  // let q = new question();
  //  q.name = req.body.name;
  // q.course = req.body.course;
  // console.log(q);
  // await q.save();
  // res.send(q);

  var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://usman:usman@cluster0.gkwas.mongodb.net/hamza?retryWrites=true&w=majority";

  MongoClient.connect(url, async function (err, db) {

    let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
 
  var dbo = db.db("hamza");
  var myobj = { question: req.body.question , optionA: req.body.optionA,optionB: req.body.optionB,optionC: req.body.optionC,optionD: req.body.optionD,answer: req.body.answer};
  dbo.collection("questions").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    return res.send("Inserted");
    db.close();
  });
});
  
});


//delete
router.delete("/:id", async (req, res) => {
  let q = await question.findByIdAndDelete(req.params.id);
  res.send(q);
});

module.exports = router;
