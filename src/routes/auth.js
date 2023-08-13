const { adminRegister, adminLogin, tokenExist } = require('../controllers/auth')

const { tokenExtractor } = require('../utils/middleware')

module.exports = authRouter => {
  authRouter.post('/auth/admin-register', adminRegister)
  authRouter.post('/auth/admin-login', adminLogin)
  authRouter.get('/auth/verify-token', tokenExtractor, tokenExist)
}
