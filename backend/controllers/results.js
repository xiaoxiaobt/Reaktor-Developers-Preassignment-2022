const resultsRouter = require('express').Router()
const Result = require('../models/result')


resultsRouter.get('/', async (request, response) => {
  const results = await Result.find({}).limit(10)
  response.json(results)
})

resultsRouter.get('/:id', async (request, response) => {
  const result = await Result.findById(request.params.id)
  response.json(result)
})

module.exports = resultsRouter