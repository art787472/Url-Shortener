const express = require('express')
const router = express.Router()
const getToken = require('../../util/token')
const Url = require('../../models/url')

function getUniqueToken () {
  let token = getToken()
  console.log('func token: ' + token)
  let result = ''
  return Url.find({ token })
    .lean()
    .then(data => {
      console.log('func data: ' + data)
      console.log(typeof(data))
    if (data.length > 0) {
      token = getUniqueToken()
    }
    return token
  }).then((token) => {
    result = token
    return token
  })

} 

router.post('/', (req, res) => {
  const url = req.body.url
  console.log(url)
  let token = ''
  getUniqueToken().then(data => {token = data})
  console.log('token: ' + token)
  return Url.findOne({url})
  .lean()
  .then(data => {
    console.log(data)
    if (!data) {
      return  Url.create({ url  })
              .then((data) => {
                console.log('data:' + data)
                res.redirect(`/?token=${data.token}`)
              })
              .catch(error => console.log(error))
    }
    return res.redirect(`/?token=${data.token}`)
  })
})

router.get('/:token', (req, res) => {
  const token = req.params.token
  
  console.log(token)
  return Url.find({token})
  .lean()
  .then((data) => {
    console.log(data)
    const [url] = data
    console.log(url)
    res.redirect(`http://${url.url}`)
    })
  .catch(error => console.log(error))
})

module.exports = router