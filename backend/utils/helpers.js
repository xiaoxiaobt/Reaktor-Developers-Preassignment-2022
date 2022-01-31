const _ = require('lodash')

/**
 * Checking if a player has won a game
 * Return `true` if the player with name `name` is the winner in the game, otherwise `false`
 * @param {object} result - Info of the match
 * @param {string} name - Name of the player
 * @returns {boolean}
 */
const isWinner = (result, name) => {
  const aPlayed = result.playerA.played
  const bPlayed = result.playerB.played
  if (result.playerA.name === name)
    return bPlayed === 'ROCK' && aPlayed === 'PAPER' || bPlayed === 'SCISSORS' && aPlayed === 'ROCK' || bPlayed === 'PAPER' && aPlayed === 'SCISSORS'
  else
    return aPlayed === 'ROCK' && bPlayed === 'PAPER' || aPlayed === 'SCISSORS' && bPlayed === 'ROCK' || aPlayed === 'PAPER' && bPlayed === 'SCISSORS'
}

/**
 * Calculate the number of winning rounds of a player
 * @param {object[]} results - All matches played by the player with name `name`
 * @param {string} name - Name of the player
 */
const win = (results, name) => {
  return _.filter(results, result => isWinner(result, name)).length
}

/**
 * Return aggregated statistics of hands played in games of a player
 * as a `Dictionary` (hand -> count)
 * @param {object[]} results - All matches played by the player with name `name`
 * @param {string} name - Name of the player
 */
const hands = (results, name) => {
  return _.countBy(_.filter(results, i => i.playerA.name === name || i.playerB.name === name).map(i => (i.playerA.name === name) ? i.playerA.played : i.playerB.played), _.identity)
}

module.exports = { win, hands }