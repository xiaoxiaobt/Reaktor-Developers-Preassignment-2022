import axios from 'axios'

const backendUrl = 'http://0.0.0.0:3001/api/users'

const getAllUsers = () => {
  const request = axios.get(backendUrl)
  return request.then(response => response.data)
}

export default { getAllUsers }