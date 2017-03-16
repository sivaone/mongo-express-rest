var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
const MONGO_URL = 'mongodb://username:password@localhost:27017/users';
var assert = require('assert')

/* GET users listing. */
router.get('/', function (req, res, next) {
  var users;
  MongoClient.connect(MONGO_URL, function (err, db) {
    if (err) throw err;
    console.log('connected to mongodb successfully')
    db.collection('users').find().toArray(function (err, result) {
      if (err) throw err;
      console.log('result ', result);
      // res.send(result);
      res.render('users', { users: result })
    })

    db.close()
  })

});

/* GET single user */
router.get('/:login', function (req, res, next) {
  var users;
  MongoClient.connect(MONGO_URL, function (err, db) {
    if (err) throw err;
    console.log('connected to mongodb successfully')
    db.collection('users').findOne({login: req.params.login}, function (err, result) {
      if (err) throw err;
      res.send(result);
    })

    db.close()
  })

});

/* Create a user */
router.post('/', function (req, res, next) {
  MongoClient.connect(MONGO_URL, function (err, db) {
    if (err) throw err;

    db.collection('users').insertOne(req.body, function (err, result) {
      if (err) throw err
      res.send(result)
    })
    db.close()
  })
  // res.send(req.body)

})

/* Update a user */
router.put('/:login', function (req, res, next) {

  MongoClient.connect(MONGO_URL, function (err, db) {
    if (err) throw err;

    db.collection('users').updateOne(
      { login: req.params.login },
      { $set: req.body },
      function (err, result) {
        if (err) throw err
        res.send(result)
      })
    db.close()
  })

})

/* Delete user */
router.delete('/:login', function (req, res, next) {
  MongoClient.connect(MONGO_URL, function (err, db) {
    if (err) throw err;

    db.collection('users').deleteOne({ login: req.params.login }, function (err, result) {
      if (err) throw err
      res.send(result)
    })

    db.close()
  })
})




module.exports = router;
