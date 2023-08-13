const mongoose = require('mongoose')
const joi = require('joi')

const userSchema = mongoose.Schema({
  username: String,
  fullname: String,
  email: String,
  password: {
    type: String,
    select: false,
  },
  role: {
    type: String,
    enum: ['client', 'admin', 'superadmin'],
    default: 'admin',
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  token: {
    type: String,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
})

const User = mongoose.model('User', userSchema)
const validateAdmin = user => {
  const userSchema = joi.object({
    username: joi.string().min(3).max(255).required(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
    role: joi.string().required(),
  })

  return userSchema.validate(user)
}

module.exports = {
  User,
  validateAdmin,
}
