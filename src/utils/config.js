require('dotenv').config()

const PORT = process.env.PORT || 3000
const MONGO_URI =
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_MONGO_URI
    : process.env.MONGODB_URI

const JWT_SECRET = process.env.JWT_SECRET

module.exports = {
  MONGO_URI,
  PORT,
  JWT_SECRET,
}
