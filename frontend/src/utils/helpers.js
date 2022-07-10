/**
 * Check if `playerA` is winner
 * @param {Object} playerA - player A
 * @param {Object} playerB - player B
 * @returns {boolean} `true` if player A is the winner, otherwise (loser/tie) return `false`
 */
const isWinner = (playerA, playerB) => {
  return playerA.played === 'ROCK' && playerB.played === 'SCISSORS' ||
    playerA.played === 'PAPER' && playerB.played === 'ROCK' ||
    playerA.played === 'SCISSORS' && playerB.played === 'PAPER'
}

/**
 * Check which hand is the most played
 * @param {number} rockCount - Number of times rock was played
 * @param {number} paperCount - Number of times paper was played
 * @param {number} scissorsCount - Number of times scissors was played
 * @returns {('ROCK' | 'PAPER' | 'SCISSORS')} The most played hand
 */
const mostPlayed = (rockCount, paperCount, scissorsCount) => {
  const maxCount = Math.max(rockCount, paperCount, scissorsCount)
  if (maxCount === rockCount) {
    return 'ROCK'
  } else if (maxCount === paperCount) {
    return 'PAPER'
  } else {
    return 'SCISSORS'
  }
}

export default { isWinner, mostPlayed }