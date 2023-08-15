const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../utils/config')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

// const tokenExtractor = (req, res, next) => {
//   const authorization = req.get('authorization')
//   console.log('authorization:', authorization)
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     req.token = authorization.substring(7)
//   } else {
//     req.token = null
//   }
//   next()
// }

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token missing.' })
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET) // Replace with your secret key
    req.user = verified
    next()
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' })
  }
}

module.exports = { unknownEndpoint, verifyToken }
