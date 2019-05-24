/* eslint-disable no-console */
const express = require('express')
//const app = express()
const userRoutes = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const configbcr = require('../config/config')
const User = require('../models/Users')
const verifyToken = require('../config/verifyToken')

userRoutes.route('/login').post(function(req, res) {
  //console.log('email1:',req.body.email)
  //console.log('password1:',req.body.password)
  User.findOne({email: req.body.email}, function (err, data) {
    if (err) {
      //console.log('err2_new:',err)
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
    //console.log('dataLogin:',data)
    res.status(200).send({ auth: true, token: token, user: data })
  })
})

userRoutes.route('/logout').post(function(req, res) {
  res.status(200).send({ auth: false, token: null })
})


userRoutes.route('/register', verifyToken).post(function(req, res) {
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
        //console.log('err4:',err)
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

  // userRoute.route('/me', verifyToken).post(function(req, res, next) {

  //   User.findById(req.userId, { password: 0 }, function (err, user) {
  //     if (err) return res.status(500).send("There was a problem finding the user.")
  //     if (!user) return res.status(404).send("No user found.")
  //     res.status(200).send(user)
  //   })

  // })

  userRoutes.route('/api/users', verifyToken).get(function(req, res) {
    //var Authorization = req.headers.authorization
    //console.log(Authorization)
    //console.log('auth-headers:',req.headers.authorization)
    if(verifyToken) {
      User.find(function (err, users){
        if(err){
          //console.log(err)
        }
        else {
          res.json(users)
        }
      })
    } else {
      //console.error('Authorization required!')
    } 
  })

  userRoutes.route('/api/users/:nr', verifyToken).get(function (req, res) {
    //console.log('nr=req.params.nr:', req.params.nr)
    User.find({nr: req.params.nr}, function (err, users){
      if(err){
        //console.log(err)
        // alert("There was a problem finding the user.")
      }
      else {
        res.json(users)
        //console.log(users)
      }
    })
  })
  
  userRoutes.route('/api/edit/:username', verifyToken).get(function (req, res) {
    var asa = req.params.username
    //console.log('id = req.params.id: ', asa)
    User.find( {"username" : {$regex : asa}}, function (err, users){
      if(err){
        //console.log(err)
        // alert("There was a problem finding the user.")
      }
      else {
        res.json(users)
        //console.log(users)
      }
    })
  })
  
  userRoutes.route('/api/users/delete/:nr', verifyToken).get(function (req, res) {
    //console.log('nr=req.params.nr:', req.params.nr)
    User.deleteOne({nr: req.params.nr}, function (err, users){
      if(err){
        //console.log(err)
        return res.status(500).send(err)
        // alert("There was a problem finding the user.")
      }
      // else {
      //   res.json(users)
      //   console.log(users)
      // }
      const response = {
        message: "Document successfully deleted",
        id:users.nr
    }
    return res.status(200).send(response)
    })
  })

  userRoutes.route('/api/users/update/:nr', verifyToken).post(function (req, res) {
    //console.log('req.params.nr: ',req.params.nr)
    //console.log(req.body.username)
    //console.log(req.body.email)
    //console.log(req.body.nr)
    User.findOneAndUpdate({nr: req.params.nr}, 
      { $set: {nr: req.body.nr, username: req.body.username, email: req.body.email} }, 
      {useFindAndModify: false}, function(err, item) {
      if (!item || err) {
        //console.log(item)
        return (err => 'Could not load Document! + err: '+ err)
      }
      else {
        res.json(item)
        //console.log(users)
      }
    })
  })

  userRoutes.route('/api/user/:id').get(function (req, res) {
    console.log('req.params.id:', req.params.id)
    let id = req.params.id
    console.log('req.params.id:', req.params.id)
    User.findById({_id: id}, function (error, response) {
      if(error){
        console.log(error)
        return res.status(500).send(error)
        //alert("There was a problem finding the user.")
      }
    return res.status(200).send(response)
    })
  })

 module.exports = userRoutes
