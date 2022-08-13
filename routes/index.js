const express = require('express')
const router = express.Router();
const home = require('./modules/home')
const shorten = require('./modules/shorten')

router.use('/', home)
router.use('/shorten', shorten)

// handle not found
router.get('*', (req, res) => {
  res.render('index', { errorMessage: 'Not found Error' })
})

module.exports = router