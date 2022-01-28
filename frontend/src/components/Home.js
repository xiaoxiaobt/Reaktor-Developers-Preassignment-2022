import React, { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import Result from '../models/result'
import resultService from '../services/results'
import Card from './Card'
import useWebSocket from 'react-use-websocket'
import InfiniteScroll from 'react-infinite-scroll-component'

const Home = () => {
  // const dispatch = useDispatch()
  const socketUrl = 'wss://bad-api-assignment.reaktor.com/rps/live'
  const [results, setResults] = useState([])
  const [resultCursor, setResultCursor] = useState(0)
  const [ongoing, setOngoing] = useState([])
  const { lastJsonMessage } = useWebSocket(socketUrl)
  const [hasMore, setHasMore] = useState(true)
  const noDocumentsInDatabase = resultService.getNoDocuments()

  const fetchMoreData = () => {
    setResultCursor(prev => prev + 50)
    resultService.fetchFromDatabase(resultCursor).then(records => {
      setResults(prev => prev.concat(records))
      console.log('Loaded ' + records.length + ' results from database')
    })
    if (resultCursor >= noDocumentsInDatabase) {
      setHasMore(false)
    }
  }

  useEffect(() => { fetchMoreData() }, [])

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
          .map((message, idx) => <Card key={idx} props={message} />)}
      </ul>
      <h1>Game history</h1>
      <ul>
        <InfiniteScroll
          dataLength={results.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {results.map(result => <Card key={result.id} props={result} />)}
        </InfiniteScroll>
        {/* {results.map(result => <Card key={result.id} props={result} />)} */}
      </ul>
    </div>
  )
}

export default Home