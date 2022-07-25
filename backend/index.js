const app = require('./app')
const http = require('http')
// const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(3001, () => {
  logger.info(`Server running on port ${3001}`)
})

