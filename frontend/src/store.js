import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import resultReducer from './reducers/resultReducer'
// import notificationReducer from './reducers/notificationReducer'
// import loginReducer from './reducers/loginReducer'

// const reducer = combineReducers({
//   blogs: blogReducer,
//   notification: notificationReducer,
//   user: loginReducer
// })

const reducer = resultReducer
const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store