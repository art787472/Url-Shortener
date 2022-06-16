const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
  const token = req.query.token
  console.log(req.hostname)
  res.render('index', {token})
})


module.exports = router