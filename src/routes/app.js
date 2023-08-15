const express = require('express')
const auth = require('./auth')
const admin = require('./admin')

const appRouter = express.Router()

module.exports = () => {
  auth(appRouter)
  admin(appRouter)

  return appRouter
}
