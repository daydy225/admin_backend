const { User } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../utils/config')
const { info } = require('../utils/logger')

const registerAdmin = async (values = {}) => {
  try {
    const { username, email, password, role } = values
    const existingAdmin = await User.findOne({
      username,
      role: { $in: ['admin', 'superadmin'] },
    })

    if (existingAdmin) {
      throw { status: 400, message: 'Admin already exists' }
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      username,
      password: passwordHash,
      role,
      email,
      created_at: new Date(),
    })
    const savedUser = await user.save()
    return savedUser
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message }
  }
}

const loginAdmin = async (values = {}) => {
  try {
    const { username, password } = values

    const existingAdmin = await User.findOne({
      username,
      role: { $in: ['admin', 'superadmin'] },
    }).select('+password')

    if (!existingAdmin) {
      throw { status: 400, message: 'Admin not found' }
    }

    const isMatch = await bcrypt.compare(password, existingAdmin.password)
    if (!isMatch) {
      throw { status: 400, message: 'Invalid credentials' }
    }

    const token = jwt.sign({ id: existingAdmin._id, username }, JWT_SECRET, {
      expiresIn: '1h',
    })

    const acknowledge = await User.updateOne(
      { _id: existingAdmin._id },
      { token },
    )

    if (acknowledge) {
      return {
        username: existingAdmin.username,
        email: existingAdmin.email,
        token,
      }
    }
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message }
  }
}

const verifyToken = async token => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findOne({ _id: decoded.id, token })
    if (!user) {
      throw { status: 401, message: 'Invalid token' }
    }
    return { verified: true, user }
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message }
  }
}

module.exports = { registerAdmin, loginAdmin, verifyToken }
