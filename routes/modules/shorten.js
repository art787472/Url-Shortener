const express = require('express')
const router = express.Router()
const getToken = require('../../util/token')
const Url = require('../../models/url')
const axios = require('axios')

async function confirmUrl (url) {
  return axios.get(url)
          .then
}

async function findToken (url) {
  try {
    const data = Url.find({ url })
    return data
  } catch (error) {
    throw error
  }
}

async function createToken( url, token) {
  try{

    const data = await Url.create({ url, token })
    return data.token

  } catch (error) {
    const token = getToken()
    if(error.message.includes('duplicate key error')) return createToken(url, token)
    throw error
  }
}



router.post('/', (req, res) => {
  const url = req.body.url
  const token = getToken()

  return  axios.get(url)
  .then(() => findToken(url)
            .then(data => {
              if (data.length === 0) {
                return createToken( url, token )
                        .then(token => {
                          return res.redirect(`/?token=${token}`)})
                        .catch(error => {
                          return res.render('index', { errorMessage: error })}) 
              }
              return res.redirect(`/?token=${data[0].token}`)})

              .catch(error => res.render('index', { errorMessage: error })))
  .catch(error => res.render('index', { errorMessage: 'Please check if the url can be successfully connected.' }))
  
            })

module.exports = router
