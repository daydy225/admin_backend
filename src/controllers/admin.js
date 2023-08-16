const { findAllAdmins } = require('../services/admin')
const { updateAdmin } = require('../services/admin')

const fetchAdmins = async (req, res) => {
  try {
    const user = req.user
    const result = await findAllAdmins(user)

    if (!result) {
      return res
        .status(error?.status || 404)
        .send({ success: false, message: 'Admins not found' })
    }

    res.status(200).send({ success: true, admins: result })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ success: false, message: error?.message || error })
  }
}

const editAdmin = async (req, res) => {
  try {
    const user = req.user
    const { id } = req.params

    const result = await updateAdmin(user, id, req.body)

    if (!result) {
      return res
        .status(error?.status || 404)
        .send({ success: false, message: 'Edit admin failed' })
    }

    res.status(200).send({ success: true, admin: result })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ success: false, message: error?.message || error })
  }
}

module.exports = { fetchAdmins, editAdmin }
