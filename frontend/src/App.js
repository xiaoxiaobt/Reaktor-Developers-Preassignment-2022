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
  // `resultsInDatabases` includes history in the database at launch of the app
  const [resultsInDatabases, setResultsInDatabases] = useState([])
  // `resultsLive` includes history that are NOT in the databases yet
  // and results obtained from Websocket
  const [resultsLive, setResultsLive] = useState([])
  const [ongoing, setOngoing] = useState([])
  const { lastJsonMessage } = useWebSocket(socketUrl)
  const [hasMore, setHasMore] = useState(true)
  const [resultCursor, setResultCursor] = useState(0)

  useEffect(() => {
    resultService.fetchMoreData(setResultsInDatabases, setHasMore, resultCursor, setResultCursor)
  }, [])

  useEffect(() => {
    resultService.getRemaining().then(remainingResults => {
      setResultsLive(prev => remainingResults.concat(prev))
      console.log('Loaded ' + remainingResults.length + ' results from history (those not in database)')
    })
  }, [])

  useEffect(() => {
    if (lastJsonMessage !== null) {
      const message = JSON.parse(lastJsonMessage)
      if (message.type === 'GAME_RESULT') {
        setOngoing(prev => prev.filter(m => m.id !== message.gameId))
        setResultsLive(prev => [{ ...message, id: message.gameId }, ...prev.filter(m => m.id !== message.gameId)])
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
          <Route path="/results/:id" element={<Result resultsLive={resultsLive} />} />

          {/* Show statistics of a single player */}
          <Route path="/users/:name" element={<User resultsLive={resultsLive}/>} />

          {/* Show all players */}
          <Route exact path="/users" element={<Users />} />

          {/* Show all plays (must be limited somehow) */}
          <Route exact path="/" element={
            <Home resultsCombined={resultsLive.concat(resultsInDatabases)} ongoing={ongoing} hasMore={hasMore} resultCursor={resultCursor}
              setResultsInDatabases={setResultsInDatabases} setHasMore={setHasMore} setResultCursor={setResultCursor} />
          } />
        </Routes>
      </Container>
    </ >
  )
}

export default App
