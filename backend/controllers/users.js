const usersRouter = require('express').Router()
const Result = require('../models/result')


usersRouter.get('/', async (request, response) => {
  const results = await Result.find({}).limit(10)
  response.json(results)
})

usersRouter.get('/:name', async (request, response) => {
  const name = request.params.name
  const result = await Result.find({ $or: [{ 'playerA.name': name }, { 'playerB.name': name }] }, { id: 0, t: 0 })
  response.json(result)
})

module.exports = usersRouter