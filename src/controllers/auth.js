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
      .status(error.status || 500)
      .send({ success: false, message: error.message || error })
  }
}

const adminLogin = async (req, res) => {
  try {
    const result = await loginAdmin(req.body)
    res.json({ success: true, result })
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, message: error.message || error })
  }
}

const tokenExist = async (req, res) => {
  try {
    const token = req.token
    console.log(token)
    const result = await verifyToken(token)
    if (result.verified !== true)
      return res.status(401).json({ success: false })
    res.json({ success: true })
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, message: error.message || error })
  }
}

// const getAdmin = async (req, res) => {
//   const { id } = req.params
//   const result = await getAdmin(id)
//   res.json({ success: true, result })
// }

module.exports = {
  adminRegister,
  adminLogin,
  tokenExist,
}
