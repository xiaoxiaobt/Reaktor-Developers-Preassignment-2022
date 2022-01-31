import axios from 'axios'

const backendUrl = '/api/users/'

const getAllUsers = () => {
  const request = axios.get(backendUrl)
  return request.then(response => response.data)
}

const getUserStatistics = (name) => {
  const request = axios.get(backendUrl + name)
  return request.then(response => response.data)
}

export default { getAllUsers, getUserStatistics }