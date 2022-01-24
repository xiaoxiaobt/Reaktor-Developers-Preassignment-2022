const usersRouter = require('express').Router()
const Result = require('../models/result')

usersRouter.get('/', async (request, response) => {
  const playerAUnique = await Result.distinct('playerA.name')
  const playerBUnique = await Result.distinct('playerB.name')
  const results = Object.values({ ...playerAUnique, ...playerBUnique })
  response.json(results)
})

usersRouter.get('/:name', async (request, response) => {
  const name = request.params.name
  const start = Math.abs(Number(request.query.start)) | 0
  const result = await Result.find({ $or: [{ 'playerA.name': name }, { 'playerB.name': name }] }, { id: 0, t: 0 }).skip(start).limit(50)
  response.json(result)
})

module.exports = usersRouter