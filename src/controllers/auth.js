const { registerAdmin, loginAdmin, verifyToken } = require('../services/auth')
const { validateAdmin } = require('../models/user')

const adminRegister = async (req, res) => {
  try {
    const { error } = validateAdmin(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const result = await registerAdmin(req.body)
    res.json({ success: true, result })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ success: false, message: error?.message || error })
  }
}

const adminLogin = async (req, res) => {
  try {
    const result = await loginAdmin(req.body)
    res.json({ success: true, result })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ success: false, message: error?.message || error })
  }
}

const tokenExist = async (req, res) => {
  const user = req.user

  try {
    const result = await verifyToken(user)

    res.json({ success: true, user: result.data })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ success: false, message: error?.message || error })
  }
}

module.exports = {
  adminRegister,
  adminLogin,
  tokenExist,
}
