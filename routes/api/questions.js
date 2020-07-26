const express = require("express");
let router = express.Router();
var question = require("../../Models/question");
const ObjectId = require("mongodb").ObjectID;

router.get("/", async (req, res) => {
  let questions = await question.find();
  res.send(questions);
});
router.get("/:id", async (req, res) => {
  let q = await question.findById(req.params.id);
  res.send(q);
});
router.post("/", async (req, res) => {
  let q = new question(req.body);
  await q.save();
  res.send(q);
});
router.delete("/:id", async (req, res) => {
  let q = await question.findByIdAndDelete(req.params.id);
  res.send(q);
});

module.exports = router;
