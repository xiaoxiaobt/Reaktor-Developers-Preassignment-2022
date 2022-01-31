import axios from 'axios'

const backendUrl = '/api'

/**
 * Fetch the difference between databases and history,
 * as there is a delay for info to be registered in database
 */
const getRemaining = async () => {
  const remainingData = []
  var cursor = '/rps/history'
  while (cursor !== null) {
    const request = await axios.get(backendUrl + '/reaktor' + cursor)
    const pageData = await request.data.data
    cursor = request.data.cursor
    for (const x of pageData) {
      const exist = await axios.get(backendUrl + '/results/' + x.gameId)
      if (exist.data) {
        cursor = null
        console.log('Data entry already exists')
        break
      } else {
        console.log('Add one new entry to temporary array')
        remainingData.push({ ...x, id: x.gameId })
      }
    }
  }
  return remainingData
}

/**
 * Get number of documents in the database
 * @returns {int} Number of documents in the database
 */
const getNoDocuments = async () => {
  const request = axios.get(backendUrl + '/results/count')
  const response = await request
  return response.data
}

/** Fetch 50 more results from database */
const fetchMoreData = async (setResultsInDatabases, setHasMore, resultCursor, setResultCursor) => {
  setResultCursor(prev => prev + 50)
  if (resultCursor >= getNoDocuments()) {
    setHasMore(false)
  }
  const request = await axios.get(backendUrl + `/results?start=${resultCursor}`)
  const response = await request.data
  setResultsInDatabases(prev => response.concat(prev))
  console.log('Loaded ' + response.length + ' more results from database')
}

/**
 * Fetch info about a match from database, where gameID is `id`
 * @param {string} id - gameID
 */
const getById = async (id) => {
  const request = axios.get(backendUrl + '/results/' + id)
  const response = await request
  return response.data
}

export default { getRemaining, fetchMoreData, getById }