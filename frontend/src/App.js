import './App.css'
import React, { useState, useEffect } from 'react'
import useWebSocket from 'react-use-websocket'
import Result from './components/Result'
import Home from './components/Home'
import User from './components/User'
import Users from './components/Users'
import Navigation from './components/Navigation'
import { Routes, Route } from 'react-router-dom'
import Container from '@mui/material/Container'
import resultService from './services/results'

const App = () => {

  const socketUrl = 'wss://bad-api-assignment.reaktor.com/rps/live'
  const [results, setResults] = useState([])
  const [ongoing, setOngoing] = useState([])
  const { lastJsonMessage } = useWebSocket(socketUrl)
  const [hasMore, setHasMore] = useState(true)
  const [resultCursor, setResultCursor] = useState(0)

  useEffect(() => {
    resultService.fetchMoreData(setResults, setHasMore, resultCursor, setResultCursor)
  }, [])

  useEffect(() => {
    resultService.getRemaining().then(remainingResults => {
      setResults(prev => remainingResults.concat(prev))
      console.log('Loaded ' + remainingResults.length + ' results from history')
    })
  }, [])

  useEffect(() => {
    if (lastJsonMessage !== null) {
      const message = JSON.parse(lastJsonMessage)
      if (message.type === 'GAME_RESULT') {
        setOngoing(prev => prev.filter(m => m.id !== message.gameId))
        setResults(prev => [{ ...message, id: message.gameId }, ...prev.filter(m => m.id !== message.gameId)])
      } else {
        setOngoing(prev => prev.concat({ ...message, id: message.gameId }))
      }
    }
  }, [lastJsonMessage, setOngoing])

  return (
    <>
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
          <Route exact path="/" element={
            <Home results={results} ongoing={ongoing} hasMore={hasMore} resultCursor={resultCursor}
              setResults={setResults} setHasMore={setHasMore} setResultCursor={setResultCursor} />
          } />
        </Routes>
      </Container>
    </ >
  )
}

export default App
