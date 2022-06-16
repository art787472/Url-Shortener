
const { default: mongoose } = require('mongoose')
const db = require('../config/monogoose')
const Schema = mongoose.Schema
const urlSchema = new Schema ({
  url: {
    type: String,
    required: true
  },
  token: {
    type: String
  }
})

module.exports = mongoose.model('Url', urlSchema)