import './App.css'

import React, { useState, useEffect } from 'react'
// import Blog from './components/Blog'
// import Notification from './components/Notification'
// import Togglable from './components/Togglable'
import Result from './components/Result'
import Home from './components/Home'
import User from './components/User'
import Users from './components/Users'
import Navigation from './components/Navigation'
import {
  Routes,
  Route,
  Link,
  useMatch
} from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
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
          <Route path="/results/:id" element={<Result />} />

          {/* Show statistics of a single player */}
          <Route path="/users/:name" element={<User />} />

          {/* Show all players */}
          <Route exact path="/users" element={<Users />} />

          {/* Show all plays (must be limited somehow) */}
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Container>
    </div >
  )
}

export default App
