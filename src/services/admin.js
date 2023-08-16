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

    const { acknowledged } = await User.updateOne({ _id: admin._id }, [
      { $set: values },
    ])

    if (acknowledged) {
      return { success: true, message: 'Admin updated successfully' }
    }
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message }
  }
}

module.exports = { findAllAdmins, updateAdmin }
