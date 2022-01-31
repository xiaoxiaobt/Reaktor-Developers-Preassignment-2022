/** Return `true` if the first player is the winner, otherwise (loser/tie) return `false` */
const isWinner = (playerA, playerB) => {
  return playerA.played === 'ROCK' && playerB.played === 'SCISSORS' ||
    playerA.played === 'PAPER' && playerB.played === 'ROCK' ||
    playerA.played === 'SCISSORS' && playerB.played === 'PAPER'
}

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