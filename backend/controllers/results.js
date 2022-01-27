const resultsRouter = require('express').Router()
const Result = require('../models/result')


resultsRouter.get('/', async (request, response) => {
  const start = Math.abs(Number(request.query.start)) | 0
  const results = await Result.find({}).skip(start).limit(50)
  response.json(results)
})

resultsRouter.get('/:id', async (request, response) => {
  const result = await Result.findById(request.params.id.padStart(24, '0')).count() > 0
  response.json(result)
})

module.exports = resultsRouter