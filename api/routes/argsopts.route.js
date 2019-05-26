/* eslint-disable no-console */
const express = require('express')
//const app = express()
const argsRoutes = express.Router()
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const Users = require('../models/Users')
const Argsopts = require('../models/Argsopts')
const verifyToken = require('../config/verifyToken')

argsRoutes.route('/apiargs/argsopts', verifyToken).get(function(req, res) {
    //var Authorization = req.headers.authorization
    //console.log(Authorization)
    //console.log('auth-headers:',req.headers.authorization)
    if(verifyToken) {
      let userId = req.userId
      console.log('userId: ',userId)
        Users.findById({_id: userId}, function (err, responses){
          if(err){
            console.log(err)
          }
          console.log('responses user: ',responses)
          //res.json(responses.email)
          Argsopts.findOne({email: responses.email}, function (error, respons){
            if(error){
              console.log(error)
            }
            console.log('responses args: ',respons)
            return res.status(200).send(respons)
          })
        })
    } else {
      console.error('Authorization required!')
    }
  })

  argsRoutes.route('/apiargs/insertargsopts', verifyToken).post(function(req, res) {
    if(verifyToken) {
    //console.log(req.body.optiuni) console.log(req.body.args) console.log(req.body.token)
    let token2 = req.body.token
    jwt.verify(token2, config.secret, function(err, decoded) {
      if (err)
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
      // if everything is good, save to request for use in other routes
      let idd = decoded.id
      Users.findById({_id: idd}, function (err, responses){
        if(err){
        console.log(err)
        }
        //console.log('responses: ',responses)
        //res.json(responses)
      if(Object.keys(responses).length > 0) {
            Argsopts.findOne({email: responses.email}, function (err, respons){
              if(err) {
                  //console.log('err: ',err)
                  
                } else {
                //create one
                Argsopts.create({
                  optiuni : req.body.optiuni,
                  argum : req.body.args,
                  email : responses.email
                  },
                  function (err, respon) {
                    if (err) {
                      //console.log('err create:',err)
                   
                    //console.log('respon: ', respon)
                    
                  //update it
                  Argsopts.findOneAndUpdate({email: responses.email},
                    { $set: {optiuni: req.body.optiuni, argum: req.body.args} },
                    {useFindAndModify: false}, function(err, rsp) {
                    if (err) {
                      console.log('err update:',err)
                      return (console.log('Nu am putut sa il updatam! + err: '+ err))
                    }
                    //console.log('rsp: ', rsp)
                    res.send(rsp+'ok!')
                  })
                  }
                return respon
                })

                }
            //console.log('respons: ', respons)
            return respons
              })
        } else return console.log('responses: ',responses)
    })
  })
}
})




 module.exports = argsRoutes
