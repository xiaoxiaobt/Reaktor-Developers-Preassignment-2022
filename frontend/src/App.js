import './App.css'

import React, { useState, useEffect } from 'react'
// import Blog from './components/Blog'
// import Notification from './components/Notification'
// import Togglable from './components/Togglable'
// import NewBlog from './components/NewBlog'
import Navigation from './components/Navigation'
// import loginService from './services/login'
import {
  Routes,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom'
// import { notifyWith } from './reducers/notificationReducer'
// import { useDispatch, useSelector } from 'react-redux'
// import { createBlog, initializeBlogs, addComment } from './reducers/blogReducer'
// import { handleLike } from './reducers/blogReducer'
import Container from '@material-ui/core/Container'

const App = () => {
  // const [username, setUsername] = useState('')
  // const [comment, setComment] = useState('')
  // const dispatch = useDispatch()
  // const blogs = useSelector(state => state.blogs)
  // const user = useSelector(state => state.user)
  // const blogFormRef = React.createRef()

  return (
    <div>
      <Container>
        <Navigation/>
        <Routes>
          <Route path="/blogs/:name">
          </Route>
          <Route path="/users/:id">
          </Route>
          <Route path="/users">
          </Route>
          <Route path="/">
          </Route>
        </Routes>
      </Container>
    </div>
  )
}

export default App
