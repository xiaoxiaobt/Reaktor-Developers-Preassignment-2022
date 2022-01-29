const app = require('./app')
const https = require('https')
const fs = require('fs')
const config = require('./utils/config')
const logger = require('./utils/logger')

const privateKey = fs.readFileSync(__dirname + '/sslcert/server.key', 'utf8')
const certificate = fs.readFileSync(__dirname + '/sslcert/server.crt', 'utf8')

const credentials = { key: privateKey, cert: certificate }
const server = https.createServer(credentials, app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

