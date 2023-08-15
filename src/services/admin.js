const { User } = require('../models/user')

const findAllAdmins = async user => {
  try {
    // verify token
    if (!user) {
      throw { status: 401, message: 'Invalid token, Access unauthorized' }
    }

    const allAdmins = await User.find({})

    if (allAdmins.length === 0)
      throw { status: 404, message: 'No admins found' }

    return allAdmins
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message }
  }
}

module.exports = { findAllAdmins }
