const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const resultsRouter = require('./controllers/results')
const usersRouter = require('./controllers/users')
const reaktorRouter = require('./controllers/reaktor')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const path = require('path')

// Connect to database
console.log('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connection to MongoDB:', error.message)
  })
// Allow CORS
app.use(cors())

// Serve backend and frontend on the same Heroku Dyno
// https://stackoverflow.com/a/61354113/11609216
if (config.NODE_ENV === 'production') {
  // Serve static files from the React frontend app
  app.use(express.static(path.join(__dirname, '../frontend/build')))
} else {
  app.use(express.static('build'))
}
app.use(express.json())
app.use(middleware.requestLogger)

// Endpoints
app.use('/api/results', resultsRouter)
app.use('/api/users', usersRouter)
app.use('/api/reaktor/rps/history', reaktorRouter)

// Serve backend and frontend on the same Heroku Dyno
// https://stackoverflow.com/a/61354113/11609216
if (config.NODE_ENV === 'production') {
  // AFTER defining routes: Anything that doesn't match what's above, send back index.html
  // (the beginning slash ('/') in the string is important!)
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
  })
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app