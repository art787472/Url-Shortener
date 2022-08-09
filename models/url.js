
const { default: mongoose } = require('mongoose')
const Schema = mongoose.Schema
const getToken = () => {
  
  let token = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  const n =  5
  for (let i = 0; i < n; i++) {
      token += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return token
}

console.log(getToken())
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
   date: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now
  }
})

module.exports = mongoose.model('Url', urlSchema)