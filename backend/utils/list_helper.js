var _ = require('lodash')

/** Return the number of total games played by a player */
const totalGames = (results, name) => {
  return _.filter(results, i => i.playerA.name === name || i.playerB.name === name).length
}

/** Return `true` if the player is the winer in the game, otherwise `false` */
const isWinner = (result, name) => {
  const aPlayed = result.playerA.aPlayed
  const bPlayed = result.playerB.bPlayed
  if (result.playerA.name === name)
    return bPlayed === 'ROCK' && aPlayed === 'PAPER' || bPlayed === 'SCISSORS' && aPlayed === 'ROCK' || bPlayed === 'PAPER' && aPlayed === 'SCISSORS'
  else
    return aPlayed === 'ROCK' && bPlayed === 'PAPER' || aPlayed === 'SCISSORS' && bPlayed === 'ROCK' || aPlayed === 'PAPER' && bPlayed === 'SCISSORS'
}

/** Calculate the win rate of a player */
const winRate = (results, name) => {
  return _.filter(results, isWinner(results, name)).length / totalGames(results, name) * 100
}

/** Return aggregated statistics of hands played in games of a player as a `Dictionary` (hand -> count) */
const mostPlayedHand = (results, name) => {
  return _.countBy(_.filter(results, i => i.playerA.name === name || i.playerB.name === name).map(i => (i.playerA.name === name) ? i.playerA.played : i.playerB.played), _.identity)
}

export default {
  totalGames,
  winRate,
  mostPlayedHand
}