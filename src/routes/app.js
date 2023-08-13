const express = require('express')
const auth = require('./auth')

const appRouter = express.Router()

module.exports = () => {
  auth(appRouter)
  return appRouter
}
