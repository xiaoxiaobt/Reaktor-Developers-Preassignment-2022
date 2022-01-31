const usersRouter = require('express').Router()
const Result = require('../models/result')
const helpers = require('../utils/helpers')

usersRouter.get('/', async (_request, response) => {
  const playerAUnique = await Result.distinct('playerA.name')
  const playerBUnique = await Result.distinct('playerB.name')
  const results = Object.values({ ...playerAUnique, ...playerBUnique })
  response.json(results)
})

usersRouter.get('/:name', async (request, response) => {
  const name = request.params.name
  const results = await Result.find({ $or: [{ 'playerA.name': name }, { 'playerB.name': name }] }, { _id: 0, t: 0 })
  const hands = helpers.hands(results, name)
  const data = {
    total: results.length,
    win: helpers.win(results, name),
    rock: hands.ROCK,
    paper: hands.PAPER,
    scissors: hands.SCISSORS
  }
  response.json(data)
})

module.exports = usersRouter