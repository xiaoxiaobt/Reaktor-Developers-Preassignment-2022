import React, { useState, useEffect } from 'react'
// import { handleLike, handleRemove } from '../reducers/resultReducer'
// import { useDispatch } from 'react-redux'
// import { useMatch } from 'react-router-dom'
// import Result from '../models/result'
import resultService from '../services/results'
import Card from './Card'
import useWebSocket from 'react-use-websocket'

const Home = () => {
  // const dispatch = useDispatch()
  const [results, setResults] = useState([])
  const socketUrl = 'wss://bad-api-assignment.reaktor.com/rps/live'
  const [messageHistory, setMessageHistory] = useState([])
  const { lastJsonMessage } = useWebSocket(socketUrl)

  useEffect(() => {
    resultService.getAllFromDatabase().then(initialResults => {
      setResults(initialResults)
      console.log('Loaded ' + initialResults.length + ' results from database')
    })
  }, [])

  // useEffect(() => {
  //   resultService.getRemaining().then(remainingResults => {
  //     setResults(results.concat(remainingResults))
  //     console.log('Loaded ' + remainingResults.length + ' results from history')
  //   })
  // }, [])


  useEffect(() => {
    if (lastJsonMessage !== null) {
      const message = JSON.parse(lastJsonMessage)
      if (message.type === 'GAME_RESULT') {
        setMessageHistory(prev => prev.filter(m => m.gameId !== message.gameId))
        setResults(prev => prev.concat({ ...message, id: message.gameId }))
      } else {
        setMessageHistory(prev => prev.concat(message))
      }
    }
  }, [lastJsonMessage, setMessageHistory])

  return (
    <div>
      <h1>On-going</h1>
      <ul>
        {messageHistory
          .map((message, idx) => message ? <Card key={idx} props={message} /> : null)}
      </ul>
      <h1>Game history</h1>
      <ul>
        {results.map(result => <Card key={result.id} props={result} />)}
      </ul>
    </div>
  )
  // return (
  //   <div style={resultStyle} className='result'>
  //     <div>
  //       <i>{result.title}</i> by {result.author} <button onClick={() => setVisible(!visible)}>{label}</button>
  //     </div>
  //     {visible && (
  //       <div>
  //         <div>{result.url}</div>
  //         <div>likes {result.likes}
  //           <button onClick={() => dispatch(handleLike(result.id))}>like</button>
  //         </div>
  //         <div>{result.user.name}</div>
  //         {own && <button onClick={() => dispatch(handleRemove(result.id))}>remove</button>}
  //       </div>
  //     )}
  //   </div>
  // )
}

export default Home