const { verifyToken } = require('../utils/middleware')
const { fetchAdmins, editAdmin } = require('../controllers/admin')

module.exports = adminRouter => {
  adminRouter.get('/admin', verifyToken, fetchAdmins)
  adminRouter.put('/admin/:id', verifyToken, editAdmin)
}
