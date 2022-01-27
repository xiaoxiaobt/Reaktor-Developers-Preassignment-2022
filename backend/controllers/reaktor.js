const reaktorRouter = require('express').Router()
const axios = require('axios')

const historyUrl = 'https://bad-api-assignment.reaktor.com'

reaktorRouter.get('/', async (request, response) => {
  var cursor = '/rps/history'
  if (request.query?.cursor){
    cursor += '?cursor=' + request.query.cursor
  }
  axios.get(historyUrl + cursor).then(res => response.json(res.data))
})

module.exports = reaktorRouter