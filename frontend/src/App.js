import './App.css'

import React, { useState, useEffect } from 'react'
// import Blog from './components/Blog'
// import Notification from './components/Notification'
// import Togglable from './components/Togglable'
import Result from './components/Result'
import Status from './components/Status'
import User from './components/User'
import Users from './components/Users'
import Navigation from './components/Navigation'
// import loginService from './services/login'
import {
  Routes,
  Route,
  Link,
  useMatch
} from 'react-router-dom'
// import { notifyWith } from './reducers/notificationReducer'
// import { useDispatch, useSelector } from 'react-redux'
// import { createBlog, initializeBlogs, addComment } from './reducers/blogReducer'
// import { handleLike } from './reducers/blogReducer'
import Container from '@mui/material/Container'

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
        <Navigation />
        <Routes>
          {/* Show result of a single play */}
          <Route path="/results/:id">
            {/* <Result /> */}
          </Route>

          {/* Show statistics of a single player */}
          <Route path="/users/:name">
            {/* <User /> */}
          </Route>

          {/* Show all plays (must be limited somehow) */}
          <Route exact path="/status">
            {/* <Status /> */}
          </Route>

          {/* Show all players */}
          <Route exact path="/users">
            {/* <Users /> */}
          </Route>

          {/* TBD */}
          <Route exact path="/">
          </Route>
        </Routes>
      </Container>
    </div>
  )
}

export default App
