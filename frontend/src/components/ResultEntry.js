import React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import { Link } from 'react-router-dom'
import helpers from '../utils/helpers'
import avatars from './Avatars'

/**
 * `ResultEntry` displays info of a match as a card-like component
 *
 * Because there is a clickable component inside a `Link`-like component,
 * so there exists some complains about it in console.
 * Due to time constraints, this will be fixed in the future.
 *
 * @param {object} props - props of the component.
 * @param {object} props.result - match result.
 * @param {object} props.result.playerA - player A object.
 * @param {string} props.result.playerA.name - player A name.
 * @param {string} props.result.playerA.played - player A's hand in the game, `'ROCK'`|`'PAPER'`|`'SCISSORS'`.
 * @param {object} props.result.playerB - player B object.
 * @param {string} props.result.playerB.name - player B name.
 * @param {string} props.result.playerB.played - player B's hand in the game, `'ROCK'`|`'PAPER'`|`'SCISSORS'`.
 * @param {string} props.result.id - id of the game.
 * @param {string} props.result.type - type of the match, either `'GAME_BEGIN'` or `'GAME_RESULT'`.
 */
const ResultEntry = ({ result }) => {
  const playerA = result.playerA
  const playerB = result.playerB
  const leftAvatar = result.type === 'GAME_BEGIN' ? avatars.PENDING : playerA.played === 'ROCK' ? avatars.ROCKLEFT : playerA.played === 'PAPER' ? avatars.PAPERLEFT : avatars.SCISSIORSLEFT
  const rightAvatar = result.type === 'GAME_BEGIN' ? avatars.PENDING : playerB.played === 'ROCK' ? avatars.ROCKRIGHT : playerB.played === 'PAPER' ? avatars.PAPERRIGHT : avatars.SCISSIORSRIGHT

  const playerAwins = helpers.isWinner(playerA, playerB)
  const playerBwins = helpers.isWinner(playerB, playerA)

  return (
    <li className='resultEntry'>
      <ListItem component={Link} to={`/results/${result.id}`} disablePadding>
        {leftAvatar}
        <div className="playerContainer">
          <Link to={`/users/${playerA.name}`} id="leftPlayerName">
            <ListItemText primary={playerA.name + (playerAwins ? '🏆' : '')} />
          </Link>
        </div>
        <ListItemText primary='V.S.' id="centervs" />
        <div className="playerContainer">
          <Link to={`/users/${playerB.name}`} id="rightPlayerName">
            <ListItemText primary={(playerBwins ? '🏆' : '') + playerB.name} />
          </Link>
        </div>
        {rightAvatar}
      </ListItem>
      <Divider component="li" />
    </li>
  )
}
export default ResultEntry