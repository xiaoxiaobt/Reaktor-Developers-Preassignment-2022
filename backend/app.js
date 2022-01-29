const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const resultsRouter = require('./controllers/results')
const usersRouter = require('./controllers/users')
const reaktorRouter = require('./controllers/reaktor')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const path = require('path')


logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())

if (config.NODE_ENV === 'production') {
  // Serve static files from the React frontend app
  app.use(express.static(path.join(__dirname, '../frontend/build')))
} else {
  app.use(express.static('build'))
}
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/results', resultsRouter)
app.use('/api/users', usersRouter)
app.use('/api/reaktor/rps/history', reaktorRouter)

if (config.NODE_ENV === 'production') {
  // AFTER defining routes: Anything that doesn't match what's above, send back index.html
  // (the beginning slash ('/') in the string is important!)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
  })
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app