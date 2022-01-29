import './App.css'
import React from 'react'
import Result from './components/Result'
import Home from './components/Home'
import User from './components/User'
import Users from './components/Users'
import Navigation from './components/Navigation'
import { Routes, Route } from 'react-router-dom'
import Container from '@mui/material/Container'
// import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  return (
    <div>
      <Navigation />
      <Container>

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
