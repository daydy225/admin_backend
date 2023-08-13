const http = require('http')
const { PORT } = require('./src/utils/config.js')
const app = require('./src/app')
const { info } = require('./src/utils/logger')

const httpServer = http.createServer(app)

httpServer.listen(PORT, () => {
  info(`Server running on port http://127.0.0.1:${PORT}`)
})
