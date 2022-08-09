const express = require('express')
require('./config/monogoose')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3030

app = express()

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.use(express.static('public'))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)


app.listen(port, () => {
  console.log(`app is listening on ${port}`)
})


