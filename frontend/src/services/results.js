import axios from 'axios'

const backendUrl = 'http://localhost:3001/api'

const fetchFromDatabase = (start) => {
  const request = axios.get(backendUrl + `/results?start=${start}`)
  return request.then(response => response.data)
}

const getRemaining = async () => {
  const remainingData = []
  var cursor = '/rps/history'
  while (cursor !== null) {
    const request = await axios.get(backendUrl + '/reaktor' + cursor)
    const pageData = await request.data.data
    cursor = request.data.cursor
    console.log(pageData)
    for (const x of pageData) {
      console.log(x)
      const exist = await axios.get(backendUrl + '/results/' + x.gameId)
      console.log(exist)
      if (exist.data) {
        cursor = null
        console.log('found')
        break
      } else {
        console.log('add one')
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

export default { fetchFromDatabase, getRemaining, getNoDocuments }