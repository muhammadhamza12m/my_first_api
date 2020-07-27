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
  let  error  = validate(req.body);
  return res.send(error);
  let q = new question();
   q.name = req.body.name;
  q.course = req.body.course;
  await q.save();
  res.send(q);
});
//delete
router.delete("/:id", async (req, res) => {
  let q = await question.findByIdAndDelete(req.params.id);
  res.send(q);
});

module.exports = router;
