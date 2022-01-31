const resultsRouter = require('express').Router()
const Result = require('../models/result')


resultsRouter.get('/', async (request, response) => {
  const start = Math.abs(Number(request.query.start)) | 0
  const nofDocuments = await Result.countDocuments()
  if (start >= nofDocuments) {
    response.json([])
  } else {
    const results = await Result.find().sort({ t: -1 }).skip(start).limit(Math.min(50, nofDocuments - start))
    response.json(results)
  }
})

resultsRouter.get('/count', async (_request, response) => {
  const results = await Result.countDocuments()
  response.json(results)
})

resultsRouter.get('/:id', async (request, response) => {
  const result = await Result.findById(request.params.id.padStart(24, '0')) //.count() > 0
  response.json(result)
})

module.exports = resultsRouter