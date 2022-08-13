
const { default: mongoose } = require('mongoose')
const Schema = mongoose.Schema
const getToken = require('../util/token')

const urlSchema = new Schema ({
  token: {
    type: String,
    default: getToken,
    unique: true
  },
  url: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('Url', urlSchema)
