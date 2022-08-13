const express = require('express')
const router = express.Router()
const getToken = require('../../util/token')
const Url = require('../../models/url')
const axios = require('axios')

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
    return data.toke
  } catch (error) {
    if(error.message.includes('duplicate key error')){
      const token = getToken()
      return createToken(url, token)
    } 
    throw error
  }
}

router.post('/', (req, res) => {
  const url = req.body.url
  const token = getToken()

  return  findToken(url)// find url in db
            .then(data => {
              if (data.length === 0) {
                return axios.get(url) // ensure url can be connected
                          .then(() => createToken( url, token )// if fuond, create data
                                      .then(token => {
                                        return res.redirect(`/?token=${token}`)})
                                      .catch(error => {
                                        return res.render('index', { errorMessage: error })}))
                          .catch(error => res.render('index', { errorMessage: 'Url cannot be connected. Please check again.'}))
                }
                return res.redirect(`/?token=${data[0].token}`)})
              .catch(error => res.render('index', { errorMessage: error }))
            })

module.exports = router
