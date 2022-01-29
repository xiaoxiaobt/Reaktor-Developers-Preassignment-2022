import React, { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import Result from '../models/result'
import resultService from '../services/results'
import ResultEntry from './ResultEntry'
import useWebSocket from 'react-use-websocket'
import InfiniteScroll from 'react-infinite-scroll-component'
import List from '@mui/material/List'

const Home = () => {
  // const dispatch = useDispatch()
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
    <div>
      <h1 id="ongoing">On-going</h1>
      <center>
        <List sx={{ width: '80%' }}>
          {ongoing
            .map((message, idx) => <ResultEntry key={idx} props={message} />)}
        </List>
      </center>
      <h1 id="history">Game history</h1>
      <InfiniteScroll
        dataLength={results.length}
        next={_ => resultService.fetchMoreData(setResults, setHasMore, resultCursor, setResultCursor)}
        hasMore={hasMore}
        loader={<center><h4>Loading...</h4></center>}
        endMessage={
          <p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>
        }
      >
        <center>
          <List sx={{ width: '80%' }}>
            {results.map((result, idx) => <ResultEntry key={idx} props={result} />)}
          </List>
        </center>
      </InfiniteScroll>
    </div>
  )
}

export default Home