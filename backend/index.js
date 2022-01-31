const app = require('./app')
const http = require('http')
const config = require('./utils/config')
// Create an HTTP server. HTTPS server is NOT supported on Heroku (at least with the free Dyno)
const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})

