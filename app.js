const express = require('express')
require('./config/monogoose')
const port = process.env.PORT || 3030
app = express()


app.get('/', (req, res) => {
  res.write("Hello")
  res.end()
})


app.listen(port, () => {
  console.log(`app is listening on ${port}`)
})


