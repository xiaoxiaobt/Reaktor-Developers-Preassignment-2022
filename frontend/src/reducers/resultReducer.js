import resultService from '../services/results'

const reducer = (state = [], action) => {
  switch (action.type) {
  // case 'NEW_BLOG':
  //   return [...state, action.data].sort((a, b) => b.likes - a.likes)
  // case 'INIT_BLOGS':
  //   return action.data.sort((a, b) => b.likes - a.likes)
  // case 'LIKE_BLOG':
  //   return state.map(b => b.id === action.data.id ? action.data : b).sort((a, b) => b.likes - a.likes)
  // case 'DELETE_BLOG':
  //   return state.filter(b => b.id !== action.data)
  // case 'NEW_COMMENT':
  //   return state.map(b => b.id === action.data.id ? action.data : b)
  default:
    return state
  }
}

export default reducer