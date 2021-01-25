const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')

const app = express()

const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

app.set('view engine', 'handlebars')

const routes = require('./controllers/burgerController')
app.use(routes)

app.listen(PORT, function() {
    console.log('Server listening on: http://localhost:' + PORT)
})

