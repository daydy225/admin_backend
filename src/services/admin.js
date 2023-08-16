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

const updateAdmin = async (user, id, values = {}) => {
  try {
    if (!user) {
      throw { status: 401, message: 'Invalid token, Access unauthorized' }
    }
    const admin = await User.findOne({
      _id: id,
      role: { $in: ['admin', 'superadmin'] },
    })

    if (!admin) throw { status: 404, message: 'Admin not found' }

    const updatedAdmin = await User.findOneAndUpdate(
      { _id: id },
      { values, updated_at: Date.now() },
      {
        new: true,
      },
    ).select('-token -__v')

    if (!updatedAdmin) throw { status: 500, message: 'Error updating admin' }

    return updatedAdmin
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message }
  }
}

module.exports = { findAllAdmins, updateAdmin }
