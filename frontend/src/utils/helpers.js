/** Return `true` if the first player is the winner, otherwise (loser/tie) return `false` */
const isWinner = (playerA, playerB) => {
  return playerA.played === 'ROCK' && playerB.played === 'SCISSORS' ||
    playerA.played === 'PAPER' && playerB.played === 'ROCK' ||
    playerA.played === 'SCISSORS' && playerB.played === 'PAPER'
}

export default { isWinner }