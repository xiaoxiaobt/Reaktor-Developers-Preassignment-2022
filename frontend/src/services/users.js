import axios from 'axios'

const backendUrl = '/api/users/'

/**
 * Fetch list of users as an array
 */
const getAllUsers = async () => {
  const request = axios.get(backendUrl)
  const response = await request
  return response.data
}

/**
 * Get aggregated statistics of a user with name `name` from database
 * @param {string} name - name of the user
 */
const getUserStatistics = async (name) => {
  const request = axios.get(backendUrl + name)
  const response = await request
  return response.data
}

export default { getAllUsers, getUserStatistics }