const express = require('express')
const router = express.Router()
const getToken = require('../../util/token')
const Url = require('../../models/url')

router.post('/', (req, res) => {
  const url = req.body.url
  console.log(url)
  const token = getToken()
  console.log(token)
  return Url.create({url, token})
  .then(() => res.redirect(`/?token=${token}`))
  .catch(error => console.log(error))
})

router.get('/:token', (req, res) => {
  const token = req.params.token
  
  console.log(token)
  return Url.find({token})
  .then((urlData) => {
    const url = urlData[0].url
    console.log(urlData[0].url)
    res.redirect(`http://${url}`)
    })
  .catch(error => console.log(error))
})

module.exports = router