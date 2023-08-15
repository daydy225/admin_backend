const { verifyToken } = require('../utils/middleware')
const { fetchAdmins } = require('../controllers/admin')

module.exports = adminRouter => {
  adminRouter.get('/admin', verifyToken, fetchAdmins)
}
