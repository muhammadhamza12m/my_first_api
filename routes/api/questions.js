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

module.exports = router;
