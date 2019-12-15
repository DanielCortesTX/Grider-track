require('./models/User')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/authRoutes')

const mongoURI = require('../config/keys').mongoURI
const requireAuth = require('./middlewares/requireAuth')


const app = express()

app.use(bodyParser.json())
app.use(authRoutes)

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance')
})
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to mongo', err)
})

app.get('/', requireAuth, (req, res) => {
  res.send(`Your email is ${req.user.email}`)
})

app.listen(3000, () => {
  console.log('Listening on 3000')
})