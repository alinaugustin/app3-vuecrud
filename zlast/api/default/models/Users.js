const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define collection and schema for Items
var User = new Schema({
  nr: {
    type: Number
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  }
})

module.exports = mongoose.model('User', User)
