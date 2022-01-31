/** Middleware that logs all requests to backend */
const requestLogger = (request, _response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

/** Middleware that handles unknown end points */
const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

/** Middleware that handles and logs errors */
const errorHandler = (error, _request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind === 'ObjectId')
    return response.status(400).send({ error: 'malformatted id' })
  else if (error.name === 'ValidationError')
    return response.status(400).json({ error: error.message })

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}