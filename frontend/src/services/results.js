import axios from 'axios'

const backendUrl = 'http://localhost:3001/api'

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

const getNoDocuments = () => {
  const request = axios.get(backendUrl + '/results/count')
  return request.then(response => response.data)
}

const fetchMoreData = async (setResults, setHasMore, resultCursor, setResultCursor) => {
  setResultCursor(prev => prev + 50)
  if (resultCursor >= getNoDocuments()) {
    setHasMore(false)
  }
  const request = await axios.get(backendUrl + `/results?start=${resultCursor}`)
  const response = await request.data
  setResults(prev => response.concat(prev))
  console.log('Loaded ' + response.length + ' more results from database')
}


export default { getRemaining, fetchMoreData }