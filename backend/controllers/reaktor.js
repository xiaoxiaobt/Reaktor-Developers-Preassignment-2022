const reaktorRouter = require('express').Router()
const axios = require('axios')

const historyUrl = 'https://bad-api-assignment.reaktor.com'

/** A bridge for Reaktor API so the application complies with CORS.
 * Returns a page of historical data, and a path for the next page of data
 */
reaktorRouter.get('/', async (request, response) => {
  var cursor = '/rps/history'
  if (request.query?.cursor) {
    cursor += '?cursor=' + request.query.cursor
  }
  axios.get(historyUrl + cursor)
    .then(res => response.json(res.data))
    .catch(err => response.json(err))
    // .catch(err => {
    //   console.log(err.toJSON())
    //   response.json({ data: [] })
    // })
})

module.exports = reaktorRouter