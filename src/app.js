const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const { info, error } = require('./utils/logger')
const { MONGO_URI } = require('./utils/config')

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(helmet())
app.use(cors())

app.get('/', (req, res) => {
  res.json({ message: 'Society admin API' })
})

info('Connecting to database...', MONGO_URI)
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    info('Connected to MongoDB')
  })
  .catch(exception => {
    error('Error connecting to MongoDB:', exception.message)
  })

module.exports = app
