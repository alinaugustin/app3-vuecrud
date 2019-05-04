const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define collection and schema for Items
var Argsopts = new Schema({
  optiuni: {
    type: String,
    required: true
  },
  argum: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  }
})

module.exports = mongoose.model('Argsopts', Argsopts)
