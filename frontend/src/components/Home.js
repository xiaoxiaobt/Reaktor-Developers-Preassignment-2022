import React, { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import Result from '../models/result'
import resultService from '../services/results'
import Card from './Card'
import useWebSocket from 'react-use-websocket'

const Home = () => {
  // const dispatch = useDispatch()
  const [results, setResults] = useState([])
  const socketUrl = 'wss://bad-api-assignment.reaktor.com/rps/live'
  const [ongoing, setOngoing] = useState([])
  const { lastJsonMessage } = useWebSocket(socketUrl)

  useEffect(() => {
    resultService.getAllFromDatabase().then(initialResults => {
      setResults(initialResults)
      console.log('Loaded ' + initialResults.length + ' results from database')
    })
  }, [])

  useEffect(() => {
    resultService.getRemaining().then(remainingResults => {
      setResults(prev => prev.concat(remainingResults))
      console.log('Loaded ' + remainingResults.length + ' results from history')
    })
  }, [])

  useEffect(() => {
    if (lastJsonMessage !== null) {
      const message = JSON.parse(lastJsonMessage)
      if (message.type === 'GAME_RESULT') {
        setOngoing(prev => prev.filter(m => m.gameId !== message.gameId))
        setResults(prev => prev.concat({ ...message, id: message.gameId }))
      } else {
        setOngoing(prev => prev.concat(message))
      }
    }
  }, [lastJsonMessage, setOngoing])

  return (
    <div>
      <h1>On-going</h1>
      <ul>
        {ongoing
          .map((message, idx) => message ? <Card key={idx} props={message} /> : null)}
      </ul>
      <h1>Game history</h1>
      <ul>
        {results.map(result => <Card key={result.id} props={result} />)}
      </ul>
    </div>
  )
}

export default Home