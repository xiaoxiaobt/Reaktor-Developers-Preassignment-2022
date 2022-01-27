import axios from 'axios'

const backendUrl = 'http://localhost:3001/api/results'
const historyUrl = 'https://bad-api-assignment.reaktor.com'

const getAllFromDatabase = () => {
  const request = axios.get(backendUrl)
  return request.then(response => response.data)
}

const getRemaining = () => {
  const remainingData = []
  var cursor = '/rps/history'
  while (cursor !== null) {
    const request = axios.get(historyUrl + cursor)
    const pageData = request.then(response => response.data)
    const data = pageData.data
    cursor = pageData.cursor
    for (let x in data) {
      const req = axios.get(backendUrl + '/' + x.gameId)
      console.log(`Checking ${x.gameId}`)
      const record = req.then(res => res.data)
      if ('_id' in record) {
        cursor = null
        break
      } else {
        console.log('Add one entry')
        data.push({ ...x, id: x.gameId })
      }
    }
  }
  return remainingData
}
// const create = (blog) => {
//   const request = axios.post(baseUrl, blog)
//   return request.then(response => response.data)
// }

// const update = (blog) => {
//   const request = axios.put(`${baseUrl}/${blog.id}`, blog)
//   return request.then(response => response.data)
// }

// const remove = (id) => {
//   const request = axios.delete(`${baseUrl}/${id}`)
//   return request.then(response => response.data)
// }

// const comment = (id, comment) => {
//   const request = axios.post(`${baseUrl}/${id}/comments`, { comment })
//   return request.then(response => response.data)
// }

export default { getAllFromDatabase, getRemaining }