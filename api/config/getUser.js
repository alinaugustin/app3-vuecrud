/* eslint-disable no-console */
var jwt = require('jsonwebtoken') // used to create, sign, and verify tokens
var config = require('./config') // get our config file

function getUser(req, res) {
  // check header or url parameters or post parameters for token
  var token = req.headers.authorization
  console.log('token_verifyToken = ', token)
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' })
  // verifies secret and checks exp
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
    // if everything is good, save to request for use in other routes
    req.userId = decoded.id
    console.log('req.userId: ',req.userId)
    Users.find(function (err, responses){
        if(err){
          console.log(err)
        }
        else {
          console.log(responses)
          res.json(responses)
        }
      })
    //console.log('decoded.id: ',req.userId)
    //res.json(decoded.id) 
    //next(res.status(200).send({ auth: true, userId: req.userId}))

  })

}

module.exports = getUser
