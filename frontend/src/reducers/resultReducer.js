import resultService from '../services/results'

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data].sort((a, b) => b.likes - a.likes)
  case 'INIT_BLOGS':
    return action.data.sort((a, b) => b.likes - a.likes)
  case 'LIKE_BLOG':
    return state.map(b => b.id === action.data.id ? action.data : b).sort((a, b) => b.likes - a.likes)
  case 'DELETE_BLOG':
    return state.filter(b => b.id !== action.data)
  case 'NEW_COMMENT':
    return state.map(b => b.id === action.data.id ? action.data : b)
  default:
    return state
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    const newBlog = await resultService.comment(id, comment)
    dispatch({
      type: 'NEW_COMMENT',
      data: newBlog
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    try {
      const newBlog = await resultService.create(blog)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      })
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await resultService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const handleLike = (id) => {
  return async dispatch => {
    const blogs = await resultService.getAll()
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    const updatedBlog = await resultService.update(likedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}

export const handleRemove = (id) => {
  return async dispatch => {
    const blogs = await resultService.getAll()
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = await window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      await resultService.remove(id)
      dispatch({
        type: 'DELETE_BLOG',
        data: id
      })
    }
  }
}


export default reducer