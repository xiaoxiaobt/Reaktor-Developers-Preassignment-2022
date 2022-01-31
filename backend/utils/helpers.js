const _ = require('lodash')

/** Return `true` if the player is the winer in the game, otherwise `false` */
const isWinner = (result, name) => {
  const aPlayed = result.playerA.played
  const bPlayed = result.playerB.played
  if (result.playerA.name === name)
    return bPlayed === 'ROCK' && aPlayed === 'PAPER' || bPlayed === 'SCISSORS' && aPlayed === 'ROCK' || bPlayed === 'PAPER' && aPlayed === 'SCISSORS'
  else
    return aPlayed === 'ROCK' && bPlayed === 'PAPER' || aPlayed === 'SCISSORS' && bPlayed === 'ROCK' || aPlayed === 'PAPER' && bPlayed === 'SCISSORS'
}

/** Calculate the number of winning rounds of a player */
const win = (results, name) => {
  return _.filter(results, result => isWinner(result, name)).length
}

/** Return aggregated statistics of hands played in games of a player as a `Dictionary` (hand -> count) */
const hands = (results, name) => {
  return _.countBy(_.filter(results, i => i.playerA.name === name || i.playerB.name === name).map(i => (i.playerA.name === name) ? i.playerA.played : i.playerB.played), _.identity)
}

module.exports = { win, hands }