const express = require("express");
let router = express.Router();
var {question, validate} = require("../../Models/question");


router.get("/", async (req, res) => {
  let questions = await question.find();
  res.send(questions);
});
// get single 
router.get("/:id", async (req, res) => {

  try {
    let q = await question.findById(req.params.id);
    if (!question) return res.status(400).send("Product with id in not available");
    res.send(q);
  } catch (err) {
    
    return res.status(400).send("INVALID ID");
  }
  
});

//update
router.put("/:id", async (req, res) => {
     let q = await question.findById(req.params.id);
  q.name = req.body.name;
  q.course = req.body.course;
  await q.save();
  res.send(q);
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

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
    let  errorr  = validate(req.body);
   if(errorr) return res.send(errorr);
  var dbo = db.db("hamza");
  var myobj = { name: req.body.name, course: req.body.course };
  dbo.collection("questions").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    //res.send(myobj);
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
