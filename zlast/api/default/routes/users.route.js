const express = require('express')
const app = express();
const userRoutes = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const configbcr = require('../config/config')
const User = require('../models/Users')
//const VerifyToken = require('../config/config')

userRoutes.route('/adduser').post(function (req, res) {
   var user = new user(req.body);
     user.save()
     .then(user => {
     res.status(200).json({'user': 'user added successfully'})
     })
     .catch(err => {
     res.status(400).send("unable to save to database")
     })
 })

 userRoutes.route('/users').get(function (req, res) {
    User.find(function (err, users){
     if(err){
       console.log(err)
     }
     else {
       res.json(users)
     }
   })
 })

 userRoutes.route('/users/:nr').get(function (req, res) {
  console.log('nr=req.params.nr:', req.params.nr)
  User.find({nr: req.params.nr}, function (err, users){
    if(err){
      console.log(err)
      // alert("There was a problem finding the user.")
    }
    else {
      res.json(users)
      console.log(users)
    }
  })
})

userRoutes.route('/login').post(function(req, res) {
  console.log('email1:',req.body.email)
  console.log('password1:',req.body.password)
  User.findOne({email: req.body.email}, function (err, data) {
    if (err) {
      console.log('err2_new:',err)
      return res.status(500).send('Error on the server.')
    }
    if (!data) { return res.status(404).send('No user found.')
    //console.log('email3:',req.body.email)
    //console.log('password3:',req.body.password)
  }
    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, data.password)
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null })
    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: data._id }, configbcr.secret, {
      expiresIn: 86400 // expires in 24 hours
    })
    // return the information including token as JSON
    console.log('data:',data)
    res.status(200).send({ auth: true, token: token, user: data.id })
  })
})

userRoutes.route('/logout').post(function(req, res) {
  res.status(200).send({ auth: false, token: null })
})


userRoutes.route('/register').post(function(req, res) {
  // console.log('username:',req.body.username)
  // console.log('email:',req.body.email)
  // console.log('pass:',req.body.password)
  var hashedPassword = bcrypt.hashSync(req.body.password, 8)
    User.create({
      nr: req.body.nr,
      username : req.body.username,
      email : req.body.email,
      password : hashedPassword
    },
    function (err, user) {
      if (err) {
        console.log('err4:',err)
        return res.status(500).send("There was a problem registering the user`.")
      }
      // if user is registered without errors
      // create a token
      var token = jwt.sign({ id: user._id }, configbcr.secret, {
        expiresIn: 86400 // expires in 24 hours
      })

      res.status(200).send({ auth: true, token: token })
    })

  })

  // userRoute.route('/me', VerifyToken).post(function(req, res, next) {

  //   User.findById(req.userId, { password: 0 }, function (err, user) {
  //     if (err) return res.status(500).send("There was a problem finding the user.")
  //     if (!user) return res.status(404).send("No user found.")
  //     res.status(200).send(user)
  //   })

  // })

 module.exports = userRoutes
