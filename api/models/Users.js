const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define collection and schema for Items
var UserModel = new Schema({
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
    type: String,
    required: true
  }
})

module.exports = mongoose.model('User', UserModel)
