const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const appRouter = require('./routes/app')
const { info, error } = require('./utils/logger')
const { MONGO_URI } = require('./utils/config')

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(cors())
app.use(helmet())

// app.use(express.static('dist'))

info('Connecting to database...', MONGO_URI)
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    info('Connected to MongoDB')
  })
  .catch(exception => {
    error('Error connecting to MongoDB:', exception.message)
  })

app.use('/api', appRouter())

module.exports = app
