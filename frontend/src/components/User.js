import { useState, useEffect } from 'react'
import { useMatch } from 'react-router-dom'
import helpers from '../utils/helpers'
import userService from '../services/users'
import CircularProgress from '@mui/material/CircularProgress'

/**
 * `User` shows aggregate information about a user.
 * Statistics include all data, including those in the database and those are not.
 * @param {Object} props - props
 * @param {Object[]} props.resultsLive - results of the matches that are not in database yet
 */
const User = ({ resultsLive }) => {
  const match = useMatch('/users/:name')
  const playerName = match.params.name
  const initialState = {
    total: 0,
    win: 0,
    rock: 0,
    paper: 0,
    scissors: 0,
    loading: true
  }
  const [statisticsFromDatabases, setStatisticsFromDatabases] = useState(initialState)
  useEffect(() => {
    userService.getUserStatistics(playerName).then(data =>
      setStatisticsFromDatabases({ ...data, loading: false })
    )
  }, [])

  const asPlayerA = resultsLive.filter(r => r.playerA.name === playerName)
  const asPlayerB = resultsLive.filter(r => r.playerB.name === playerName)
  const totalMatchLive = asPlayerA.length + asPlayerB.length
  const asWinnerAWon = asPlayerA.filter(x => helpers.isWinner(x.playerA, x.playerB)).length
  const asWinnerBWon = asPlayerB.filter(x => helpers.isWinner(x.playerB, x.playerA)).length
  const totalMatchWonLive = asWinnerAWon + asWinnerBWon
  const totalRockLive = asPlayerA.filter(x => x.playerA.played === 'ROCK').length + asPlayerB.filter(x => x.playerB.played === 'ROCK').length
  const totalPaperLive = asPlayerA.filter(x => x.playerA.played === 'PAPER').length + asPlayerB.filter(x => x.playerB.played === 'PAPER').length
  const totalScissorsLive = asPlayerA.filter(x => x.playerA.played === 'SCISSORS').length + asPlayerB.filter(x => x.playerB.played === 'SCISSORS').length

  const totalMatch = totalMatchLive + statisticsFromDatabases.total
  const totalMatchWon = totalMatchWonLive + statisticsFromDatabases.win
  const winRate = totalMatch === 0 ? 'No Statistics' : Number(100 * totalMatchWon / totalMatch).toFixed(2)

  // Loading from database takes about 2 seconds
  if (statisticsFromDatabases.loading) {
    return <CircularProgress />
  }

  return (
    <>
      <h1>{playerName}</h1>
      <h2>Total number of matches played: {totalMatch}</h2>
      <h2>Total number of matches won: {totalMatchWon}</h2>
      <h2>Win ratio: {winRate}</h2>
      <h2>Total number of rock played: {totalRockLive + statisticsFromDatabases.rock}</h2>
      <h2>Total number of paper played: {totalPaperLive + statisticsFromDatabases.paper}</h2>
      <h2>Total number of scissors played: {totalScissorsLive + statisticsFromDatabases.scissors}</h2>
      <h2>Most played: {
        helpers.mostPlayed(
          totalRockLive + statisticsFromDatabases.rock,
          totalPaperLive + statisticsFromDatabases.paper,
          totalScissorsLive + statisticsFromDatabases.scissors
        )
      }
      </h2>
    </>
  )
}

export default User