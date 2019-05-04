// AuthController.js
var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
var User = require('../models/Users')

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
var config = require('../config/config')

router.post('/register', function(req, res) {
  
    var hashedPassword = bcrypt.hashSync(req.body.password, 10)
    
    User.create({
      username : req.body.username,
      email : req.body.email,
      password : hashedPassword
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({ id: user._id }, config2.secret, {
        expiresIn:43200 // expires in 12 hours
      });
      res.status(200).send({ auth: true, token: token })
    })
  })

  router.get('/me', function(req, res) {
    var token = req.headers['x-access-token']
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' })
    
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
      
      res.status(200).send(decoded)
    })
  })

  // add this to the bottom of AuthController.js
module.exports = router

