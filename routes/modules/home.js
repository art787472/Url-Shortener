const express = require('express')
const router = express.Router()
const Url = require('../../models/url')

router.get('/', (req, res) => {
  const token = req.query.token
  const fullUrl = req.protocol + '://' + req.get('host') + '/' + token
  if (!token) return res.render('index')
  Url.find({ token })
    .lean()
    .then(data => {
      if (data.length < 1) {
        throw new Error(`token "${ token }" not found`)
      }
      return res.render('index', { url: fullUrl })
    })
    .catch(error => res.render('index', { errorMessage: error }))
})

router.get('/:token', (req, res) => {
  const token = req.params.token
  
  return Url.find({ token })
          .lean()
          .then((data) => {
            if (data.length < 1) {
              throw new Error(`Token "${ token }" not found!`)
            }
            const [url] = data
            res.redirect(`${ url.url }`)
            })
          .catch(error => res.render('index', { errorMessage: error }))
})

module.exports = router
