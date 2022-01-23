import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blog) => {
  const request = axios.post(baseUrl, blog)
  return request.then(response => response.data)
}

const update = (blog) => {
  const request = axios.put(`${baseUrl}/${blog.id}`, blog)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const comment = (id, comment) => {
  const request = axios.post(`${baseUrl}/${id}/comments`, { comment })
  return request.then(response => response.data)
}

export default { getAll, create, update, remove, comment }