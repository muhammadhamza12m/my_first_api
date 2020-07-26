var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  
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
  res.render('index', { title: 'Hamza' });
});

module.exports = router;
