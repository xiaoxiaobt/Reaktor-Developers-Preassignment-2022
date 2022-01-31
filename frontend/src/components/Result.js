import React, { useState, useEffect } from 'react'
import { useMatch } from 'react-router-dom'
import resultService from '../services/results'
import helpers from '../utils/helpers'
import PlayerChip from './PlayerChip'

const Result = ({ resultsLive }) => {
  const match = useMatch('/results/:id')
  const gameID = match.params.id
  const [infoFromDatabases, setInfoFromDatabases] = useState(null)
  const infoFromLive = resultsLive.filter(r => r.id === gameID)

  useEffect(() => {
    resultService.getById(match.params.id).then(x => setInfoFromDatabases(x))
  }, [])

  if (infoFromLive.length > 0) {
    const match = infoFromLive[0]
    const playerA = match.playerA
    const playerB = match.playerB
    return (
      <>
        <h1>Game result</h1>
        <h2>Game ID: {gameID}</h2>
        <h2>Timestamp: {match.t}</h2>
        <h2>Player A: <PlayerChip name={playerA.name} /> played {playerA.played} </h2>
        <h2>Player B: <PlayerChip name={playerB.name} /> played {playerB.played} </h2>
        {helpers.isWinner(playerA, playerB) ?
          <h2>Winner: <PlayerChip name={playerA.name} /></h2> :
          helpers.isWinner(playerB, playerA) ?
            <h2>Winner: <PlayerChip name={playerB.name} /></h2> :
            <h2>Everyone is a winner! (Tie)</h2>
        }
      </>
    )
  } else if (infoFromDatabases) {
    console.log(infoFromDatabases)
    const playerA = infoFromDatabases.playerA
    const playerB = infoFromDatabases.playerB
    return (
      <>
        <h1>Game result</h1>
        <h2>Game ID: {gameID}</h2>
        <h2>Timestamp: {infoFromDatabases.t}</h2>
        <h2>
          Player A: <PlayerChip name={playerA.name} /> played {playerA.played}
        </h2>
        <h2>
          Player B: <PlayerChip name={playerB.name} /> played {playerB.played}
        </h2>

        {helpers.isWinner(playerA, playerB) ?
          <h2>Winner: <PlayerChip name={playerA.name} /></h2> :
          helpers.isWinner(playerB, playerA) ?
            <h2>Winner: <PlayerChip name={playerB.name} /></h2> :
            <h2>Everyone is a winner! (Tie)</h2>
        }
      </>
    )
  } else {
    return (
      <>
        <h1>Game</h1>
        <h2>The game is still on-going. Come back later!</h2>
      </>)
  }
}

export default Result